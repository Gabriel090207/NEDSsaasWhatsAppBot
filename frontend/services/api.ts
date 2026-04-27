const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<
      string,
      string
    >),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const data = await response.json();

  if (!response.ok) {
  if (
    response.status === 401 &&
    typeof window !== "undefined"
  ) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  throw new Error(
    data.detail || "Erro na requisição"
  );
}

  return data;
}