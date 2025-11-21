import { User } from "@/context/UserContext";
import { api } from "./config";

const getUser = async (document: string) => {
    const response = await api.get(`/users/document/${document}`);
    return response;
}

const createUser = async (payload: User) => {
    const response = await api.post(`/users/create`, payload);
    return response;
}

const updateUser = async (id?: number, payload?: User) => {
    const response = await api.put(`/users/${id}`, payload);
    return response;
}

export {
    createUser,
    getUser,
    updateUser
};

