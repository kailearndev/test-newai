import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="flex justify-between ">
            <ul className="menu bg-base-200 di rounded-box sm:w-56 h-svh gap-2 ">
                <li className="menu-title text-xl ">Welcome~</li>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "bg-gray-500 text-white rounded-lg " : ""
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/my-folder"
                        className={({ isActive }) =>
                            isActive ? "bg-gray-500 text-white rounded-lg" : ""
                        }
                    >
                        My Folder
                    </NavLink>
                </li>

            </ul>
            <div className="px-5 py-5 flex-1 ">
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;