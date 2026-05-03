import { apiClient } from "@/lib/apiClient";

export const schoolService = {
  getAll: () => apiClient.get("/schools"),
  create: (data) => apiClient.post("/schools", data),
  update: (id, data) => apiClient.put(`/schools/${id}`, data),
  delete: (id) => apiClient.delete(`/schools/${id}`),
};