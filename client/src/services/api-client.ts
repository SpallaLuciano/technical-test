import axios from 'axios';

export async function apiClient<Request, Response>(endpoint: string, body?: Request): Promise<Response> {
  const response = await axios.post(`http://localhost:5000/${endpoint}`, 
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}
