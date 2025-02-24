import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MyFolderListResponse } from "client/src/types/my-folder.response";
import { EllipsisVertical, File, Folder, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import { MyFolderService } from "../../service/my-folder";
import LoadingModal from "../layouts/loading";
const MyFolder = () => {
    const queryClient = useQueryClient();
    const outlet = useOutlet()
    const navigate = useNavigate()
    const [valueInput, setInputValue] = useState<string>("")
    const { isPending, isError, data } = useQuery<MyFolderListResponse[]>({
        queryKey: ['my-folder'],
        queryFn: MyFolderService.getMyFolderList,
    })
    if (isPending) return <LoadingModal />
    if (isError) return toast.error("Something Wrong")

    const handleCreateFolder = async () => {
        const res = await MyFolderService.createFolder({
            name: valueInput
        })
        if (res) {
            toast.success("Created Folder Success")
            const modalCheckbox = document.getElementById("modal_createfolder") as HTMLInputElement;
            if (modalCheckbox) modalCheckbox.checked = false;
            await queryClient.invalidateQueries({
                queryKey: ['my-folder']
            })
        }
    }

    const handleDelete = async (id: string) => {
        const res = await MyFolderService.deleteFolder(id)
        if (res) {
            toast.success(`Deleted ${id} success`)
            await queryClient.invalidateQueries({
                queryKey: ['my-folder']
            })
        }
    }
    return (
        <>
            {
                outlet ? <Outlet /> :
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <div>
                            </div>
                            <label htmlFor="modal_createfolder" className="btn btn-dash btn-xs sm:btn-sm md:btn-md ">Create <File size={20} color="blue" /></label>

                        </div>
                        <div className="divider py-3"></div>
                        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-between items-center'>
                            {
                                data.length > 0 ?
                                    data?.map((item) =>

                                        <div key={item.id} onClick={() => navigate(`document/${item.id}`)} className="card card-xs shadow-sm card-border bg-base-100   hover:bg-gray-300 cursor-pointer transition-all duration-300 ease-in-out">
                                            <div className="card-body">
                                                <div className="flex items-center justify-between gap-3 p-2">
                                                    <div>
                                                        <Folder size={'20'} />
                                                        <h2 className="card-title">{item.name}</h2>
                                                    </div>
                                                    <div onClick={(e) => e.stopPropagation()} className="dropdown">
                                                        <div tabIndex={0} role="button" className="">
                                                            <EllipsisVertical size={'20'} />
                                                        </div>
                                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                            <li >

                                                                <a onClick={() => handleDelete(item.id)} className="flex gap-4">
                                                                    <Trash2 />
                                                                    Delete
                                                                </a>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                    : <div className=" grid-cols-1 col-span-4 flex justify-center items-center text-lg text-gray-500">
                                        No data
                                    </div>
                            }
                        </div>
                        <input type="checkbox" id="modal_createfolder" className="modal-toggle" />
                        <div className="modal" role="dialog">
                            <div className="modal-box">
                                <h3 className="text-lg font-bold">Create new folder</h3>
                                <div className="py-4 w-full">
                                    <fieldset className="fieldset">
                                        <legend className="fieldset-legend">Folder name</legend>
                                        <input value={valueInput}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            type="text" className="input" placeholder="Input folder name..." />
                                    </fieldset>
                                </div>
                                <div className="modal-action">
                                    <button onClick={handleCreateFolder} disabled={!valueInput} className="btn btn-success">OK</button>
                                    <label htmlFor="modal_createfolder" className="btn">Close!</label>
                                </div>
                            </div>
                        </div>
                    </div>

            }

        </>
    );
};

export default MyFolder;