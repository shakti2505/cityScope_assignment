import React, { useContext, useEffect, useState } from "react";
import { CreatorContext } from "../context/CreatorContext";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Loader from "../../utilities/loaders/Loader";
import Loader2 from "../../utilities/loaders/Loader2";

const OfferingPage = () => {
  const { courseId, id} = useParams();
  const user = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate();
  const {
    offeringById,
    isofferingByIdLoading,
    offerring,
    getCraetorById,
    getOfferingByCreatorId,
    createBooking,
    getOfferingById,
    booking,
    IsBookingCreationLoading,
    ErrorInBookingCreation,
  } = useContext(CreatorContext);
  console.log(offeringById, "offeringById");

  const [slotDate, setslotDate] = useState("");
  const [slotTime, setslotTime] = useState("");

  const date = [
    {
      date: "03 feb",
      day: "Sat",
    },
    {
      date: "05 feb",
      day: "Mon",
    },
    {
      date: "07 feb",
      day: "Wed",
    },
    {
      date: "08 feb",
      day: "Thus",
    },

    {
      date: "09 feb",
      day: "Fri",
    },
  ];

  useEffect(()=>{
    getOfferingById(id, courseId);
  },[courseId])

  return (
    <>
      {offeringById.length==0 ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 />
        </div>
      ) : (
        <section className="bg-[#93C6FB] flex flex-row items-start justify-center p-20 gap-3 max-sm:p-8 max-md:p-10  max-sm:flex-wrap max-md:flex-wrap">
          <div className="flex flex-col  bg-white rounded-3xl max-sm:w-full  w-1/2 p-5">
            <div className="flex flex-col item-center gap-2 bg-[#E9F4FE] rounded-3xl p-6">
              <button
                onClick={() => {
                  //   getCraetorById(id);
                  //   getOfferingByCreatorId(id);
                  navigate(`/creator/${id}`);
                }}
                className="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="30"
                  height="30"
                >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
                <p className="text-sm">{offeringById.creatorDetails.name}</p>
              </button>

              <div className="flex items-center justify-between gap-3 ">
                <div className="flex flex-col text-wrap">
                  <p className="text-3xl font-bold">{offeringById.title}</p>
                  <div className="flex items-center gap-2 bg-[#D5E9FD] w-16 rounded-xl py-1 px-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      width="15"
                      height="15"
                    >
                      <path
                        fill="#FFD43B"
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                      />
                    </svg>
                    <p className="text-sm font-thin">{offeringById.ratings}</p>
                  </div>
                </div>
                <img
                  src={offeringById.creatorDetails.profilePic}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className=" flex justify-between  rounded-xl px-3 py-3 gap-2 mt-12 w-full">
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
                      {offeringById.duration}{" "}
                    </span>
                    <span className="text-xs">Video meeting </span>
                  </div>
                </div>

                <button
                  //   onClick={() => navigate(`/${id}/${item._id}`)}
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
                  <p className="text-bold text-md">{offeringById.price}</p>
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
            <div className="flex items-center flex-wrap p-6">
              <p className="text-md  text-wrap font-bold">
                {offeringById.courseDetails}
              </p>
              <p className="text-3xl font-bold mt-5">More offering</p>
            </div>
            <div className="bg-[#F7F7F7] flex flex-row w-98 items-center gap-3 p-5 overflow-auto">
              {offerring.offerring &&
                offerring.offerring.map((item, i) => {
                  return (
                    <div key={i} className="bg-[#FFFFFF] rounded-xl">
                      <div className="flex flex-col p-5">
                        <p className="text-md font-bold">{item.title}</p>
                        <p className="text-sm font-thin">
                          {item.duration} video meeting
                        </p>
                      </div>
                      <div className=" flex items-center justify-end p-2">
                        <button
                          title="Add New"
                          className="group cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="25"
                            height="25"
                          >
                            <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col bg-[#FFFFFF] rounded-xl p-5 sm:w-full md:w-1/3 ">
            <p className="text-sm font-bold">Pick a date</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-between max-sm:flex-wrap md:flex-wrap gap-5 ">
                {date.map((item) => {
                  return (
                    <>
                      <button
                        onClick={() => {
                          setslotDate(item.date);
                        }}
                        className="inline-flex items-center mt-2 px-2 py-2 rounded-md ring-1 text-black text-md font-medium active:bg-slate-400 focus:bg-slate-300"
                      >
                        {item.date}
                      </button>
                    </>
                  );
                })}
              </div>
            </div>
            <p className="text-sm font-bold mt-5">Pick a time</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center  justify-between max-sm:flex-wrap md:flex-wrap gap-5">
                {offeringById &&
                  offeringById.slots.map((item, index) => {
                    return (
                      <button
                        key={index}
                        disabled={item.booked}
                        onClick={() => {
                          if (!slotDate) {
                            alert("select date first");
                          } else {
                            setslotTime(item.time);
                          }
                        }}
                        className={`inline-flex items-center mt-2 px-2 py-2 rounded-md ring-1 text-black text-md font-medium ${
                          item.booked
                            ? "bg-gray-300 cursor-not-allowed"
                            : "focus:bg-slate-300 active:bg-slate-400"
                        }`}
                      >
                        {item.time}
                      </button>
                    );
                  })}
              </div>
            </div>

            <button
              disabled={slotDate && slotTime ? false : true}
              onClick={() => {
                createBooking(
                  user.email,
                  user.name,
                  slotDate,
                  slotTime,
                  offeringById._id,
                  offeringById.creatorDetails._id,
                  offeringById.courseDetails
                );
              }}
              className="inline-flex items-center mt-5 justify-center whitespace-nowrap rounded-md text-sm text-white font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 group bg-gray-900 hover:bg-gray-950 transition-all duration-200 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-gray-900"
            >
              {IsBookingCreationLoading ? "Please wait" : "confirm"}
            </button>
            {IsBookingCreationLoading && (
              <Alert variant="info">Booking completed.</Alert>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default OfferingPage;
