
export const AppConstants = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:44301",
  Verion: import.meta.env.VITE_VERSION || "1.0",

  COMPANY: "sportClub",
  HEADERS: {
    crossDomain: "true",
    Accept: "application/json",
    //Authorization: `Bearer ${localStorage.token}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, X-Auth-Token",
    "Content-Type": "application/json",
  },
  Auth_client_id: "sportclubLight",
  Auth_client_secret: "pletorico28",
  STORAGE_NAME: "personDemoStore",
  STORAGE_NAME_MANUAL: `personDemoStore`,
  COMMON_MSG_BOX_TITTLE: 'Persons demo',

};

export const AppConst_Paths = {

  PERSON_API_URL: `${AppConstants.BASE_URL}/api/person`,
  AUTH_API_URL: `${AppConstants.BASE_URL}/api/security`,


};
