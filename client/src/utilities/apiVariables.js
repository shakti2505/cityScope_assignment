export const apiVariables = {
  signup: {
    url: "/authentication/signup",
  },
  login: {
    url: "/authentication/login",
  },
  logout: {
    url: "/authentication/logout",
  },
  getCreatorBylanguageOrName: (nameOrLanguage) => ({
    url: `/creator/searchByCreatornameOrLanguage/${nameOrLanguage}`,
  }),
  getCreatorById: (id) => ({
    url: `/creator/getCraetorById/${id}`,
  }),
  getOfferingBycreatorId: (id) => ({
    url: `/creator/getOfferingByCreatorId/${id}`,
  }),
  getOfferingById: (id) => ({
    url: `/creator/getOfferingByid/${id}`,
  }),
  getAllCreator: {
    url: "/creator/getallcreator",
  },
  createBooking: {
    url: "/booking/createbooking",
  },
  getAllCreatorForHome:{
    url:'/creator/getallcretorForHome',
  }
};
