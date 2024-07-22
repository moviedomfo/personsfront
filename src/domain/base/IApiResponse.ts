
export interface IApiResponse<T> {
  Result: T;
}

export interface IRequets {
  UserId: string;
  SportClubGuid: string;
  SecurityProviderName: string;
}

export class ApiErrorResponse {
  public data?: APIErrorData;
  public status: number = 0;
}

export class APIErrorData {
  public message?: string;
  public errorCode?: string;
  public type?: string;
  
}
