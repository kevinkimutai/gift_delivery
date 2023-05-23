import React from "react";

import "./App.css";
import {
  Home,
  Gifts,
  GiftId,
  AdminOrders,
  DashboardLayout,
  HomeDashBoard,
  AddGift,
  Login,
  Signup,
  ShoppingCart,
} from "./views";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {/*USER ROUTES*/}
        <Route path="/" element={<Home />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/gifts/:id" element={<GiftId />} />

        {/*AUTH USERS ROUTES*/}
        <Route path="/user/cart" element={<ShoppingCart />} />

        {/*Admin Route */}

        <Route
          path="/admin"
          element={
            <DashboardLayout />
            // <ProtectedRoute allowedRoles={["user"]}>
            // {/*@ts-ignore*/}

            // </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<HomeDashBoard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/add-gift" element={<AddGift />} />
        </Route>

        {/*Auth Route */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
