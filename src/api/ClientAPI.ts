import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Client, ClientFormData, ContactData, contactSchema, dashboardClientSchema, editClientSchema, remindersSchema } from "@/types/index";

export async function getClients() {
  try {
    const { data } = await api(`/api/clients`);
    const response = dashboardClientSchema.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getReminders() {
  try {
    const { data } = await api('/api/clients/reminders');
    const response = remindersSchema.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getContacts() {
  try {
    const { data } = await api('/api/clients/contacts');
    const response = contactSchema.safeParse(data);
    
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getClientById(id: Client['_id']) {
  try {
    const { data } = await api(`/api/clients/${id}`);
    const response = editClientSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }    
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getClientByTelephone(telephone: Client['telephone']) {
  try {
    const { data } = await api(`/api/clients/search/${telephone}`);
    const response = dashboardClientSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

type ClientAPIType = {
  formData: ClientFormData;
  clientId: Client['_id'];
};

export async function updateClient({formData, clientId}: ClientAPIType) {
  try {
    const { data } = await api.put<string>(`/api/clients/${clientId}`, formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

type ContactAPIType = {
  formData: ContactData;
  clientId: Client['_id'];
};

export async function updateContact({formData, clientId}: ContactAPIType) {
  try {
    const { data } = await api.patch<string>(`/api/clients/${clientId}/contact`, formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function createClient(formData: ClientFormData) {
  try {
    const { data } = await api.post('/api/clients', formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteClient(id: Client['_id']) {
  try {
    const url = `/api/clients/${id}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}