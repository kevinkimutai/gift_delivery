import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartReducer";
import userReducer from "./features/userReducer";

export const store = configureStore({
  reducer: {
    //user: userReducer,
    //foodItems: foodItemsReducer,
    //showCart: showCartReducer,
    cartItems: cartReducer,
    user: userReducer,
  },
});
