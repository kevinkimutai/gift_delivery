import React from "react";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

const DashboardOverview = () => {
  return (
    <div className="flex justify-center items-center shadow-md bg-purple-200 w-fit p-4 rounded-md mr-6">
      <div className="mr-5">
        <h2 className="text-2xl mb-2">
          <span className="font-bold text-3xl">1500</span> Orders
        </h2>
        <p className="mb-4">
          <span className="font-semibold">14</span> pending
        </p>
        <p className="text-neutral-400 cursor-pointer">view all</p>
      </div>
      <div className="flex justify-center items-center bg-purple-500 p-2 rounded-md">
        <HiOutlineClipboardDocumentCheck className="text-3xl text-white" />
      </div>
    </div>
  );
};

export default DashboardOverview;
