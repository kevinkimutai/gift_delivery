import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "../../assets/img/login-svg.png";
import Logo from "../../assets/img/gift-logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LOGIN_USER } from "../../services/graphql/queriesMutations";
import { useMutation } from "@apollo/client";
import { PuffLoader } from "react-spinners";
import { userSliceActions } from "../../store/features/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginToAcc, { loading, error, data }] = useMutation(LOGIN_USER);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("*email is required"),
      password: Yup.string().required("*Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { email, password } = values;
        const response: any = await loginToAcc({
          variables: {
            email,
            password,
          },
        });

        const token = response.data.login.token;
        toast.success("Successfuly logged in", {
          position: toast.POSITION.TOP_CENTER,
        });

        console.log(token);
        localStorage.setItem("user", token.toString());
        //@ts-ignore
        dispatch(userSliceActions.login());

        //TODO: USE HISTORY TO HEAD BACK TO ROUTE

        navigate("auth/login");

        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <section className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-yellow-200 to-white">
      <ToastContainer />
      {/*TODO: ADD FOCUS STYLES AND HOVER ON BUTTON */}

      {loading ? (
        <div className="flex justify-center items-center p-4 ">
          <PuffLoader color="#36d7b7" />
        </div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <>
          <div className="flex justify-center items-center w-2/3 h-fit  shadow-lg">
            <div className="flex justify-center items-center p-3 h-[25rem] bg-white w-1/3">
              <img src={Image} alt="login" className="object-contain" />
            </div>
            <div className="flex flex-col justify-center items-start bg-purple-400 h-[25rem] w-2/3 py-4 px-8">
              <div className="flex items-center mb-4">
                <img
                  src={Logo}
                  alt="logo"
                  className="w-10 object-contain mr-1"
                />
                <span className="italic text-lg font-semibold text-white">
                  Giftr
                </span>
              </div>
              <h1 className="text-white font-semibold text-2xl mb-2">Login</h1>
              <p className="text-yellow-200 max-w-xs text-sm mb-5">
                Login to your account to continue shopping for your loved one a
                great gift
              </p>

              <form className="w-full" onSubmit={formik.handleSubmit}>
                <div className="flex items-center mb-4">
                  <label className="w-24">Email</label>
                  <div className="w-full ">
                    <input
                      id="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      className="bg-white p-2 rounded-md w-2/3  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-yellow-200"
                      placeholder="Email..."
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="flex justify-end">
                        <p className="text-red-600">{formik.errors.email}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center mb-8">
                  <label className="w-24">Password</label>
                  <div className="w-full ">
                    <input
                      id="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className="bg-white p-2 rounded-md w-2/3  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-yellow-200"
                      placeholder="Password..."
                      type="password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="flex justify-end">
                        <p className="text-red-600">{formik.errors.password}</p>
                      </div>
                    ) : null}
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
        </>
      )}
    </section>
  );
};

export default Login;
