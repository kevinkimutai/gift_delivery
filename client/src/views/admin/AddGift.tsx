//@ts-nocheck

//{TODO: ADD TS CHECK ON FORMIK VALUES}
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { storage } from "../../config/firebase.config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { HashLoader, PuffLoader } from "react-spinners";
import {
  ADD_GIFT,
  GETALLCATEGORIES,
} from "../../services/graphql/queriesMutations";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 1024000; //1MB

const validFileExtensions = {
  image: ["jpg", "jpeg", "png", "gif", "webp"],
};

const AddGift = () => {
  const [
    addNewGift,
    { loading: submitting, error: errorSubmit, data: savedData },
  ] = useMutation(ADD_GIFT);
  const {
    loading: categoryLoading,
    error: categoryError,
    data: categoriesData,
  } = useQuery(GETALLCATEGORIES);

  const formik = useFormik({
    initialValues: {
      imageFile: null,
      category: "",
      name: "",
      price: "",
      quantity: "",
      description: "",
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
    onSubmit: async (values, { resetForm }) => {
      const featuresArray = Object.values(giftFeatures);

      try {
        await addNewGift({
          variables: {
            image: previewImage,
            name: values.name,
            category: values.category,
            price: +values.price,
            countInStock: values.quantity,
            description: {
              text: values.description,
              features: featuresArray,
            },
          },
        }).then(() =>
          toast.success("Gift successfully added!!", {
            position: toast.POSITION.TOP_CENTER,
          })
        );
        setFeaturesIndex([1, 2]);
        setPreviewImage("");
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const [previewImage, setPreviewImage] = useState("");
  const [imageUpload, setImageUpload] = useState<boolean>(false);
  const [giftFeatures, setGiftFeatures] = useState();
  const [featuresIndex, setFeaturesIndex] = useState<Number[]>([1, 2]);

  const changeFeatureHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setGiftFeatures((prevGifts) => ({
      ...prevGifts,
      [name]: value,
    }));
  };

  const featuresNumberHandler = () => {
    setFeaturesIndex((indx) => [...indx, indx.length + 1]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    if (selectedFile) {
      formik.setFieldValue("imageFile", selectedFile);
      //setPreviewImage(URL.createObjectURL(selectedFile));
      if (formik.errors.imageFile) return;

      setImageUpload(true);
      const storageRef = ref(
        storage,
        `images/ ${Date.now()} - ${selectedFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log("Something went wrong while uploading", error);
          setImageUpload(false);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPreviewImage(downloadURL);

            setImageUpload(false);
          });
        }
      );
    }
  };

  //TODO: ADD DELETE IMAGE HANDLER

  return (
    <section className="w-full p-2">
      <h1 className="font-semibold text-xl mb-4">Add New Gift</h1>
      {submitting ? (
        <div className="flex justify-center items-center">
          <HashLoader color="#36d7b7" />
        </div>
      ) : errorSubmit ? (
        <>
          {console.log(errorSubmit)}
          <div>{errorSubmit.message}</div>
        </>
      ) : (
        <form
          className="border shadow-md w-full flex rounded-md p-8"
          onSubmit={formik.handleSubmit}
        >
          {/*IMAGE UPLOAD */}
          <div className="w-1/3 flex justify-start items-center border mr-20 h-fit rounded-md">
            {!imageUpload && previewImage ? (
              <div className="flex flex-col justify-center items-center w-full p-4">
                <img
                  src={previewImage}
                  className="w-full object-contain"
                  alt="product"
                />
                <button
                  className="mt-4 bg-red-600 text-white px-3 py-2 rounded-md"
                  type="button"
                >
                  Delete Image
                </button>
              </div>
            ) : !previewImage && imageUpload ? (
              <div className="flex justify-center items-center p-4 ">
                <PuffLoader color="#36d7b7" />
              </div>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
                <select
                  id="category"
                  className="bg-purple-200 p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
                  placeholder="category.."
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.category}
                >
                  <option value=""></option>
                  {categoryLoading ? (
                    <option value="">Loading...</option>
                  ) : categoryError ? (
                    <option>something went wrong...</option>
                  ) : (
                    categoriesData.categories.map((option: any) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))
                  )}
                </select>
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
            {featuresIndex.map((indx) => (
              <div className="flex justify-center items-center mb-4" key={indx}>
                <label className="w-[7rem]">features:</label>
                <textarea
                  name={`feature-${indx}`}
                  className="bg-purple-200 p-2 rounded-md w-full  focus:outline-none focus:ring-1 focus:ring-sky-400 focus:bg-transparent"
                  placeholder="For Example: The Smart Fitness Tracker is equipped with advanced heart rate monitoring technology that provides real-time.... "
                  onChange={changeFeatureHandler}
                  rows={3}
                />
              </div>
            ))}

            <div className="flex justify-center items-center">
              <button
                className="px-3 py-2 border border-purple-500 text-purple-700 rounded-md mr-3"
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 bg-purple-500 text-white rounded-md"
                type="button"
                onClick={featuresNumberHandler}
              >
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
      )}
    </section>
  );
};

export default AddGift;
