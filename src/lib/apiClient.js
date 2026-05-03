const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getHeaders = () => {
  const token = typeof window !== "undefined" 
    ? localStorage.getItem("token") 
    : null;

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  
return response.json();
}

// Generic API methods
export const apiClient = {
  get: async (url) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: getHeaders(),
    });
    
return handleResponse(res);
  },

  post: async (url, data) => {

    console.log('data', data,BASE_URL,url)
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
return handleResponse(res);
  },

  put: async (url, data) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    
return handleResponse(res);
  },

  delete: async (url) => {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    
return handleResponse(res);
  },
};