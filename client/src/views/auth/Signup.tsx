import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import Logo from "../../assets/img/gift-logo.png";
import { ADD_USER } from "../../services/graphql/queriesMutations";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../../store/features/userReducer";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [addNewUser, { error, loading, data: savedUserData }] =
    useMutation(ADD_USER);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("*full name is required"),
      email: Yup.string().required("*email is required"),
      password: Yup.string()
        .required("*Required")
        .min(8, "*Password is too short - should be 8 chars minimum.")
        .matches(
          /^(?=.*[a-z])/,
          "*Must contain at least one lowercase character"
        )
        .matches(
          /^(?=.*[A-Z])/,
          "*Must contain at least one uppercase character"
        )
        .matches(/^(?=.*[0-9])/, "Must contain at least one number")
        .matches(
          /^(?=.*[!@#%&])/,
          "*Must contain at least one special character"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { fullname, email, password } = values;
        await addNewUser({
          variables: {
            fullname,
            email,
            password,
          },
        });

        toast.success("successfully signed up to Giftr", {
          position: toast.POSITION.TOP_CENTER,
        });

        navigate("auth/login");

        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <section className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-yellow-200 to-white">
        {loading ? (
          <div className="flex justify-center items-center p-4 ">
            <PuffLoader color="#36d7b7" />
          </div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <>
            {/*TODO: ADD FOCUS STYLES AND HOVER ON BUTTON*/}

            <div className="flex justify-center items-center w-2/5 h-fit  shadow-lg">
              {/* <div className="flex justify-center items-center p-3 min-h-[25rem] bg-white w-1/3 border-2 border-red-600">
          <img src={Image} alt="login" className="object-contain" />
        </div> */}
              <div className="flex flex-col justify-center items-start bg-purple-400 min-h-[25rem] w-full py-4 px-12 shadow-lg">
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
                <h1 className="text-white font-semibold text-2xl mb-2">
                  Signup
                </h1>
                <p className="text-yellow-200  text-sm mb-10">
                  Signup to start shopping for your loved one a great gift
                </p>

                <form className="w-full" onSubmit={formik.handleSubmit}>
                  <div className="flex items-center mb-4">
                    <label className="w-24">Full Name</label>
                    <div className="w-full ">
                      <input
                        id="fullname"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.fullname}
                        className="bg-white p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-yellow-200"
                        placeholder="Full Name..."
                      />
                      {formik.touched.fullname && formik.errors.fullname ? (
                        <div className="flex justify-end">
                          <p className="text-red-600">
                            {formik.errors.fullname}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-24">Email</label>
                    <div className="w-full ">
                      <input
                        id="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="bg-white p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-yellow-200"
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
                        className="bg-white p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-yellow-200"
                        placeholder="Password..."
                        type="password"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="flex justify-end">
                          <p className="text-red-600">
                            {formik.errors.password}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <label className="w-24">Confirm Password</label>
                    <div className="w-full ">
                      <input
                        id="confirmPassword"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        className="bg-white p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-yellow-200"
                        placeholder="password..."
                        type="password"
                      />
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword ? (
                        <div className="flex justify-end">
                          <p className="text-red-600">
                            {formik.errors.confirmPassword}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex justify-end items-center">
                    <button
                      className="bg-sky-500 text-white px-6 py-2 rounded-md mb-4"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="text-white font-semibold cursor-pointer text-sm">
                    Already Have an Account? Login Instead.
                  </p>
                </form>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Signup;

// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//   const { auth } = useAuth();
//   const location = useLocation();

//   return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
//     <Outlet />
//   ) : auth?.user ? (
//     <Navigate to="/unauthorized" state={{ from: location }} replace />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

//646aa4abe4b2543059deceb1
