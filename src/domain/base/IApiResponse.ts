import {IAPIError} from "./IMessage";

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
  public Message?: string;
  public StatusCode?: string;
  public Error?: SportAPIError;
}
export class SportAPIError {
  public Message: string = "";
  public StackTrace?: string;
  public Type: string = "FunctionalException";
  public ServiceName?: string;
  public Assembly?: string;
  public Namespace?: string;
  public Class?: string;
  public Machine?: string;
  public UserName?: string;
  public Severity?: string;
  public Source?: string;
  public InnerMessageException?: string;
  public ErrorId?: string;
}
