import React from "react";

import "./App.css";
import {
  Home,
  Gifts,
  GiftId,
  AdminOrders,
  Dashboard,
  HomeDashBoard,
  AddGift,
} from "./views";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/gifts/:id" element={<GiftId />} />

        {/*Admin Route */}
        <Route path="/admin" element={<Dashboard />}>
          <Route path="/admin/dashboard" element={<HomeDashBoard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/add-gift" element={<AddGift />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
