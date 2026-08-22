import { axiosInstance } from "@/lib/axios";

export type ContactPayload = {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  subject: string;
  message: string;
};

type Contact = ContactPayload & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type ContactResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: Contact;
};

// The backend currently exposes this endpoint with the "conatct" spelling.
export const createContact = (payload: ContactPayload) =>
  axiosInstance
    .post<ContactResponse>("/auth/conatct", payload)
    .then((response) => response.data);
