import { User } from "@/context/UserContext";
import { api } from "./config";

const getUser = async (document: string) => {
    const response = await api.get(`/document/${document}`);
    return response;
}

const createUser = async (payload: User) => {
    const response = await api.post(`/create`, payload);
    return response;
}

export {
    createUser,
    getUser
};

