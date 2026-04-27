"use client";


import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getFlow,
  saveFlow,
} from "@/services/flow";

import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
} from "reactflow";

import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import styles from "./FlowCanvas.module.css";

const nodeTypes = Object.freeze({
  custom: CustomNode,
});

const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 120, y: 140 },
    data: {
      title: "Etapa 1",
      message: "Olá, como posso ajudar?",
      buttons: ["Suporte", "Vendas"],
    },
  },
];


const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    animated: true,
  },
];



export default function FlowCanvas() {


const [showModal, setShowModal] = useState(false);
const [stepName, setStepName] = useState("");
const [stepType, setStepType] = useState("buttons");

  const [nodes, setNodes, onNodesChange] =
    useNodesState([])

  const [edges, setEdges, onEdgesChange] =
    useEdgesState([])

    function updateNodeData(
  nodeId: string,
  newData: any
) {
  setNodes((nds) =>
    nds.map((node) =>
      node.id === nodeId
        ? {
            ...node,
            data: {
              ...node.data,
              ...newData,
            },
          }
        : node
    )
  );
}

const nodesWithDelete = nodes.map((node) => ({
  ...node,
  data: {
    ...node.data,
    onDelete: deleteNode,
    onChangeData: updateNodeData,
  },
}));

function addNewStep() {
  const next = nodes.length + 1;

  const lastNode =
    nodes.length > 0
      ? nodes[nodes.length - 1]
      : null;

  const newNode = {
    id: Date.now().toString(),
    type: "custom",
    position: {
      x: lastNode
        ? lastNode.position.x + 380
        : 120,
      y: lastNode
        ? lastNode.position.y
        : 140,
    },
    data: {
      title: stepName || `Etapa ${next}`,
      type: stepType,
      message: "",
      responseLabel: "Sua resposta",
      flowTarget: "",
      notify: false,
      phone: "",
      buttons:
        stepType === "buttons"
          ? ["Nova opção"]
          : [],
    },
  };

  setNodes((nds) => [...nds, newNode]);

  setShowModal(false);
  setStepName("");
  setStepType("buttons");
}
  
function deleteNode(nodeId: string) {
  setNodes((nds) =>
    nds.filter((node) => node.id !== nodeId)
  );

  setEdges((eds) =>
    eds.filter(
      (edge) =>
        edge.source !== nodeId &&
        edge.target !== nodeId
    )
  );
}
    

  function onConnect(params: Connection) {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: "smoothstep",
          animated: true,
        },
        eds
      )
    );
  }

function onEdgeClick(
  event: any,
  edge: any
) {
  setSelectedEdge(edge);

  setMenuPos({
    x: event.clientX,
    y: event.clientY,
  });
}

function deleteEdge() {
  if (!selectedEdge) return;

  setEdges((eds) =>
    eds.filter(
      (item) => item.id !== selectedEdge.id
    )
  );

  setSelectedEdge(null);
}

const [selectedEdge, setSelectedEdge] = useState<any>(null);
const [menuPos, setMenuPos] = useState({
  x: 0,
  y: 0,
});


const params = useParams();
const flowId = params.id as string;

useEffect(() => {
  loadFlow();
}, []);

async function loadFlow() {
  try {
    const data = await getFlow(flowId);

    setNodes(
      data.nodes?.length
        ? data.nodes
        : initialNodes
    );

    setEdges(
      data.edges?.length
        ? data.edges
        : []
    );
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  if (!flowId) return;
  if (nodes.length === 0 && edges.length === 0) return;

  const timer = setTimeout(() => {
    autoSave();
  }, 1000);

  return () => clearTimeout(timer);
}, [nodes, edges]);

async function autoSave() {
  try {
    await saveFlow(flowId, {
      nodes,
      edges,
    });
  } catch (error) {
    console.error(error);
  }
}

 
  return (
    <div className={styles.wrapper}>
      {/* TOPO */}
      <div className={styles.topbar}>
        <button
  className={styles.addBtn}
 onClick={() => setShowModal(true)}
>
          + Nova etapa
        </button>
      </div>

      {/* CANVAS */}
      <div className={styles.canvasBox}>
        <ReactFlow
         nodes={nodesWithDelete}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeClick={onEdgeClick}

          onConnect={onConnect}
          onPaneClick={() => setSelectedEdge(null)}
          fitView
          proOptions={{ hideAttribution: true }}

          defaultEdgeOptions={{
  type: "smoothstep",
  animated: false,
  style: {
    stroke: "#94a3b8",
    strokeWidth: 2,
    strokeDasharray: "6 4",
  },
}}
        >
         <Background
  gap={22}
  size={1}
  color="rgba(255,255,255,0.28)"
/>



<Controls
  className={styles.controls}
  showInteractive={false}
/>
        </ReactFlow>


        {showModal && (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <h3>Nova etapa</h3>

      <input
        className={styles.modalInput}
        placeholder="Nome da etapa"
        value={stepName}
        onChange={(e) =>
          setStepName(e.target.value)
        }
      />

      <select className={styles.selectInput}
        value={stepType}
        onChange={(e) =>
          setStepType(e.target.value)
        }
      >
        <option value="buttons">
          Botões
        </option>
        <option value="message">
          Mensagem
        </option>

        <option value="flow">
  Fluxo
</option>

<option value="human">
  Atendimento
</option>
      </select>

      <div className={styles.modalActions}>
        <button
          onClick={() => setShowModal(false)}
          className={styles.cancelBtn}
        >
          Cancelar
        </button>

        <button
          onClick={addNewStep}
          className={styles.saveBtn}
        >
          Criar etapa
        </button>
      </div>
    </div>
  </div>
)}

        {selectedEdge && (
  <div
    className={styles.edgeMenu}
    style={{
      top: menuPos.y,
      left: menuPos.x,
    }}
  >
    <button
      onClick={deleteEdge}
      className={styles.deleteBtn}
    >
      Excluir conexão
    </button>
  </div>
)}
      </div>
    </div>
  );
}