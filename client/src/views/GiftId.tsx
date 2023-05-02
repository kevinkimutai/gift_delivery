import React from "react";
import { ShopNavigation } from "../components";

const GiftId = () => {
  return (
    <main className="bg-gradient-to-r from-yellow-200 to-white overflow-hidden">
      <ShopNavigation />
      <section className="flex justify-center p-10 ">
        <div className="w-1/3">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/e-commerce-react-db-6189a.appspot.com/o/images%2F%201657912808834%20-%201plus-1.jpg?alt=media&token=1376d74d-385c-4f8f-b247-1d89a840e740"
            }
            className="object-contain"
            alt={"gift"}
          />
        </div>
        <div className="flex flex-col border w-1/2 p-10 bg-slate-500">
          <h2 className="font-semibold text-2xl text-white mb-5">
            Xiaomi 12 Pro
          </h2>
          <p className="ml-auto mb-5">
            <span className="font-semibold mr-3 text-yellow-300 text-2xl">
              Kshs
            </span>
            <span className="font-bold text-white text-xl">134500</span>
          </p>
          <p className="mb-4 text-neutral-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            culpa qui, explicabo rem quis, hic deleniti laboriosam possimus
            nobis error consequuntur dicta in. Qui ad porro magnam voluptas,
            minima rem?
          </p>
          <ul className="list-disc text-neutral-200 mb-4">
            <li>array 1</li>
            <li>array 1</li>
            <li>array 1</li>
            <li>array 1</li>
            <li>array 1</li>
          </ul>
          <div className="flex ml-auto items-center">
            <button className="px-4 py-2 mr-3 ring-1 ring-white text-white">
              Back{" "}
            </button>
            <button className="px-4 py-2 bg-white text-slate-500">
              Add To Cart
            </button>
          </div>
        </div>
        {/*TODO: ADD SIMILAR PRODUCTS SECTION */}
      </section>
    </main>
  );
};

export default GiftId;
