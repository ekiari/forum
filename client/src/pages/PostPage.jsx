import React, { useCallback, useEffect, useState } from "react";
import {
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneEdit,
    AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import axios from "../utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "../redux/features/post/postSlice";
import { toast } from "react-toastify";

export const PostPage = () => {
    const [post, setPost] = useState(null);

    const { user } = useSelector((state) => state.auth);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id));
            toast("Post was removed.");
            navigate("/posts");
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        console.log(data);
        setPost(data);
    }, [params.id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    if (!post) {
        return (
            <div className="text-xl text-center text-white py-10">
                LOADING...
            </div>
        );
    }

    return (
        <div>
            <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                <Link to={"/"}>Back</Link>
            </button>

            <div className="flex gap-10 py-8">
                <div className="w-2/3">
                    <div className="flex flex-col basis-1/4 flex-grow">
                        <div>
                            {post?.imgUrl && (
                                <img
                                    src={`http://localhost:3002/${post.imgUrl}`}
                                    alt="img"
                                    className="object-cover w-full"
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <div className="text-xs text-white opacity-50">
                            {post.username}
                        </div>
                        <div className="text-xs text-white opacity-50">
                            <Moment date={post.createdAt} format="D MMM YYYY" />
                        </div>
                    </div>
                    <div className="text-white text-xl">{post.title}</div>
                    <p className="text-white opacity-60 text-xs pt-4">
                        {post.text}
                    </p>

                    <div className="flex gap-3 items-center mt-2 pb-10 justify-between">
                        <div className="flex gap-3 mt-4">
                            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                                <AiFillEye /> <span>{post.views}</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                                <AiOutlineMessage />{" "}
                                <span>{post.comments?.length || 0}</span>
                            </button>
                        </div>

                        {user?._id === post.author && (
                            <div className="flex gap-3 mt-4">
                                <button className="flex items-center justify-center gap-2 text-white opacity-50">
                                    <AiTwotoneEdit />
                                </button>
                                <button
                                    onClick={removePostHandler}
                                    className="flex items-center justify-center gap-2 text-white opacity-50"
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-1/3">COMMENTS</div>
            </div>
        </div>
    );
};
