import React, { useContext, useEffect } from "react";
import homeSvg from "../../assets/hero.svg";
import star from "../../assets/start.svg";
import userrating from "../../assets/userating.svg";
import image1 from "../../assets/Images/image1.jpg";
import image2 from "../../assets/Images/image2.jpg";
import image3 from "../../assets/Images/image3.jpg";
import image4 from "../../assets/Images/image4.jpg";
import Navbar from "../Navbar";
import { CreatorContext } from "../context/CreatorContext.js";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate();

  const {
    searchedCreator,
    updateSearchedCreator,
    getCraetorById,
    isCreatorByIdLoading,
    allCreatorForHome,
    getOfferingByCreatorId
  } = useContext(CreatorContext);

  return (
    <>
      <section className="bg-[#F8F8F2]">
        {/* <div className="flex flex-row">
          <div className="flex justify-between items-center w-full px-5">
            <img src={logo} className="w-16 h-16 object-cover" />

            <div className="flex gap-3">
              <button className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition">
                Sign up free
              </button>
              <button className="bg-[#fff] border-2 border-[#3e3e3e] rounded-lg text-dark px-6 py-3 text-base hover:border-[#3e3e3e] cursor-pointer transition">
                Login
              </button>
            </div>
          </div>
        </div> */}
        <Navbar />
        <div className="flex flex-row justify-evenly items-start max-sm:flex-col p-16 ">
          <div className="flex flex-col text-wrap justify-start">
            <p className="font-normal text-5xl">Feed Your</p>
            <p className="font-bold text-5xl">Developer</p>
            <p className="font-bold text-5xl">brain</p>
            <p className="font-sans font-medium mt-3">
              Stuck in tutorial hell ?
            </p>
            <p className="font-sans font-medium">
              You have come to the right place. We make learning fun
            </p>
            <div className="mt-5 max-sm:px-1">
              <input
                onChange={(e) => updateSearchedCreator(e.target.value)}
                type="text"
                name="inputname"
                className="block w-full rounded-md py-1.5 px-16 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                placeholder="Search by creator or language"
              />
              {searchedCreator &&
                searchedCreator.map((item) => {
                  return (
                    <>
                      {item ? (
                        <button
                          onClick={() => {
                            if (user) {
                              // navigate(`creator/${item._id}`);
                              getCraetorById(item._id, item.name);
                              getOfferingByCreatorId(item._id)
                            } else {
                              alert("Please login to see profile");
                            }
                          }}
                          className=" mt-3 group hover:bg-[#F38BA3] relative bg-[#f674cd] rounded text-neutral-50 duration-500 font-bold flex justify-start gap-2 items-start p-2 pr-6 "
                        >
                          <div className="flex flex-col item-start">
                            <img
                              src={item.profilePic}
                              className="w-7 h-7 object-cover rounded-full"
                            />
                            <div className="flex">
                              <img
                                alt=""
                                src={star}
                                className="w-5 h-5 object-cover"
                              />
                              {item.rating}
                            </div>
                          </div>

                          <div className="flex flex-col items-start ">
                            <span className="border-l-2 px-1">{item.name}</span>
                            <span className="border-l-2 px-1 text-wrap">
                              {item.aboutMe}
                            </span>
                          </div>
                        </button>
                      ) : (
                        <div className="flex flex-row gap-2 mt-3">
                          <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
                          <div className="flex flex-col gap-2">
                            <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-full"></div>
                            <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>
            <hr className=" bg-black mt-3 w-60" />
            <div className="flex  justify-start mt-4 max-sm:flex-wrap md:flex-wrap">
              <div className="flex items-start">
                {allCreatorForHome &&
                  allCreatorForHome.map((item, i) => {
                    return (
                      <img
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                        src={item.profilePic}
                      />
                    );
                  })}
              </div>
              <div className="flex flex-col mx-2 ">
                <div className="flex flex-row max-sm:items-start max-sm:justify-between">
                  <img alt="" src={star} className="w-3 h-3 object-cover" />
                  <img alt="" src={star} className="w-3 h-3 object-cover" />
                  <img alt="" src={star} className="w-3 h-3 object-cover" />
                  <img alt="" src={star} className="w-3 h-3 object-cover" />
                  <img alt="" src={star} className="w-3 h-3 object-cover" />
                </div>
                <p>5/5 by 1000+ creators</p>
              </div>
            </div>
          </div>
          <img
            alt=""
            src={homeSvg}
            className="md:w-7/12 lg:w-5/12  object-cover max-sm:hidden"
          />
        </div>
      </section>
      <section className="  bg-[#EED475] p-3">
        <p className="font-extrabold text-4xl text-center">
          <span className="font-medium text-4xl">Creators</span> you might like
        </p>
        <div className="flex justify-center items-center gap-2 p-5 max-sm:flex-wrap">
          <button className="bg-[#FCF6E3]  text-dark font-normal py-1 px-4 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 ">
            React
          </button>
          <button className="bg-[#FCF6E3]  text-dark font-normal py-1 px-4 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 ">
            Flutter
          </button>
          <button className="bg-[#FCF6E3]  text-dark font-normal py-1 px-4 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 ">
            Rust
          </button>
          <button className="bg-[#FCF6E3]  text-dark font-normal py-1 px-4 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 ">
            Next.js
          </button>
          <button className="bg-[#FCF6E3]  text-dark font-normal py-1 px-4 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 ">
            Machine learning
          </button>
        </div>
        <div className="flex justify-center items-center max-sm:flex-wrap md:flex-wrap gap-2">
          {allCreatorForHome &&
            allCreatorForHome.map((item) => {
              return (
                <div className="w-60 h-80 bg-[#FDE4F5] rounded-3xl text-light p-4 flex flex-col items-start justify-center gap-3  hover:shadow-2xl">
                  <div className="w-52 h-32 bg-[#F586D2] rounded-2xl relative">
                    <div className="border-2  border-[#FDE4F5] w-16 h-16 rounded absolute top-1 left-1 rotate-45"></div>
                    <img
                      alt=""
                      src={item.profilePic}
                      className="w-24 h-24 object-cover rounded-full absolute top-16 left-14"
                    />
                  </div>
                  <div className="mt-6">
                    <p className="font-extrabold text-center">{item.name}</p>
                    <p className="text-center">{item.aboutMe}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Home;
