import React from "react";

const PromoBanner = () => {
  return (
    <section className="flex justify-center items-center px-10 ">
      <div className="flex justify-center items-center border shadow-lg w-[80%] bg-gradient-to-r from-teal-500 to-purple-400">
        <div className="w-1/2 flex justify-center items-center ">
          <div className="w-1/2 ">
            <img
              className="object-contain w-100"
              src="https://firebasestorage.googleapis.com/v0/b/gift-delivery-7f82c.appspot.com/o/images%2F%201684258071116%20-%20barcelona_track-1.webp?alt=media&token=b7ab0378-c706-4911-b792-2f71a6159d1c"
              alt="promo"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center">
            <p className="mb-4 font-bold">
              Was Kshs <span className="text-2xl text-white ml-3">4500</span>
            </p>
            <p className="mb-4 font-bold">
              NOW Kshs <span className="text-xl  ml-1">4000</span>
            </p>
            <button>Buy Now</button>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center ">
          <h1 className="text-3xl font-bold text-white mb-4">SALE</h1>
          <p className="font-semibold">
            Upto <span className="font-bold text-black text-2xl mb-4">20%</span>{" "}
            on Selected Items
          </p>
          <button>Buy Now</button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
