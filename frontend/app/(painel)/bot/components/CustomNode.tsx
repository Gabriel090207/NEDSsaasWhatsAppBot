"use client";

import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Trash2 } from "lucide-react";
import styles from "./CustomNode.module.css";

export default function CustomNode({ id, data }: any) {
  const [buttons, setButtons] = useState(
    data.buttons || []
  );


    const [phone, setPhone] = useState(data.phone || "");

 function addButton() {
  const updated = [
    ...buttons,
    "Nova opção",
  ];

  setButtons(updated);

  data.onChangeData(id, {
    buttons: updated,
  });
}

  function updateButton(
  index: number,
  value: string
) {
  const updated = [...buttons];
  updated[index] = value;

  setButtons(updated);

  data.onChangeData(id, {
    buttons: updated,
  });
}

  return (
    <div className={styles.card}>
      {/* TOPO */}
      <div className={styles.header}>
        <div className={styles.badge}>
          {data.title}
        </div>

        <button
          className={styles.deleteBtn}
          onClick={() => data.onDelete(id)}
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* MENSAGEM */}
{data.type !== "flow" && data.type !== "human" && (
  <div className={styles.section}>
    <label className={styles.label}>
      Mensagem
    </label>

   <textarea
  className={styles.textarea}
  value={data.message || ""}
  onChange={(e) =>
    data.onChangeData(id, {
      message: e.target.value,
    })
  }
/>
  </div>
)}

      {/* TIPO BOTÕES */}
      {data.type === "buttons" && (
        <div className={styles.section}>
          <label className={styles.label}>
            Botões
          </label>

          {buttons.map(
            (
              btn: string,
              index: number
            ) => (
              <div
                key={index}
                className={styles.buttonRow}
              >
                <input
                  className={styles.input}
                  value={btn}
                  onChange={(e) =>
                    updateButton(
                      index,
                      e.target.value
                    )
                  }
                />

                <Handle
                  type="source"
                  position={Position.Right}
                  id={`button-${index}`}
                  className={`${styles.handle} ${styles.buttonHandle}`}
                />
              </div>
            )
          )}

          <button
            className={styles.addBtn}
            onClick={addButton}
          >
            + Adicionar botão
          </button>
        </div>
      )}

    


      {data.type === "flow" && (
  <div className={styles.section}>
    <label className={styles.label}>
      Selecionar fluxo
    </label>

    <select
  className={styles.select}
  value={data.flowTarget || ""}
  onChange={(e) =>
    data.onChangeData(id, {
      flowTarget: e.target.value,
    })
  }
>
  <option value="">
    Escolher fluxo
  </option>

  <option value="Boas-vindas">
    Boas-vindas
  </option>

  <option value="Vendas">
    Vendas
  </option>

  <option value="Suporte">
    Suporte
  </option>
</select>
  </div>
)}



  {data.type === "human" && (
    <div className={styles.section}>
      <label className={styles.label}>
        Mensagem ao cliente
      </label>

      <textarea
        className={styles.textarea}
        placeholder="Aguarde, um atendente irá continuar seu atendimento."
        value={data.message || ""}
onChange={(e) =>
  data.onChangeData(id, {
    message: e.target.value,
  })
}
      />

      <div className={styles.switchRow}>
        <input
  type="checkbox"
  checked={data.notify || false}
  onChange={(e) =>
    data.onChangeData(id, {
      notify: e.target.checked,
    })
  }
/>

        <span>Notificar atendente</span>
      </div>

     <input
  className={styles.input}
  placeholder="(11) 99999-9999"
  value={phone}
  onChange={(e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(
        /^(\d{2})(\d{5})(\d{0,4}).*/,
        "($1) $2-$3"
      );
    } else if (value.length > 6) {
      value = value.replace(
        /^(\d{2})(\d{4})(\d{0,4}).*/,
        "($1) $2-$3"
      );
    } else if (value.length > 2) {
      value = value.replace(
        /^(\d{2})(\d+)/,
        "($1) $2"
      );
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)/, "($1");
    }

    setPhone(value);

data.onChangeData(id, {
  phone: value,
});
  }}
/>
      <div className={styles.infoBox}>
        Bot será pausado até o atendente assumir.
      </div>
    </div>
  )}

      {/* HANDLES */}
      <Handle
        type="target"
        position={Position.Left}
        className={`${styles.handle} ${styles.leftHandle}`}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="main"
        className={`${styles.handle} ${styles.mainHandle}`}
      />
    </div>
  );
}