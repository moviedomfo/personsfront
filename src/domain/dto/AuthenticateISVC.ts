export interface AuthenticateREQ {
    userName: string;
    password: string;
    grant_type: string;
    client_id: string;
    client_secret: string;
    security_provider: string;
    sportClubGuid: string;
  }
  
  export interface AuthenticateRES {
    userId: string;
    access_token: string;
    refresh_token: string;
  }
  
  // not used, not implemented yet
  // export type TokenRes = {
  //   expires_in: number;
  //   access_token: string;
  //   refresh_token: string;
  //   userSession: IUserSession;
  // };
  
  export type IUserSession = {
    access_token: string;
    refresh_token: string;
    UserName: string;
    userId: string;
    roles: string[];
    
  };
  
  export const initialUserSession: IUserSession = {
    access_token: "",
    refresh_token: "",
    UserName: "",
    roles: [],
    userId: "",
    
  };
  