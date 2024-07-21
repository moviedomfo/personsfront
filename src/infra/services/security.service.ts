import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AppConstants, AppConst_Paths } from "@/Common/CommonConstants";
import { IUserSession } from "@/Domain/dto/AuthenticateISVC";
import HelperFunctions from "@/Common/helpers/HelperFunctions";

/**
 * Injectable service class that interact with Person Api Controller
 *
 */
export class SecurityService {

  public Logout = (): void => {
    localStorage.setItem(AppConstants.STORAGE_NAME_MANUAL, "");
  };

  public IsAuth = (): boolean => {
    const userSession = HelperFunctions.getCurrenLoging();
    if (userSession) return true;
    else return false;
  };

  public GetCurrenLoging = (): IUserSession => {
    return HelperFunctions.getCurrenLoging();
  };

  /**
   * 
   * @param userName Performs authentication against backend
   * @param password 
   * @returns 
   */
  public Auth = (userName: string, password: string): Promise<IUserSession> => {
    const apiURL = `${AppConst_Paths.AUTH_API_URL}/auth`
    const req = {
      username: userName,
      password: password,
      grant_type: "password",
      client_id: AppConstants.Auth_client_id,
      client_secret: AppConstants.Auth_client_secret,
      securityProviderName: "sportClub",
    };

    const config = {
      method: "post",
      url: apiURL,
      data: JSON.stringify(req),
    };

    return new Promise<IUserSession>((resolve, reject) => {
      return axios(config)
        .then((res) => {
          const result = res.data as IUserSession;

          const tokenInfo: any = jwtDecode(result.access_token);
          const roles = tokenInfo.roles;
          const personId = tokenInfo.personId;
          //const authClaims: AuthClaimsDTO = JSON.parse(JSON.stringify(access_token));

          const userSession: IUserSession = {
            UserName: userName,
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            roles,
            userId: result.userId,
            
          };


          resolve(userSession);
        })
        .catch((err) => reject(err));
    });
  };

  public GetAccessTk = (): string => HelperFunctions.getAccessTk();
}






