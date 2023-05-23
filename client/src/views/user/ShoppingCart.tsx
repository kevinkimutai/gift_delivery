import React, { useState, useEffect } from "react";
import { ShopNavigation } from "../../components";
import { HiMinusSmall, HiPlusSmall, HiTrash } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/features/cartReducer";

const ShoppingCart = () => {
  const cartItems = useSelector((state: any) => state.cartItems.cartItems);
  const [totalPrice, setTotalPrice] = useState<number>();
  const dispatch = useDispatch();

  const calculateTotal = (arr: any) => {
    const sum = arr?.reduce(function (accumulator: any, currentValue: any) {
      return accumulator + currentValue.qty * +currentValue.price;
    }, 0);
    setTotalPrice(sum);
  };

  //TODO:COMEBACK TO TYPE DEFS

  //@ts-ignore
  useEffect(() => {
    calculateTotal(cartItems);

    return calculateTotal;
  }, [cartItems]);

  const addQty = (item: any) => {
    let data = [];
    data = JSON.parse(localStorage.getItem("cart")!) || [];

    const matchedIndx = data.findIndex((cart: any) => cart.name === item.name);

    console.log(matchedIndx);
    const matched = data.find((cart: any) => cart.name === item.name);
    matched.qty++;

    data[matchedIndx] = matched;

    localStorage.setItem("cart", JSON.stringify(data));

    //@ts-ignore
    dispatch(cartActions.addToCart());
  };

  const reduceQty = (item: any) => {
    let data = [];
    data = JSON.parse(localStorage.getItem("cart")!) || [];

    console.log(data);
    const matchedIndx = data.findIndex((cart: any) => cart.name === item.name);
    const matched = data.find((cart: any) => cart.name === item.name);

    if (+item.qty === 1) {
      console.log(data);
      console.log(data.splice(matchedIndx, 1));

      localStorage.setItem("cart", JSON.stringify(data.splice(matchedIndx, 1)));
    } else {
      matched.qty--;
      data[matchedIndx] = matched;

      localStorage.setItem("cart", JSON.stringify(data));
    }

    //@ts-ignore
    dispatch(cartActions.addToCart());
  };

  //TODO: MODIFY TO ADD FOR SPECIFIC PRODUCT
  const clearCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("quantity");

    //@ts-ignore
    dispatch(cartActions.addToCart());
  };

  return (
    <>
      <ShopNavigation />
      <section className="px-10 py-5 bg-gradient-to-r from-yellow-200 to-white overflow-hidden min-h-screen w-screen">
        <h1 className="font-semibold text-purple-600 text-2xl mb-9">
          Shopping Cart
        </h1>
        <div className="flex justify-center">
          <div className="flex w-full shadow-md p-5">
            <div className="flex flex-col h-full w-2/3">
              {cartItems.map((cart: any) => (
                <div
                  className="flex justify-between items-start w-full border-b border-red-700  p-4"
                  key={cart.id}
                >
                  <div className="flex h-full">
                    <img
                      className="w-[10rem] object-contain mr-4"
                      src={cart.image}
                      alt={cart.name}
                    />
                    <div>
                      <h2 className="font-semibold mb-3">{cart.name}</h2>
                      <p className="text-purple-800">{cart.category.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-between flex-col  h-full w-fit">
                    <div className="flex flex-col justify-center items-end">
                      <p className="mb-4">
                        <span className="mr-2 font-semibold">Kshs</span>
                        <span className="text-xl font-semibold">
                          {cart.price}
                        </span>
                      </p>
                      <div className="flex items-center justify-center">
                        <HiMinusSmall
                          className="mr-2 cursor-pointer"
                          onClick={() => {
                            reduceQty(cart);
                          }}
                        />
                        <span className="bg-purple-400 py-1 px-3 text-yellow-200">
                          {cart.qty}
                        </span>
                        <HiPlusSmall
                          className="ml-2 cursor-pointer"
                          onClick={() => addQty(cart)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <HiTrash className="text-red-700 mr-2 text-lg " />
                      <span className="cursor-pointer">Remove From Cart</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-1/3 p-4">
              <div className="p-5 bg-purple-500 h-fit w-full rounded-md">
                <h1 className="text-xl underline underline-offset-8 text-white font-semibold mb-5">
                  Order Summary
                </h1>
                <div className="flex justify-between items-center text-white mb-3">
                  <p>SubTotal:</p>
                  <p>
                    <span className=" font-semibold mr-2">Kshs</span>
                    <span className="font-semibold text-md">{totalPrice}</span>
                  </p>
                </div>

                <div className="flex justify-between items-center text-white mb-3">
                  <p>Delivery Fee:</p>
                  <p>
                    <span className=" font-semibold mr-2">Kshs</span>
                    <span className="font-semibold text-md">0</span>
                  </p>
                </div>

                <div className="flex justify-between items-center text-white mb-9 ">
                  <p>VAT:</p>
                  <p>
                    <span className=" font-semibold mr-2">Kshs</span>
                    <span className="font-semibold text-md">0</span>
                  </p>
                </div>

                <div className="flex justify-between items-center text-white mb-9">
                  <p className="text-lg font-semibold">TOTAL:</p>
                  <p>
                    <span className=" font-semibold mr-2">Kshs</span>
                    <span className="font-bold text-lg">{totalPrice}</span>
                  </p>
                </div>
                <button className="bg-white w-full rounded-md text-purple-600 font-semibold p-2">
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
