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


export {
    createGym,
    getAllGym
};

