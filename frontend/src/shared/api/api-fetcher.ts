const API_ROOT = "http://localhost:3000/api/v1";

export const apiFetcher = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const url = `${API_ROOT}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};
