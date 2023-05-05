import React from "react";

const AddGift = () => {
  return (
    <section className="p-2">
      <h1 className="font-semibold text-xl mb-4">Add New Gift</h1>
      <form className="border shadow-md w-full h-[20rem] flex rounded-md p-8">
        <div className="w-1/3 border border-purple-500 h-full rounded-md"></div>
        <div className="w-fit p-3 pl-6">
          <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">Name:</label>
            <input
              className="w-full bg-purple-200 p-2 rounded-md max-w-md  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
              placeholder="Name of gift..."
            />
          </div>
          <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">Price:</label>
            <input
              className="w-full bg-purple-200 p-2 rounded-md max-w-md  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
              placeholder="price..."
            />
          </div>
          <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">Category:</label>
            <input
              className="w-full bg-purple-200 p-2 rounded-md max-w-md  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
              placeholder="category.."
            />
          </div>
          {/* <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">Description:</label>
            <input
              className="w-full bg-purple-200 p-2 rounded-md max-w-md  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
              placeholder="category.."
            />
          </div> */}
        </div>
      </form>
    </section>
  );
};

export default AddGift;
