import { Branch } from "@/types";
import { api } from "./config";

const getAllGym = async () => {
    const response = await api.get(`/gym/all`);
    return response;
}

const createGym = async (payload: Branch) => {
    const response = await api.post(`/gym/create`, payload);
    return response;
}

const editGym = async (id: string, payload: Branch) => {
    const response = await api.put(`/gym/${id}`, payload);
    return response;
}

const getGymDetails = async (id?: number | null) => {
    const response = await api.get(`/gym/${id}`);
    return response;
}

export {
    createGym, editGym, getAllGym, getGymDetails
};

