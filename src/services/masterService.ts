import { apiClient } from '@/src/lib/apiClient'

export const createMasterService = (endpoint: string) => ({
  getAll: () => apiClient.get(`/${endpoint}`),
  create: (data: any) => apiClient.post(`/${endpoint}`, data),
  update: (id: number, data: any) => apiClient.put(`/${endpoint}/${id}`, data),
  delete: (id: number) => apiClient.delete(`/${endpoint}/${id}`)
})
