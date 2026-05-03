import { apiClient } from "@/lib/apiClient";

export const enquiryService = {
  getAll: () => apiClient.get("/student-enquiries"),
  create: (data) => apiClient.post("/student-enquiries", data),
  update: (id, data) => apiClient.put(`/student-enquiries/${id}`, data),
  delete: (id) => apiClient.delete(`/student-enquiries/${id}`),
};