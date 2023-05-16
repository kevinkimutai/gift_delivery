import React from "react";
import { useQuery } from "@apollo/client";

import {
  GiftRow,
  PromoBanner,
  PromoMsg,
  ShopNavigation,
} from "../../components";
import { GETALLCATEGORIES } from "../../services/graphql/queriesMutations";
import { PuffLoader } from "react-spinners";

const Gifts = () => {
  const { error, loading, data } = useQuery(GETALLCATEGORIES);
  return (
    <main className="bg-gradient-to-r from-yellow-200 to-white overflow-hidden min-h-screen w-screen">
      <PromoMsg />
      <ShopNavigation />
      {loading ? (
        <PuffLoader color="#36d7b7" />
      ) : error ? (
        <div className="flex bg-red-500 items-center justify-center">
          <p>{error.message}</p>
        </div>
      ) : (
        data && (
          <>
            {console.log(data)}
            {/* <GiftRow
              key={data.categories[0].id}
              category={data.categories[0].id}
            /> */}

            <GiftRow
              key={data.categories[1].id}
              category={data.categories[1]}
            />

            <GiftRow
              key={data.categories[0].id}
              category={data.categories[0]}
            />

            <PromoBanner />

            <GiftRow
              key={data.categories[2].id}
              category={data.categories[2]}
            />
          </>
        )
      )}
    </main>
  );
};

export default Gifts;
