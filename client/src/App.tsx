import React from "react";

import "./App.css";
import { Home, Gifts, GiftId } from "./views";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/gifts/:id" element={<GiftId />} />
      </Routes>
    </>
  );
}

export default App;
