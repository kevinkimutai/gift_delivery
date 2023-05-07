//@ts-nocheck
//{TODO: ADD TS CHECK ON FORMIK VALUES}
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const MAX_FILE_SIZE = 1024000; //1MB

const validFileExtensions = {
  image: ["jpg", "jpeg", "png", "gif"],
};

const AddGift = () => {
  const formik = useFormik({
    initialValues: {
      imageFile: null,
      category: "",
      name: "",
      price: "",
      quantity: "",
      description: "",
      features: "",
    },
    validationSchema: Yup.object({
      imageFile: Yup.mixed()
        .required("Please select an image file")
        .test("fileSize", "File size too large", (value) => {
          if (value) {
            return value.size <= MAX_FILE_SIZE;
          }
          return true;
        })
        .test("fileType", "Invalid file type", (value) => {
          if (value) {
            const fileType = value.type.split("/")[1];
            return validFileExtensions["image"].includes(fileType);
          }
          return true;
        }),
      name: Yup.string().required("*name is required"),
      category: Yup.string().required("*category is required"),
      price: Yup.number().required("*price is required"),
      quantity: Yup.number().required("*quantity is required"),
      description: Yup.string().required("*description is required"),
    }),
    onSubmit: async (values) => {
      try {
      } catch (error) {}
    },
  });

  const [previewImage, setPreviewImage] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      formik.setFieldValue("imageFile", selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <section className="p-2">
      <h1 className="font-semibold text-xl mb-4">Add New Gift</h1>
      <form className="border shadow-md w-full flex rounded-md p-8">
        {/*IMAGE UPLOAD */}
        <div className="w-1/3 flex justify-start items-center border mr-20 h-fit rounded-md">
          {formik.values.imageFile ? (
            previewImage && (
              <div className="flex justify-center items-center w-full p-4">
                <img
                  src={previewImage}
                  className="w-full object-contain"
                  alt="product"
                />
              </div>
            )
          ) : (
            <label
              htmlFor="imageFile"
              className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <input
                id="imageFile"
                name="imageFile"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          )}
        </div>

        {/*INPUT DETAILS  */}
        <div className="w-1/2 p-3 pl-6">
          <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">Category:</label>
            <div className="w-full">
              <input
                id="category"
                className="bg-purple-200 p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
                placeholder="category.."
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
              {formik.touched.category && formik.errors.category ? (
                <div className="flex justify-end">
                  <p className="text-red-600">{formik.errors.category}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">Name:</label>
            <div className="w-full">
              <input
                id="name"
                className="bg-purple-200 p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
                placeholder="Name of gift..."
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="flex justify-end">
                  <p className="text-red-600">{formik.errors.name}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">Price:</label>
            <div className="w-full">
              <input
                id="price"
                className="bg-purple-200 p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
                placeholder="price..."
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="flex justify-end">
                  <p className="text-red-600">{formik.errors.price}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">Quantity:</label>
            <div className="w-full">
              <input
                id="quantity"
                className="bg-purple-200 p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
                type="number"
                placeholder="quantity.."
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="flex justify-end">
                  <p className="text-red-600">{formik.errors.quantity}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">Description:</label>
            <div className="w-full">
              <textarea
                id="description"
                className="bg-purple-200 p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
                placeholder="description.."
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                rows={6}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="flex justify-end">
                  <p className="text-red-600">{formik.errors.description}</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">features:</label>
            <textarea
              id="features"
              className="bg-purple-200 p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
              placeholder="For Example: The Smart Fitness Tracker is equipped with advanced heart rate monitoring technology that provides real-time.... "
              rows={3}
            />
          </div>
          <div className="flex justify-center items-center mb-4">
            <label className="w-[7rem]">features:</label>
            <textarea
              id="features"
              className="bg-purple-200 p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
              placeholder="another feature.."
              rows={3}
            />
          </div>
          <div className="flex justify-center items-center">
            <button className="px-3 py-2 border border-purple-500 text-purple-700 rounded-md mr-3">
              Cancel
            </button>
            <button className="px-3 py-2 bg-purple-500 text-white rounded-md">
              Add Another Feature
            </button>
          </div>
          <div className="flex justify-center items-center mt-10">
            <button
              className="bg-sky-400 text-white rounded-md py-3 px-6"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddGift;
