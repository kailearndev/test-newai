import { useQuery } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import LoadingModal from "../../../layouts/loading";
import { MyFolderService } from "../../../../service/my-folder";
import { MyDocumentListResponse } from "client/src/types/my-folder.response";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DocumentDetail = () => {
    const { id } = useParams()
    const [dataValue, setDataValue] = useState<Partial<MyDocumentListResponse> | undefined>(undefined)
    const { isPending, isError, data } = useQuery<MyDocumentListResponse | undefined>({
        queryKey: ['my-detail', id],
        queryFn: () => MyFolderService.getDocumentDetail(id || ""),
    })
    useEffect(() => {
        if (data) {
            setDataValue(data);
        }
    }, [data]);

    const navigate = useNavigate()


    const handleUpdateDocument = async () => {
        const res = await MyFolderService.updateDocument(id || "", {
            content: dataValue?.content,
            title: dataValue?.title
        })
        if (res) {
            toast.success(`Update ${dataValue?.folderId} success`)
            navigate(-1)
        }
    }

    if (isPending) return <LoadingModal />
    if (isError) return toast.error("Document not found")

    return (
        <div className="flex flex-col ">
            <button onClick={handleUpdateDocument} disabled={!dataValue?.content} className="btn btn-primary w-20 mt-4">
                Save
            </button>
            <div className="divider "></div>
            <div className="grid grid-cols-1 gap-3  border-1 border-gray-100 shadow p-4 rounded-xl">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Folder ID</legend>
                    <div className="badge badge-neutral">{dataValue?.folderId || ''}</div>
                    <legend className="fieldset-legend">Title</legend>
                    <div className="badge badge-neutral">{dataValue?.title || ""}</div>
                    <legend className="fieldset-legend">Content</legend>
                    <div className=" w-auto" data-color-mode="light">
                        <MDEditor
                            onChange={(value) =>
                                setDataValue({
                                    ...dataValue,
                                    content: value || ""
                                })
                            }
                            preview="edit" className="p-4 bg-gray-100 " value={dataValue?.content || ""} />
                    </div>
                </fieldset>

            </div>

        </div>
    );
};

export default DocumentDetail;