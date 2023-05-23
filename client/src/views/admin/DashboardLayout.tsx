import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = () => {
  return (
    <section className="relative flex items-start w-screen min-h-screen ">
      <aside className="fixed top-0 bottom-0 bg-yellow-200 w-[10rem] ">
        <div className="flex justify-center items-center mb-8 ">
          <img src="gift-logo.png" alt="logo" className="w-14 mr-2" />
          <span className="text-lg text-purple-700 italic">Giftr</span>
        </div>

        {/*TODO: ADD ICONS AND DROP DOWNS FOR SIDEBAR */}
        <ul className="text-slate-600 flex flex-col justify-center items-center mb-28 ">
          <li className="py-2">Dashboard</li>
          <li className="py-2">Orders</li>
          <li className="py-2">Stocks</li>
          <li className="py-2">Finance</li>
          <li className="py-2">Users</li>
        </ul>

        <ul className="text-slate-600 flex flex-col justify-center items-center">
          <li className="py-2">Banners</li>
          <li className="py-2">Gifts</li>
        </ul>
      </aside>

      <main className="w-full ml-[10rem] overflow-hidden">
        <nav className="bg-purple-400 p-4 text-white shadow-sm">
          Navigation Bar
        </nav>
        <ToastContainer />
        <section className="p-2">
          <Outlet />
        </section>
      </main>
    </section>
  );
};

export default DashboardLayout;
