import { useQuery, useQueryClient } from "@tanstack/react-query";
import MDEditor from '@uiw/react-md-editor';
import { CreateDocumentBody as DocumnentPayload, HistoryResponse, MyDocumentListResponse } from "client/src/types/my-folder.response";
import { File, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate, useOutlet, useParams } from "react-router-dom";
import { MyFolderService } from "../../../service/my-folder";
import LoadingModal from "../../layouts/loading";

const MyDocument = () => {
    const [searchResults, setSearchResults] = useState<MyDocumentListResponse[]>([]);
    const [valueInput, setInputValue] = useState<DocumnentPayload>({
        title: "",
        content: "",
        folderId: "",
    })
    const { id } = useParams()
    const outlet = useOutlet()

    const [filter, setFilter] = useState<string>("")
    const navigate = useNavigate()

    const queryClient = useQueryClient();

    const { isPending, isError, data } = useQuery<MyDocumentListResponse[]>({
        queryKey: ['my-document', id],
        queryFn: () => MyFolderService.getMyDocumentList(id || ""),
    })
    const { data: dataHistory } = useQuery<HistoryResponse[]>({
        queryKey: ['my-history'],
        queryFn: MyFolderService.getHistoryList,
    })
    useEffect(() => {
        if (!filter) {
            setSearchResults([])
        }
    }, [filter])
    if (isPending) return <LoadingModal />
    if (isError) return toast.error("Something Wrong")

    const getTimeStamp = (timestamp: number) => {
        const date = new Date(timestamp);
        return date
    }
    const handleCreateDocument = async () => {
        const res = await MyFolderService.createDocument({
            ...valueInput,
            folderId: id || ""
        })
        if (res) {
            toast.success("Created Document Success")
            const modalCheckbox = document.getElementById("modal_create") as HTMLInputElement;
            if (modalCheckbox) modalCheckbox.checked = false;
            await queryClient.invalidateQueries({
                queryKey: ['my-document']
            })
            setInputValue({
                ...valueInput,
                title: "",
                content: ""
            })
        }
    }
    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {
            try {
                const res = await MyFolderService.handleSearchDocument(filter.trim());
                setSearchResults(res);
            } catch (err) {
                toast.error("Failed to search documents");
            }
        }
    };
    const handleDeleteDocument = async (id: string) => {
        const res = await MyFolderService.deleteDocument(id)
        if (res) {
            toast.success("Deleted Document Success")
            await queryClient.invalidateQueries({
                queryKey: ['my-document']
            })
        }

    }
    const handleNavigateDetail = async (id: string, content: string) => {
        const res = await MyFolderService.addHistory({
            id: id,
            title: content
        })
        if (res) {
            navigate(`${id}`)
            await queryClient.invalidateQueries({
                queryKey: ['my-history']
            })
        }
    }

    return (
        <>
            {outlet ? <Outlet /> :
                <div className="flex flex-col gap-3">

                    <div className="flex justify-between w-full ">
                        <div className="flex gap-2 items-center  w-full">

                            <label className="input ">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                                <input
                                    value={filter}
                                    onKeyDown={filter ? handleSearch : undefined}
                                    onChange={(e) => setFilter(e.target.value)}
                                    type="search" className="grow"
                                    placeholder="Search" />


                            </label>
                            <div className="flex items-center  gap-2">
                                <div className="badge badge-ghost">  Recently viewed</div>

                                {dataHistory?.map((item) => <div className="flex gap-2">

                                    <div onClick={() => navigate(`${item.id}`)} key={item.id} className="badge  duration-100 ease-in-out  badge-primary cursor-pointer hover:scale-110 ">{item.title}</div>
                                </div>
                                )}
                            </div>
                            {searchResults.length > 0 &&
                                <ul className="list absolute top-15 z-10 backdrop-blur-lg bg-base-100 rounded-box shadow-md ">
                                    {
                                        searchResults.map((item) =>
                                            <li onClick={() => handleNavigateDetail(item.id, item.title)} className="list-row hover:bg-gray-100 cursor-pointer ">
                                                <div className="flex justify-between items-center  w-full " >
                                                    <div className="text-xs uppercase font-semibold opacity-60 ">{item.title}</div>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>


                            }
                        </div>

                        <label htmlFor="modal_create" className="btn btn-dash btn-xs sm:btn-sm md:btn-md ">Create <File size={20} color="blue" /></label>
                    </div>
                    <div className="divider py-3"></div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Tittle</th>
                                    <th>Content</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.length > 0 ?
                                        data?.map((item, idx) =>
                                            <tr key={item.id}
                                                onClick={() => navigate(item.id)}
                                                className="hover:bg-gray-100 ease-linear duration-100 delay-75 cursor-pointer">
                                                <th>{idx + 1}</th>
                                                <td>{item.title}</td>
                                                <td>
                                                    <div className="p-4 " data-color-mode="light">
                                                        <MDEditor className="p-4   bg-gray-100"
                                                            preview="preview"
                                                            value={item.content} />
                                                    </div>

                                                </td>
                                                <td>{getTimeStamp(item.createdAt).toLocaleString('vn-VN')}</td>
                                                <td>{getTimeStamp(item.updatedAt).toLocaleString('vn-VN')}</td>
                                                <td><X onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDeleteDocument(item.id)
                                                }} size={18} color="red" /></td>
                                            </tr>
                                        ) :
                                        <tr>
                                            <td colSpan={6} className="text-center py-10">
                                                No data !
                                            </td>
                                        </tr>
                                }

                            </tbody>
                        </table>
                    </div>
                    <input type="checkbox" id="modal_create" className="modal-toggle" />
                    <div className="modal" role="dialog">
                        <div className="modal-box">
                            <h3 className="text-lg font-bold">Create new folder</h3>
                            <div className="py-4 w-full">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Title</legend>
                                    <input value={valueInput.title}
                                        onChange={(e) => setInputValue({
                                            ...valueInput,
                                            title: e.target.value
                                        })}
                                        type="text" className="input" placeholder="Input title..." />
                                    <legend className="fieldset-legend">Content</legend>
                                    <div className=" w-auto" data-color-mode="light">
                                        <MDEditor
                                            onChange={(value) =>
                                                setInputValue({
                                                    ...valueInput,
                                                    content: value || ""
                                                })
                                            }
                                            preview="edit" className="p-4 bg-gray-100" value={valueInput?.content} />
                                    </div>
                                </fieldset>
                            </div>
                            <div className="modal-action">
                                <button onClick={handleCreateDocument} disabled={!valueInput.title || !valueInput.content} className="btn btn-success">OK</button>
                                <label htmlFor="modal_create" className="btn">Close!</label>
                            </div>
                        </div>
                    </div>

                </div>

            }
        </>
    );
};

export default MyDocument;