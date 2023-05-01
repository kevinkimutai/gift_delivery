import React from "react";
import { BsFlower1 } from "react-icons/bs";
import { FaWineBottle } from "react-icons/fa";

const GiftRow = () => {
  return (
    <section className="p-10 w-full">
      <div className="border shadow-md">
        <div className="bg-purple-900 p-3 text-white">
          <h2 className="flex items-center">
            <span>
              {/*TODO: ADD ANIMATION TO ICON */}
              <FaWineBottle className="mr-3" />
            </span>
            Wine
          </h2>
        </div>
        <div className="bg-white p-4">
          <div className="border-2 shadow-md p-2 w-[15rem] m-2">
            <img
              src="bollinger-rd-extra-brut-1.jpg"
              alt="wine"
              className="object-contain mb-4"
            />
            <h2 className="font-semibold mb-2">Bollinger rd Extra Brut Wine</h2>
            <p className="font-bold w-full ml-auto">
              <span className="text-purple-600 mr-1">Kshs</span>14000
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftRow;
