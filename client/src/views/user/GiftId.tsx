import React from "react";
import { ShopNavigation } from "../../components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GETONEGIFT } from "../../services/graphql/queriesMutations";
import { PuffLoader } from "react-spinners";

const GiftId = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GETONEGIFT, { variables: { id } });

  console.log(id);
  return (
    <main className="bg-gradient-to-r from-yellow-200 to-white overflow-hidden">
      <ShopNavigation />
      {loading ? (
        <PuffLoader color="#36d7b7" />
      ) : error ? (
        <div className="flex bg-red-500 items-center justify-center">
          <p>something went wrong</p>
        </div>
      ) : (
        data && (
          <section className="flex justify-center p-10 ">
            <div className="w-1/3">
              <img
                src={data.gift.image}
                className="object-contain"
                alt={"gift"}
              />
            </div>
            {/*TODO: ADD SCROLLING EFFECT FOR TEXTS */}
            <div className="flex flex-col border w-1/2 p-10 bg-slate-500">
              <h2 className="font-semibold text-2xl text-white mb-5">
                {data.gift.name}
              </h2>
              <p className="ml-auto mb-5">
                <span className="font-semibold mr-3 text-yellow-300 text-2xl">
                  Kshs
                </span>
                <span className="font-bold text-white text-xl">
                  {data.gift.price}
                </span>
              </p>
              <p className="mb-12 text-neutral-200">
                {data.gift.description.text}
              </p>
              <ul className="list-disc text-neutral-200 mb-4">
                {data.gift.description.features.map(
                  (feature: string, indx: number) => (
                    <li key={indx} className="mb-4 text-yellow-300">
                      {feature}
                    </li>
                  )
                )}
              </ul>
              <div className="flex ml-auto items-center">
                <button className="px-4 py-2 mr-3 ring-1 ring-white text-white">
                  Back
                </button>
                <button className="px-4 py-2 bg-white text-slate-500">
                  Add To Cart
                </button>
              </div>
            </div>
            {/*TODO: ADD SIMILAR PRODUCTS SECTION */}
          </section>
        )
      )}
    </main>
  );
};

export default GiftId;
