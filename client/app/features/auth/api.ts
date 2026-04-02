import { api } from "../../lib/axios";

export type RegisterPayload = {
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
};

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};
