import HelperFunctions from "@/Common/helpers/HelperFunctions";

export class AxiosHelper {
  public static GetHeader_Secure = (): any => {
    const currentLogin = HelperFunctions.getCurrenLoging();
    let headers;
    headers = {
      Authorization: `Bearer ${currentLogin?.access_token}`,
      "Content-Type": "application/json",
      // crossDomain: "true",
      Accept: "application/json",
      securityProviderName: "sportclub",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Authorization, X-Auth-Token",
    };
    return headers;
  };
}
