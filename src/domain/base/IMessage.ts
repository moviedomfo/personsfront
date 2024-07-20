export class CustomError extends Error {
  public severity: "warning" | "error" = "warning";
  public code?: string;
  public status?: number;
}
export const errorInitialize: CustomError = {
  message: "",
  severity: "error",
  code: undefined,
  name: ""
};

export interface ICustomError {
  message: string;
  severity: "warning" | "error";
  code?: string;
}

export const apiErrorInitialize: ICustomError = {
  message: "",
  severity: "error",
  code: undefined,
};

export interface IMessage {
  title: string;
  text: string;
  severity: "success" | "info" | "warning" | "error";
}
export interface ICrudMessage{
  Result: string,
  Message:string ,
  Id:string

}
export interface IAPIError {
  Message: string;
  StatusCode: number;

  ErrorId: string;

  InnerMessageException: string;
  ServiceName: string;
  Severity: string;
  Source: string;

  Type: string;
}
