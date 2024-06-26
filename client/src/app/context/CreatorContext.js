import axios, { Axios } from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL_API from "../../utilities/baseURL";
import { apiVariables } from "../../utilities/apiVariables";

export const CreatorContext = createContext();
export const CreatorContextProvider = ({ children }) => {
  const { courseId, id } = useParams();
  const navigate = useNavigate();
  const [searchedCreator, setSearchedCreator] = useState([]);
  const [queryError, setQueryError] = useState("");
  const [query, setQuery] = useState();
  const [creatorById, setCreatorById] = useState([]);
  const [isCreatorByIdLoading, setIsCreatorByIdLoading] = useState(false);
  const [isofferingByIdLoading, setIsofferingByIdLoading] = useState(false);
  const [allCreator, setAllCreator] = useState([]);
  const [isAllCreatorLoading, setIsAllCreatorLoading] = useState(false);
  const [offerring, setOffering] = useState([]);
  const [isOfferingLoading, setIsOfferingLoading] = useState(false);
  const [offeringById, setOfferingById] = useState([]);
  const [booking, setBooking] = useState([]);
  const [ErrorInBookingCreation, setErrorInBookingCreation] = useState("");
  const [IsBookingCreationLoading, setIsBookingCreationLoading] =
    useState(false);
  const [allCreatorForHome, setAllCreatorForHome] = useState([]);
  const updatecreatorByID = useCallback(() => {
    setCreatorById({});
  }, []);
  const updateSearchedCreator = useCallback((info) => {
    setQuery(info);
  }, []);
  const updateOffering = useCallback(() => {
    setOffering([]);
  }, []);

  const createBooking = useCallback(
    async (
      email,
      guest,
      slotDate,
      slotTime,
      courseId,
      creatorId,
      courseDetails
    ) => {
      try {
        let body = {
          email: email,
          guest: guest,
          slotDate: slotDate,
          slotTime: slotTime,
          courseId: courseId,
          creatorId: creatorId,
          courseDetails: courseDetails,
        };
        setErrorInBookingCreation(null);
        setIsBookingCreationLoading(true);
        const apicall = await axios.post(
          BASE_URL_API + apiVariables.createBooking.url,
          body,
          {
            withCredentials: true,
          }
        );
        if (apicall.status === 201) {
          setIsBookingCreationLoading(false);
          setBooking(apicall.data);
        } else {
          setIsBookingCreationLoading(false);
          setErrorInBookingCreation(apicall.data);
        }
      } catch (error) {
        setIsBookingCreationLoading(false);
        setErrorInBookingCreation("Interna server error");
        console.log(error);
      }
    }
  );

  const handleSearchedCreator = useCallback(
    async (query) => {
      try {
        const apicall = await axios.get(
          BASE_URL_API + apiVariables.getCreatorBylanguageOrName(query).url
        );
        if (apicall.status === 200) {
          setSearchedCreator(apicall.data);
        }
      } catch (error) {
        setQueryError(error.response.data.message);
        console.log(error);
      }
    },
    [query]
  );

  const getCraetorById = useCallback(
    async (id, name) => {
      try {
        setIsCreatorByIdLoading(true);
        const apicall = await axios.get(
          BASE_URL_API + apiVariables.getCreatorById(id).url,
          {
            withCredentials: true,
          }
        );
        if (apicall.status === 200) {
          setIsCreatorByIdLoading(false);
          setCreatorById(apicall.data);
          navigate(`creator/${name}`);
        }
      } catch (error) {
        setIsCreatorByIdLoading(false);
        console.log(error);
      }
    },

    [id]
  );

  const getOfferingByCreatorId = useCallback(
    async (id) => {
      try {
        setIsCreatorByIdLoading(true);
        const apicall = await axios.get(
          BASE_URL_API + apiVariables.getOfferingBycreatorId(id).url,
          {
            withCredentials: true,
          }
        );
        if (apicall.status === 200) {
          navigate(`creator/${id}`);
          setOffering(apicall.data);
          setIsOfferingLoading(false);
        }
      } catch (error) {
        setIsOfferingLoading(false);
        console.log(error);
      }
    },

    [creatorById]
  );

  const getOfferingById = useCallback(
    async (id, courseId) => {
      try {
        console.log(courseId, 'course id in func')
        setIsofferingByIdLoading(true);
        const apicall = await axios.get(
          BASE_URL_API + apiVariables.getOfferingById(courseId).url,
          {
            withCredentials: true,
          }
        );
        if (apicall.status === 200) {
          navigate(`/${id}/${courseId}`);
            setOfferingById(apicall.data);
            setIsofferingByIdLoading(false)
        }
      } catch (error) {
        setIsofferingByIdLoading(false);
        console.log(error);
      }
    },

    [offeringById]
  );

  const getAllCreatorForHome = useCallback(async () => {
    try {
      const apicall = await axios.get(
        BASE_URL_API + apiVariables.getAllCreatorForHome.url
      );
      if (apicall.status === 200) {
        setAllCreatorForHome(apicall.data);
      }
    } catch (error) {
      // setQueryError(error.response.data.message);
      console.log(error);
    }
  }, [allCreatorForHome]);

  const getAllCreator = useCallback(async () => {
    setCreatorById({});
    setIsAllCreatorLoading(true);
    try {
      const apicall = await axios.get(
        BASE_URL_API + apiVariables.getAllCreator.url,
        {
          withCredentials: true,
        }
      );
      if (apicall.status == 200) {
        setAllCreator(apicall.data);
        setIsAllCreatorLoading(false);
      }
    } catch (error) {
      setIsAllCreatorLoading(false);
      console.log(error);
    }
  }, [allCreator]);

  useEffect(() => {
    getAllCreatorForHome();
    getAllCreator();
  }, []);

  useEffect(() => {
    const getCreator = setTimeout(() => {
      handleSearchedCreator(query);
    }, 500);
    return () => clearTimeout(getCreator);
  }, [query]);

  return (
    <CreatorContext.Provider
      value={{
        searchedCreator,
        updateSearchedCreator,
        handleSearchedCreator,
        queryError,
        getCraetorById,
        isCreatorByIdLoading,
        creatorById,
        isAllCreatorLoading,
        allCreator,
        getAllCreator,
        updatecreatorByID,
        getOfferingByCreatorId,
        offerring,
        isOfferingLoading,
        offeringById,
        getOfferingById,
        isofferingByIdLoading,
        createBooking,
        booking,
        IsBookingCreationLoading,
        ErrorInBookingCreation,
        allCreatorForHome,
        updateOffering,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};
