import { AxiosResponse } from "axios";
import api from "./api.config"
import { CreateDocumentBody, HistoryResponse, MyDocumentListResponse, MyFolderListResponse } from "../types/my-folder.response";

const getMyFolderList = async (): Promise<MyFolderListResponse[]> => {
    try {
        const res: AxiosResponse<MyFolderListResponse[]> = await api.get('/folders');
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
const deleteFolder = async (id: string) => {
    try {
        const res = await api.delete(`/folders/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);

    }
};
const createFolder = async (body: { name: string }) => {
    try {
        const res = await api.post('/folders', body);
        return res.data;
    } catch (error) {
        throw error;
    }
};
const createDocument = async (body: CreateDocumentBody) => {
    try {
        const res = await api.post('/documents', body);
        return res.data;
    } catch (error) {
        throw error;
    }
};
const getMyDocumentList = async (id: string): Promise<MyDocumentListResponse[]> => {
    try {
        const res: AxiosResponse<MyDocumentListResponse[]> = await api.get(`/folders/${id}/`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};
const handleSearchDocument = async (filter: string | {}): Promise<MyDocumentListResponse[]> => {
    try {
        const res: AxiosResponse<MyDocumentListResponse[]> = await api.get(`/search`,

            {
                params: {
                    query: filter
                }
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getDocumentDetail = async (id: string): Promise<MyDocumentListResponse | undefined> => {
    try {
        const res: AxiosResponse<MyDocumentListResponse> = await api.get(`/documents/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

const updateDocument = async (id: string, body: { content?: string, title?: string }) => {
    try {
        const res = await api.patch(`/documents/${id}`, body);
        return res.data;
    } catch (error) {
        console.error(error);

    }
};

const deleteDocument = async (id: string) => {
    try {
        const res = await api.delete(`/documents/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);

    }
};
const addHistory = async (body: { id?: string, title?: string }) => {
    try {
        const res = await api.post(`/history`, body);
        return res.data;
    } catch (error) {
        console.error(error);

    }
};

const getHistoryList = async (): Promise<HistoryResponse[]> => {
    try {
        const res = await api.get(`/history`);
        return res.data;
    } catch (error) {
        console.error(error);
        return []

    }
};



export const MyFolderService = {
    getMyFolderList,
    getMyDocumentList,
    getDocumentDetail,
    updateDocument,
    createFolder,
    createDocument,
    deleteFolder,
    deleteDocument,
    handleSearchDocument,
    addHistory,
    getHistoryList
}