export const useApi = () => {

  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBaseUrl;


  // const baseUrl = "https://apostatudo-production.up.railway.app/api";

  const get = async <T>(url: string): Promise<T> => {
    const res = await fetch(`${baseUrl}${url}`);

    if (!res.ok) {
      throw new Error("Erro na requisição");
    }

    return res.json();
  };

  const post = async <T>(url: string, body: any): Promise<T> => {
    const res = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Erro na requisição");
    }

    return res.json();
  };

  const del = async (url: string): Promise<void> => {
    const res = await fetch(`${baseUrl}${url}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || "Erro ao excluir");
    }
  };

  const patch = async <T>(url: string, body: any): Promise<T> => {
    const res = await fetch(`${baseUrl}${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Erro na requisição");
    } 

    return res.json();
  };

  return { get, post, del, patch };
};
