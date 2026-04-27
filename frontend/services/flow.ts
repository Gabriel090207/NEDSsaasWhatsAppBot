import { apiFetch } from "./api";

export type Flow = {
  id: string;
  name: string;
  nodes?: any[];
  edges?: any[];
};

export async function getFlows(): Promise<Flow[]> {
  return apiFetch("/flow");
}

export async function createFlow(name: string): Promise<Flow> {
  return apiFetch("/flow/", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export async function deleteFlow(id: string) {
  return apiFetch(`/flow/${id}`, {
    method: "DELETE",
  });
}


export async function updateFlowConfig(
  id: string,
  data: any
) {
  return apiFetch(`/flow/${id}/config`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function getFlow(id: string) {
  return apiFetch(`/flow/${id}`);
}

export async function saveFlow(
  id: string,
  data: {
    nodes: any[];
    edges: any[];
  }
) {
  return apiFetch(`/flow/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}