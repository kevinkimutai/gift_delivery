import React from "react";

import Image from "../../assets/img/login-svg.png";
import Logo from "../../assets/img/gift-logo.png";

const Login = () => {
  return (
    <section className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-yellow-200 to-white">
      {/*TODO: ADD FOCUS STYLES AND HOVER ON BUTTON */}
      <div className="flex justify-center items-center w-2/3 h-fit  shadow-lg">
        <div className="flex justify-center items-center p-3 h-[25rem] bg-white w-1/3">
          <img src={Image} alt="login" className="object-contain" />
        </div>
        <div className="flex flex-col justify-center items-start bg-purple-400 h-[25rem] w-2/3 py-4 px-8">
          <div className="flex items-center mb-4">
            <img src={Logo} alt="logo" className="w-10 object-contain mr-1" />
            <span className="italic text-lg font-semibold text-white">
              Giftr
            </span>
          </div>
          <h1 className="text-white font-semibold text-2xl mb-2">Login</h1>
          <p className="text-yellow-200 max-w-xs text-sm mb-5">
            Login to your account to continue shopping for your loved one a
            great gift
          </p>

          <form className="w-full">
            <div className="flex items-center mb-4">
              <label className="w-24">Email</label>
              <div className="w-full ">
                <input
                  className="w-2/3 rounded-md p-2"
                  placeholder="Email..."
                />
              </div>
            </div>
            <div className="flex items-center mb-8">
              <label className="w-24">Password</label>
              <div className="w-full ">
                <input
                  className="w-2/3 rounded-md p-2"
                  placeholder="Password..."
                  type="password"
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="bg-sky-500 text-white px-6 py-2 rounded-md mb-4"
                type="submit"
              >
                Submit
              </button>
            </div>
            <p className="text-white font-semibold cursor-pointer text-sm">
              Don't Have an Account? Sign up Instead.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
