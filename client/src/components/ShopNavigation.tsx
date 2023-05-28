import React from "react";
import { HiBars3BottomRight, HiUser, HiShoppingCart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShopNavigation = () => {
  const quantity = useSelector((state: any) => state.cartItems.quantity);

  return (
    <section className="flex items-center justify-between px-10 py-2 bg-white shadow-md sticky">
      <div className="flex items-center">
        <HiBars3BottomRight className="text-4xl mr-6 cursor-pointer" />
        <img
          src="gift-logo.png"
          alt="logo"
          className="w-[2.5rem] object-contain mr-3"
        />
        <span className="italic text-xl font-semibold text-purple-700">
          Giftr
        </span>
      </div>
      <div>
        <input
          placeholder="search for your favourite gift..."
          className="border border-purple-500 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-sky-500 w-[30rem] p-2"
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center mr-6">
          <HiUser className="mr-1" />
          {/*TODO:COME BACK TO USER */}
          <span className="text-purple-700 cursor-pointer">User</span>
        </div>
        <div className="flex justify-center items-center">
          <HiShoppingCart className="mr-1" />

          <Link to={"/user/cart"} className="relative cursor-pointer">
            <span className="text-purple-700">Cart</span>
            {quantity && quantity !== 0 && (
              <span className="text-xs p-2 text-white justify-center items-center animate-bounce absolute inline-flex h-full w-full -top-3 -right-3 rounded-full bg-purple-600 opacity-75">
                {quantity}
              </span>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopNavigation;
