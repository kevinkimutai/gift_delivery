import React from "react";
import Image from "../assets/img/unauthorized.jpg";

const Unauthorized = () => {
  return (
    <div className="w-full h-screen flex  items-center justify-center">
      <div className="w-1/2  flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">UNAUTHORIZED</h1>
        <p className="font-semibold mb-8">
          log in as an appropriate user to continue
        </p>
        <div>
          <button className="bg-purple-500 text-white rounded-md px-3 py-1 mr-8">
            Back To Home
          </button>
          <button className="border-2 border-purple-500 text-purple-500 rounded-md px-3 py-1">
            Login
          </button>
        </div>
      </div>

      <div className="w-1/2  flex items-center justify-center">
        <img src={Image} className="w-full object-contain" alt="unauthorized" />
      </div>
    </div>
  );
};

export default Unauthorized;
