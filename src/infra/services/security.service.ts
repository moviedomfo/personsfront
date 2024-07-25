import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AppConstants, AppConst_Paths } from "@/Common/CommonConstants";
import { IUserSession } from "@/Domain/dto/AuthenticateISVC";
import HelperFunctions from "@/Common/helpers/HelperFunctions";
import GetQrImageRes from "@/Domain/dto/GetQrImageISVC";
import { UserInfo } from "os";
import { GetUserRes } from "@/Domain/dto/GetUserISVC";


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
    const url = `${AppConst_Paths.AUTH_API_URL}/authenticate`;

    const twoFACode = HelperFunctions.getCookie(`token_2fa_${userName}`);
    const req = {
      userName: userName,
      password: password,
      grant_type: "password",
      client_id: AppConstants.Auth_client_id,
      client_secret: AppConstants.Auth_client_secret,
      securityProviderName: "sportClub",
      twoFACode
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      data: JSON.stringify(req),
    };
    //alert(url);
    return new Promise<IUserSession>((resolve, reject) => {
      return axios.request(config)
        .then((res) => {
          const result = res.data as IUserSession;

          const tokenInfo: any = jwtDecode(result.access_token);
          const roles = tokenInfo.roles;
          const userId = tokenInfo._id;
          //const authClaims: AuthClaimsDTO = JSON.parse(JSON.stringify(access_token));

          const userSession: IUserSession = {
            UserName: userName,
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            roles,
            userId,

          };


          resolve(userSession);
        })
        .catch((err) => {

          reject(err)
        }
        );
    });
  };

  public GetAccessTk = (): string => HelperFunctions.getAccessTk();
  public GetUser = (userName: string): Promise<GetUserRes> => {
    const url = `${AppConst_Paths.AUTH_API_URL}/getUser`;

    const params = { userName };
    const config = {
      method: "get",
      url: url,
      params: params,
    };

    return axios(config)
      .then((res) => {
        return res.data;
      });
  };
  public GetQrImage = (userName: string): Promise<GetQrImageRes> => {
    const url = `${AppConst_Paths.AUTH_API_URL}/getQrImage`;

    const params = { userName };
    const config = {
      method: "get",
      url: url,
      params: params,
    };

    return axios(config)
      .then((res) => {
        return res.data;
      });
  };

  /**
   * Sent 2FA code to server an if it's valid it's stored in a token_2fa Cookie, 
   * @param userName 
   * @param code 
   * @returns 
   */
  public Set2FA = (userName: string, code: string): Promise<boolean> => {
    const url = `${AppConst_Paths.AUTH_API_URL}/set2FA`;

    const params = { userName, code };
    const config = {
      method: "get",
      url: url,
      params: params,
    };

    return axios(config)
      .then((res) => {

        HelperFunctions.setCookie(`token_2fa_${userName}`, code, 1);
        return res.data;
      });
  };


}






