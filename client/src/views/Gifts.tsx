import React from "react";
import { GiftRow, ShopNavigation } from "../components";

const Gifts = () => {
  return (
    <main className="bg-gradient-to-r from-yellow-200 to-white overflow-hidden min-h-screen w-screen">
      <ShopNavigation />
      <GiftRow />
    </main>
  );
};

export default Gifts;
