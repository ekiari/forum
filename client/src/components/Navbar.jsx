import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/features/Auth/authSlice";
import { toast } from "react-toastify";

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();

    const activeStyle = {
        color: "white",
    };

    const logoutHandler = () => {
        dispatch(logout());
        window.localStorage.removeItem("token");
        toast("You are logged out.");
    };

    return (
        <div className="flex py-4 justify-between items-center">
            <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-white rounded-sm">
                E
            </span>

            {isAuth && (
                <ul className="flex gap-8">
                    <li>
                        <NavLink
                            to={"/"}
                            href="/"
                            className="text-gray-400 hover:text-white"
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            Main
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/posts"}
                            href="/"
                            className="text-gray-400 hover:text-white"
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            My posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/new"}
                            href="/"
                            className="text-gray-400 hover:text-white"
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            Create new post
                        </NavLink>
                    </li>
                </ul>
            )}

            <div className="flex justify-center items-center bg-gray-600 text-white rounded-sm px-4 py-2">
                {isAuth ? (
                    <button onClick={logoutHandler}>Log Out</button>
                ) : (
                    <Link to={"/login"}>
                        <button>Log In</button>
                    </Link>
                )}
            </div>
        </div>
    );
};
