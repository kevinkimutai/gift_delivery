import React, { useRef, useEffect, useState } from "react";
import { BsFlower1 } from "react-icons/bs";
import { FaWineBottle } from "react-icons/fa";

import { useQuery } from "@apollo/client";
import {
  GETALLGIFTS,
  GETGIFTSBYCATEGORY,
} from "../services/graphql/queriesMutations";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";

type PageProps = {
  category: { id: string; name: string };
};

const GiftRow = (props: PageProps) => {
  const scrollableRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const { loading, error, data } = useQuery(GETGIFTSBYCATEGORY, {
    variables: { id: props.category.id },
  });

  useEffect(() => {
    const divElement: any = scrollableRef.current;
    if (divElement) {
      console.log(divElement.clientWidth);
      setShowLeftArrow(divElement.scrollLeft > 0);
      setShowRightArrow(
        divElement.scrollLeft < divElement.scrollWidth - divElement.clientWidth
      );
    }
  }, []);

  const scrollToLeft = () => {
    const divElement: any = scrollableRef.current;
    if (divElement) {
      divElement.scrollBy({
        left: -divElement.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollToRight = () => {
    const divElement: any = scrollableRef.current;
    if (divElement) {
      divElement.scrollBy({
        left: divElement.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="p-10 w-full">
      <div className="border shadow-md">
        {loading ? (
          <ClipLoader color="#c084fc" />
        ) : error ? (
          <div>something went wrong!!!</div>
        ) : (
          <>
            <div className="bg-purple-600 p-2 text-white">
              <h2 className="flex items-center text-lg">
                <span>
                  {/*TODO: ADD ANIMATION TO ICON */}
                  <FaWineBottle className="mr-3" />
                </span>
                {props.category.name}
              </h2>
            </div>
            <div
              ref={scrollableRef}
              className="flex justify-start items-start bg-white p-4 pb-7 w-full overflow-x-scroll scrollbar-hide relative"
            >
              {/*TODO:ADD SCROLLABLE BTNS*/}
              {/* {showLeftArrow && (
                <button
                  className="bg-purple-300 rounded-full p-3 absolute top-[40%] left-0 z-40"
                  onClick={scrollToLeft}
                >
                  <HiArrowSmallLeft />
                </button>
              )}
              {showRightArrow && (
                <button
                  className="bg-purple-300 rounded-full p-3 absolute top-[40%] right-0 z-40"
                  onClick={scrollToRight}
                >
                  <HiArrowSmallRight />
                </button>
              )} */}

              {data?.giftsByCategory.map((item: any) => (
                <Link to={`/gifts/${item.id}`}>
                  <div
                    key={item.id}
                    className="flex justify-between flex-col border-2 shadow p-2 min-w-[10rem] m-3 min-h-[17rem] hover:scale-110 hover:shadow-sm cursor-pointer transition duration-700 ease-in-out"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-contain mb-4 "
                    />
                    <div>
                      <h2 className="font-semibold mb-2 flex-1">{item.name}</h2>
                      <p className="font-bold w-full ml-auto flex-1">
                        <span className="text-purple-600 mr-1">Kshs</span>
                        {item.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      {/* <div className="flex justify-center -mt-4">
        <button className="bg-purple-600 text-white py-2 px-6 rounded-md hover:scale-105 hover:duration-300 transition ease-in-out">
          View More
        </button>
      </div> */}
    </section>
  );
};

export default GiftRow;
