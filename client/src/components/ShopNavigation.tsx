import React from "react";
import { HiBars3BottomRight, HiUser, HiShoppingCart } from "react-icons/hi2";

const ShopNavigation = () => {
  return (
    <section className="flex items-center justify-between px-10 py-2 bg-white shadow-md">
      <div className="flex items-center">
        <HiBars3BottomRight className="text-4xl mr-6" />
        <img
          src="gift-logo.png"
          alt="logo"
          className="w-[4rem] object-contain mr-3"
        />
        <span className="italic text-xl font-semibold text-purple-700">
          Giftr
        </span>
      </div>
      <div>
        <input
          placeholder="search for your favourite gift..."
          className="border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-sky-500 w-[30rem] p-2"
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center mr-6">
          <HiUser />
          <span>User Account</span>
        </div>
        <div className="flex justify-center items-center">
          <HiShoppingCart />
          <span>Cart</span>
        </div>
      </div>
    </section>
  );
};

export default ShopNavigation;
