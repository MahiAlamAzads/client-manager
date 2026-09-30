const baseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

async function apiClient(endpoint, options = {}) {
  const { data, headers, ...customConfig } = options;

  const defaultConfig = {
    "Content-Type": "application/json",
    ...(localStorage.getItem("token") && {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    ...headers,
  };

  const config = {
    ...customConfig,
    headers: defaultConfig,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...config,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const error = new Error(
      errorData?.message || `HTTP error! Status: ${response.status}`,
    );
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  // 6. Return parsed JSON (or empty object if 204 No Content)
  return response.status === 204 ? null : await response.json();
}

export const api = {
  get: (endpoint, options = {}) =>
    apiClient(endpoint, { method: "GET", ...options }),
  post: (endpoint, data, options = {}) =>
    apiClient(endpoint, { method: "POST", data, ...options }),
  put: (endpoint, data, options = {}) =>
    apiClient(endpoint, { method: "PUT", data, ...options }),
  delete: (endpoint, options = {}) =>
    apiClient(endpoint, { method: "DELETE", ...options }),
  patch: (endpoint, data, options = {}) =>
    apiClient(endpoint, { method: "PATCH", data, ...options }),
};
