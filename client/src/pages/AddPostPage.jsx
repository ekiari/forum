import React from "react";

export const AddPostPage = () => {
    return (
        <form
            className="w-1/3 mx-auto py-10"
            onSubmit={(e) => e.preventDefault()}
        >
            <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
                Attach an image:
                <input type="file" className="hidden"></input>
            </label>
            <div className="flex object-cover py-2">IMAGE</div>

            <label className="text-30 text-white opacity-70">
                Title of the post:
                <input
                    type="text"
                    placeholder="Title"
                    className="mt-1 text-black w-full rounded-lg bg-gray-300 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                />
            </label>

            <label className="text-30 text-white opacity-70">
                Description:
                <textarea
                    placeholder="Description"
                    className="mt-1 text-black w-full rounded-lg bg-gray-300 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
                />
            </label>

            <div className="flex gap-8 items-center justify-center mt-4">
                <button className="flex justify-center items-center bg-gray-600 text-20 text-white rounded-sm py-2 px-4">
                    Post
                </button>
            </div>
        </form>
    );
};
