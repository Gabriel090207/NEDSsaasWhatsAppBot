"use client";


import styles from "./Bot.module.css";
import { MoreVertical, Pencil, Trash2, Settings } from "lucide-react";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import {
  getFlows,
  createFlow as createFlowApi,
  deleteFlow as deleteFlowApi,
  updateFlowConfig,
} from "@/services/flow";


type Flow = {
  id: string;
  name: string;
  is_initial?: boolean;
  trigger_type?: string;
  keywords?: string[];
  timeout_minutes?: number;
};

export default function BotPage() {
  const [flows, setFlows] = useState<Flow[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [newFlowName, setNewFlowName] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);


  const [showConfigModal, setShowConfigModal] =
  useState(false);

  const [selectedFlow, setSelectedFlow] =
  useState<Flow | null>(null);

  const [isInitialFlow, setIsInitialFlow] =
  useState(false);

  const [triggerType, setTriggerType] =
  useState("all");

  const [timeoutMinutes, setTimeoutMinutes] =
  useState("30");

  
  const [keyword, setKeyword] = useState("");
  
  


 async function createFlow() {
  if (!newFlowName.trim()) return;

  try {
    const newFlow = await createFlowApi(newFlowName);

    setFlows((old) => [...old, newFlow]);
    setNewFlowName("");
    setShowModal(false);
  } catch (error) {
    console.error(error);
  }
}

  async function deleteFlow(id: string) {
  try {
    await deleteFlowApi(id);
    setFlows(flows.filter((f) => f.id !== id));
    setMenuOpenId(null);
  } catch (error) {
    console.error(error);
  }
}


async function saveConfig() {
  if (!selectedFlow) return;

  try {
    const keywords =
      triggerType === "keyword"
        ? keyword
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean)
        : [];

    await updateFlowConfig(selectedFlow.id, {
      is_initial: isInitialFlow,
      trigger_type: triggerType,
      keywords,
      timeout_minutes: Number(timeoutMinutes),
    });

    setShowConfigModal(false);
  } catch (error) {
    console.error(error);
  }
}


  const router = useRouter();


  useEffect(() => {
  loadFlows();
}, []);

async function loadFlows() {
  try {
    const data = await getFlows();
    setFlows(data);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className={styles.container}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Fluxos do Bot</h2>
        <button
          className={styles.primaryBtn}
          onClick={() => setShowModal(true)}
        >
          Novo fluxo
        </button>
      </div>

      {/* LISTA */}
      <div className={styles.list}>
        {flows.map((flow) => (
          <div key={flow.id} className={styles.item}>
            
            <span>{flow.name}</span>

            {/* MENU */}
            <div className={styles.menuWrapper}>
              <button
                className={styles.iconBtn}
                onClick={() =>
                  setMenuOpenId(
                    menuOpenId === flow.id ? null : flow.id
                  )
                }
              >
                <MoreVertical size={16} />
              </button>

              {menuOpenId === flow.id && (
  <div className={styles.dropdown}>
    
    <button
  className={styles.dropdownItem}
  onClick={() => router.push(`/bot/${flow.id}`)}
>
  <Pencil size={14} />
  Editar
</button>


<button
  className={styles.dropdownItem}
  onClick={() => {
  setSelectedFlow(flow);

  setIsInitialFlow(
    flow.is_initial || false
  );

  setTriggerType(
    flow.trigger_type || "all"
  );

  setKeyword(
    flow.keywords
      ? flow.keywords.join(", ")
      : ""
  );

  setTimeoutMinutes(
    String(
      flow.timeout_minutes || 30
    )
  );

  setShowConfigModal(true);
  setMenuOpenId(null);
}}
>
  <Settings size={14} />
  Configurar
</button>


    <button
      className={`${styles.dropdownItem} ${styles.danger}`}
      onClick={() => deleteFlow(flow.id)}
    >
      <Trash2 size={14} />
      Excluir
    </button>

  </div>
)}
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Novo fluxo</h3>

            <input
              placeholder="Nome do fluxo"
              value={newFlowName}
              onChange={(e) => setNewFlowName(e.target.value)}
              className={styles.input}
            />

            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>

              <button
                className={styles.primaryBtn}
                onClick={createFlow}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}


{showConfigModal && selectedFlow && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <h3>Configurar fluxo</h3>

      <p className={styles.flowName}>
  {selectedFlow.name}
</p>

<div className={styles.configFields}>

  <label className={styles.checkRow}>
    <input
      type="checkbox"
      checked={isInitialFlow}
      onChange={(e) =>
        setIsInitialFlow(e.target.checked)
      }
    />
    Definir como fluxo inicial
  </label>

  <div>
    <span className={styles.label}>
      Tipo de gatilho
    </span>

    <select
      className={styles.input}
      value={triggerType}
      onChange={(e) =>
        setTriggerType(e.target.value)
      }
    >
      <option value="all">Todas mensagens</option>
<option value="keyword">Palavra-chave específica</option>
    </select>


    {triggerType === "keyword" && (
  <div>
    <label className={styles.label}>Palavra-chave</label>

    <input
      className={styles.input}
      placeholder="Ex: oi, menu, suporte"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  </div>
)}

  </div>

  <div>
    <span className={styles.label}>
      Reiniciar após inatividade (min)
    </span>

    <input
      className={styles.input}
      value={timeoutMinutes}
      onChange={(e) =>
        setTimeoutMinutes(e.target.value)
      }
    />
  </div>

</div>

      <div className={styles.modalActions}>
        <button
          className={styles.cancelBtn}
          onClick={() =>
            setShowConfigModal(false)
          }
        >
          Fechar
        </button>

        <button
  className={styles.primaryBtn}
  onClick={saveConfig}
>
  Salvar
</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}