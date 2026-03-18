import api from "../api/axiosinstance";

/**
 * Sends order data to the database via API.
 * @param order An object containing orderId, date, status, and total.
 * @returns The API response data.
 */
export async function sendOrderToDB(order: {
  orderId: string;
  date: string;
  status: string;
  total: string;
}) {
  try {
    const response = await api.post("/orders", order);
    return response.data;
  } catch (error: any) {
    // Optionally log or handle error
    throw error;
  }
}
