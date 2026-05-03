import { apiClient } from "@/lib/apiClient";

export const subscriptionService = {
  getAll: () => apiClient.get("/subscriptions"),
  create: (data) => apiClient.post("/subscriptions", data),
};