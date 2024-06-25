import React, { useContext, useEffect, useState } from "react";
import { CreatorContext } from "../context/CreatorContext";
import { useNavigate, useParams } from "react-router-dom";
import Loader2 from "../../utilities/loaders/Loader2";

const CreatorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSortedOfferign, setShowSortedOffering] = useState(false);
  const [sortedOffering, setsortedOffering] = useState([]);
  const {
    creatorById,
    isCreatorByIdLoading,
    isAllCreatorLoading,
    allCreator,
    getAllCreator,
    getCraetorById,
    updatecreatorByID,
    getOfferingByCreatorId,
    getOfferingById,
    offerring,
    isOfferingLoading,
  } = useContext(CreatorContext);
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allCreator.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + allCreator.length) % allCreator.length
    );
  };


  const sortOffering = (criteria) => {
    setShowSortedOffering(true);
    if (criteria === "oldest") {
      setsortedOffering(
        offerring &&
          offerring.offering.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )[0]
      );

      console.log(sortedOffering, "sorted offering by old");
    } else if (criteria === "newest") {
      setsortedOffering(
        offerring &&
          offerring.offering.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[0]
      );
      console.log(sortedOffering, "sorted offering new");
    } else if (criteria === "top-rated") {
      setsortedOffering(
        offerring && offerring.offering.sort((a, b) => b.ratings - a.ratings)[0]
      );

      console.log(sortedOffering, "sorted offering top rated");
    }
  };

  return (
    <>
      {Object.keys(offerring).length !== 0 ? (
        <div className="flex flex-row max-sm:flex-wrap max-md:flex-wrap h-screen">
          <section className="">
            <div className="bg-[#93C6FB] relative w-[26.5rem] sm:w-full md:w-full flex flex-col bg-clip-border text-gray-700 shadow-md">
              <div className="mx-4 mt-6 h-40 overflow-hidden rounded-full bg-clip-border text-white">
                <img
                  className="h-40 w-40 object-cover rounded-full "
                  src={offerring.creatorDetails.profilePic}
                />
              </div>
              <div className="p-6 ">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {offerring.creatorDetails.name}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased text-wrap">
                  {offerring.creatorDetails.aboutMe}
                </p>
              </div>
              <div className="p-6 pt-0 flex items-center justify-between">
                <button
                  onClick={() => {
                    handlePrevClick();
                    if (
                      currentIndex >= 0 &&
                      currentIndex < allCreator.length - 1
                    ) {
                      const nextId = allCreator[currentIndex]._id;
                      getOfferingByCreatorId(nextId);
                    } else {
                      console.error("No next object in array.");
                    }
                  }}
                  data-ripple-light="true"
                  type="button"
                  className="select-none rounded-lg  bg-transparent py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    width="50"
                    height="50"
                  >
                    <path d="M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z" />
                  </svg>
                </button>

                <div className="flex flex-col items-center bg-[#AAD2FB] w-fit px-1.25 py-1.25 shadow-box-up rounded-xl dark:bg-box-dark dark:shadow-box-dark-out">
                  <p className="py-1 px-1 text-xs font-bold">Top</p>
                  <div className="flex flex-row items-center dark:shadow-buttons-box-dark rounded-2xl px-1.5 py-1.5 md:px-3">
                    <p className="text-3xl font-bold">1</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      width="30"
                      height="30"
                    >
                      <path d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-center  bg-[#AAD2FB] w-fit px-1.25 py-1.25 shadow-box-up rounded-xl dark:bg-box-dark dark:shadow-box-dark-out">
                  <p className="py-1 px-1 text-xs font-bold">Bookings</p>
                  <div className="flex flex-row items-center dark:shadow-buttons-box-dark rounded-2xl px-1.5 py-1.5 md:px-3 ">
                    <p className="text-3xl font-bold">
                      {offerring.creatorDetails.bookings}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleNextClick();
                    if (
                      currentIndex >= 0 &&
                      currentIndex < allCreator.length - 1
                    ) {
                      const nextId = allCreator[currentIndex]._id;
                      getOfferingByCreatorId(nextId);
                    } else {
                      console.error("No next object in array.");
                    }
                  }}
                  data-ripple-light="true"
                  type="button"
                  className="select-none rounded-lg  bg-transparent py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    width="50"
                    height="50"
                  >
                    <path d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          <section className="  bg-[#F0ECE2] w-[26.5rem] sm:w-full md:w-full overflow-auto">
            <div className="flex items-center gap-3 px-5 py-5 ">
              <button
                onClick={() => navigate("/")}
                className=" px-3 text-xl bg-black my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="28"
                  height="28"
                >
                  <path
                    fill="#fff"
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setShowSortedOffering(false)}
                className=" px-3 text-xl bg-black my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
              >
                All
              </button>
              <button
                onClick={() => sortOffering("oldest")}
                className=" px-3 text-xl bg-black my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
              >
                Oldest
              </button>
              <button
                onClick={() => sortOffering("newest")}
                className=" px-3 text-xl bg-black my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
              >
                Newest
              </button>
              <button
                onClick={() => sortOffering("top-rated")}
                className=" px-3 text-xl bg-black my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
              >
                Top rated
              </button>
            </div>
            <div
              className={
                showSortedOfferign
                  ? "hidden"
                  : "flex flex-wrap  gap-3 px-5 py-5"
              }
            >
              {offerring.offering &&
                offerring.offering.map((item) => {
                  return (
                    <>
                      <div className="flex flex-col  items-start bg-[#FEFEFE] rounded-2xl p-5 text-wrap">
                        <div className="flex items-center gap-1 justify-center bg-[#EFEFF1] rounded-full px-2 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            width="10"
                            height="10"
                          >
                            <path
                              fill="#070808"
                              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                            />
                          </svg>
                          <p>{item.ratings}</p>
                        </div>
                        <p className="text-xl text-wrap font-bold">
                          {item.title}
                        </p>
                        <div className="bg-[#EFEFF1] flex justify-between  rounded-xl px-3 py-3 gap-2 mt-12 w-full">
                          <div className="flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              width="30"
                              height="30"
                            >
                              <path
                                fill="#ACACAE"
                                d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
                              />
                            </svg>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold">
                                {item.duration}{" "}
                              </span>
                              <span className="text-xs">Video meeting </span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              navigate(`/${id}/${item._id}`);
                              getOfferingById(item._id);
                            }}
                            className="inline-flex items-center px-4 py-2 bg-transparent rounded-full ring-1 border-black   text-black text-sm font-medium active:bg-slate-400"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512"
                              width="12"
                              height="12"
                            >
                              <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
                            </svg>
                            <p className="text-bold text-md">{item.price}</p>
                            <svg
                              className="ml-1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              width="10"
                              height="10"
                            >
                              <path
                                fill="#00060f"
                                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>

            {Object.keys(sortedOffering).length !== 0 && showSortedOfferign && (
              <div
                className={
                  showSortedOfferign
                    ? "flex flex-wrap  gap-3 px-5 py-5"
                    : "true"
                }
              >
                <div className="flex flex-col  items-start bg-[#FEFEFE] rounded-2xl p-5 text-wrap">
                  <div className="flex items-center gap-1 justify-center bg-[#EFEFF1] rounded-full px-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="10"
                      height="10"
                    >
                      <path
                        fill="#070808"
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                      />
                    </svg>
                    <p>{sortedOffering.ratings}</p>
                  </div>
                  <p className="text-xl text-wrap font-bold">
                    {sortedOffering.title}
                  </p>
                  <div className="bg-[#EFEFF1] flex justify-between  rounded-xl px-3 py-3 gap-2 mt-12 w-full">
                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="30"
                        height="30"
                      >
                        <path
                          fill="#ACACAE"
                          d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
                        />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold">
                          {sortedOffering.duration}{" "}
                        </span>
                        <span className="text-xs">Video meeting </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        navigate(`/${id}/${sortedOffering._id}`);
                        getOfferingById(sortedOffering._id);
                      }}
                      className="inline-flex items-center px-4 py-2 bg-transparent rounded-full ring-1 border-black   text-black text-sm font-medium active:bg-slate-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        width="12"
                        height="12"
                      >
                        <path d="M0 64C0 46.3 14.3 32 32 32H96h16H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H231.8c9.6 14.4 16.7 30.6 20.7 48H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H252.4c-13.2 58.3-61.9 103.2-122.2 110.9L274.6 422c14.4 10.3 17.7 30.3 7.4 44.6s-30.3 17.7-44.6 7.4L13.4 314C2.1 306-2.7 291.5 1.5 278.2S18.1 256 32 256h80c32.8 0 61-19.7 73.3-48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H185.3C173 115.7 144.8 96 112 96H96 32C14.3 96 0 81.7 0 64z" />
                      </svg>
                      <p className="text-bold text-md">
                        {sortedOffering.price}
                      </p>
                      <svg
                        className="ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="10"
                        height="10"
                      >
                        <path
                          fill="#00060f"
                          d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                ;
              </div>
            )}

            <div className="flex flex-col px-5 py-5">
              <div className="flex items-center gap-3 mt-5">
                <div className="group relative">
                  <button>
                    <svg
                      className="w-8 hover:scale-125 duration-200 hover:stroke-[#0A66C2]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#0A66C2"
                        d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="group relative">
                  <button>
                    <svg
                      className="w-8 hover:scale-125 duration-200 hover:stroke-[#0A66C2]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-3xl font-bold py-5">About me</p>
              {/* {creatorById
            ? creatorById.bio
            : allCreator[currentIndex == 0 ? currentIndex : currentIndex - 1]
                .bio} */}
              {offerring.creatorDetails.bio}
            </div>
          </section>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Loader2 />
        </div>
      )}
    </>
  );
};

export default CreatorProfile;
