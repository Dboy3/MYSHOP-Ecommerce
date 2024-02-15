import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
// import { selectRegisteredUser } from "../../Authorise/authSlice";

function Profile() {
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [editIdx, setEditIdx] = useState(-1);
  console.log("check in Profile use : ", user);

  function handleEdit(add, index) {
    const newUser = { ...user, addresses: [...user.addresses] };
    // this will remove the add and add new add at the same place
    newUser.addresses.splice(index, 1, add);
    dispatch(updateUserAsync(newUser));
    setEditIdx(-1);
  }

  function handleRemove(e, index) {
    const newUser = { ...user, addresses: [...user.addresses] };
    // this will delete the address
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  }

  function handleEditForm(index) {
    setEditIdx(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("contact", address.contact);
    setValue("country", address.country);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("region", address.region);
    setValue("pincode", address.pincode);
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="mx-auto mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-9">
        {/* main list  */}
        <div className="border-t border-gray-200 px-4 py-8 sm:px-6">
          <h1 className="text-4xl my-4">
            {/* Name : {user.name ? user.name : "New user"}{" "} */}
          </h1>
          <h3 className="text-1xl text-red-700 my-4">Email : {user.email}</h3>
        </div>

        {/* subtotal is main  */}
        <div className="border-t border-gray-200 px-4 py-1 sm:px-6">
          {user.addresses.map((address, index) => (
            <div>
              {editIdx === index ? (
                <div className="lg:col-span-3">
                  <form
                    className="bg-white px-5 mt-24"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      console.log(data);
                      handleEdit(data, index);
                      reset();
                    })}
                  >
                    <div className="space-y-12 ">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("name", {
                                  required: "name is required",
                                })}
                                id="name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                {...register("email", {
                                  required: "email is required",
                                })}
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="contact"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              contact
                            </label>
                            <div className="mt-2">
                              <input
                                id="contact"
                                {...register("contact", {
                                  required: "contact is required",
                                })}
                                type="tel"
                                autoComplete="contact"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="country"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Country
                            </label>
                            <div className="mt-2">
                              <select
                                id="country"
                                {...register("country", {
                                  required: "country is required",
                                })}
                                autoComplete="country-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                              >
                                <option>India</option>
                                <option>Canada</option>
                                <option>Japan</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="street-address"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="street"
                                {...register("street", {
                                  required: "street address is required",
                                })}
                                autoComplete="street"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="city"
                                {...register("city", {
                                  required: "city is required",
                                })}
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="region"
                                {...register("region", {
                                  required: "state is required",
                                })}
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="pincode"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="pincode"
                                {...register("pincode", {
                                  required: "Pincode is required",
                                })}
                                autoComplete="pincode"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* btns */}
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        onClick={() => setEditIdx(-1)}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit address
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}

              {/* Displaying the address */}

              <p className="mt-0.5 text-sm text-gray-500">Your Address :</p>
              <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {/* {address.name} */}
                      Name
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.pincode}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {address.contact}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {address.city}
                  </p>
                </div>

                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  {/* put btns here */}

                  <button
                    onClick={() => handleEditForm(index)}
                    type="button"
                    className="font-medium text-purple-600 hover:text-purple-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium  text-purple-600 hover:text-purple-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
