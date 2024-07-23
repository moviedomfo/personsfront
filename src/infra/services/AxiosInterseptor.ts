import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, HttpStatusCode, InternalAxiosRequestConfig } from "axios";
import { CustomError } from "@/Domain/base/IMessage";
import { ApiErrorResponse } from "@/Domain/base/IApiResponse";
import HelperFunctions from "@/Common/helpers/HelperFunctions";


// let currentLogin = HelperFunctions.getCurrenLoging();

const AxiosInterseptor = () => {
  // axios.interceptors.request.use( function (config) { if (config && config.headers) { config.headers["Authorization"] = "bearer myTokenFromStore"; config.headers["Content-Type"] = "application/json"; return config; }, function (error) { return Promise.reject(error); } );

  axios.interceptors.request.use(
    (req) => {
      if (req.url?.includes("authenticate") || req.url?.includes("refresh")) {
        setHeaderNotSecure(req);
        return req;
      } else {
        setHeader(req);
        return req;
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      let axiosErr: AxiosError = error as AxiosError;

      const customError = getError(axiosErr);

      if (customError.status === HttpStatusCode.Unauthorized || customError.status === HttpStatusCode.Forbidden || customError.status === HttpStatusCode.MethodNotAllowed) {
        if (!window.location.href.includes("/login")) window.location.href = "/login";
      }

      return Promise.reject(customError);
    }
  );
};

const setHeaderNotSecure = (req: InternalAxiosRequestConfig<any>) => {
  let headers = {
    // crossDomain: "true",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, X-Auth-Token",
  };
  req.headers["Content-Type"] = "application/json";
  req.headers["Access-Control-Allow-Origin"] = `*`;
  req.headers["securityProviderName"] = `sportClub`;
  req.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
  req.headers["Access-Control-Allow-Headers"] = "Origin, Content-Type, Authorization, X-Auth-Token";
  // req.headers = headers;
  //return req;
};

const setHeader = (req: InternalAxiosRequestConfig<any>) => {
  const currentLogin = HelperFunctions.getCurrenLoging();
  let headers;
  if (currentLogin) {
    headers = {
      Authorization: `Bearer ${currentLogin?.access_token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      securityProviderName: "sportclub",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      // "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, X-Auth-Token",
    };

    req.headers["Authorization"] = `Bearer ${currentLogin?.access_token}`;
    req.headers["securityProviderName"] = `sportclub`;
    req.headers["Content-Type"] = "application/json";
    req.headers["Access-Control-Allow-Origin"] = `*`;
    // req.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    // req.headers["Access-Control-Allow-Headers"] = "Origin, Content-Type, Authorization, X-Auth-Token";
    //req.headers = headers;
  }

  return req;
};

const getError = (err: AxiosError): CustomError => {

  const customError = new CustomError();
  const status = getErrorStatus(err);

  const errCode = getErrorCode(err);
  customError.code = errCode;


  customError.status = status ? status : HttpStatusCode.InternalServerError;
  customError.severity = "error";
  customError.message = getErrorMessage(err, status);

  return customError;
};

const getErrorStatus = (err: AxiosError): number => {
  if (err.status) return err.status;

  if (err.code === "ERR_NETWORK") {
    return HttpStatusCode.ServiceUnavailable;
  }
  if (err.response) {
    const errResponse = err.response as ApiErrorResponse;

    if (errResponse.status) {
      return errResponse.status;
    }
    // if (errResponse.data) {
    //   if (errResponse.data.statusCode) return parseInt(errResponse.data.statusCode);
    // }
  }

  return HttpStatusCode.NotImplemented;
};
const getErrorMessage = (err: AxiosError, status?: number): string => {
  let message = "";

  if (!status) {
    message = "Se produjo un erro no manejado por favor comuníquese con el administrador ";
    return message;
  }

  if (status === HttpStatusCode.ServiceUnavailable) {
    message = "El servidor de recursos se encuentra temporalmente ocupado. Vuelva a intentarlo mas tarde";
    return message;
  }
  // if (err.code === "ERR_NETWORK") {
  //   message = "No es posible conectarce al servidor. Por favor comuníquese con el administrador'";
  //   //return message;
  // }
  if (status === HttpStatusCode.NotImplemented) {
    message = err.message;
    return message;
  }
  //const sataus =  err.response ? err.response?.status : err.status;
  if (status === HttpStatusCode.Unauthorized) {
    message = "No está autorizado para realizar esta acción. Intente iniciar sesion nuevamente, si el problema persiste, por favor comuníquese con el administrador";

    // return message;
  }
  if (status === HttpStatusCode.NotFound) {
    message = "El usuario que ingreso no existe, si el problema persiste, por favor comuníquese con el administrador";

    //return message;
  }
  if (status === HttpStatusCode.BadRequest) {
    message = err.message;
    //return message;
  }

  if (err.response) {
    const errResponse = err.response as ApiErrorResponse;

    if (errResponse.data) {
      message = message.concat(`\n ${errResponse.data.message}`);
      return message;
    }

    if (errResponse.data) {
      message = `\n ${errResponse.data.message}`;
    }
  }


  return message;
};
const getErrorCode = (err: AxiosError, status?: number): string | undefined => {
  if (err.response) {
    const errResponse = err.response as ApiErrorResponse;
    if (errResponse.data) {
      return errResponse.data.errorCode;
    }
  }
  return undefined;
}

export default AxiosInterseptor;
