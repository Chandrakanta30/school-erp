import { apiClient } from "@/lib/apiClient";

export const planService = {
  getAll: () => apiClient.get("/plans"),
  create: (data) => apiClient.post("/plans", data),
  update: (id, data) => apiClient.put(`/plans/${id}`, data),
  delete: (id) => apiClient.delete(`/plans/${id}`),
};