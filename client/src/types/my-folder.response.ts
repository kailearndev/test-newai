
export type MyFolderListResponse = {
    id: string;
    name: string;
    type: string;
}


export type MyDocumentListResponse = {
    id: string;
    folderId: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
}
export type CreateDocumentBody = {
    title: string
    content: string
    folderId: string
}
export type HistoryResponse = {
    id: string
    title: string
    timestamp: string
}