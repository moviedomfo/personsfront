import { ICustomError } from "@/Domain/base/IMessage";
import { IUserSession } from "@/Domain/dto/AuthenticateISVC";
import { AppConstants } from "../CommonConstants";

export default class HelperFunctions {

  public static getCurrenLoging = (): IUserSession | undefined => {
    const data = localStorage.getItem(AppConstants.STORAGE_NAME_MANUAL) || undefined;
    if (data) {
      
      const userSession: IUserSession = JSON.parse(data);
      return userSession;
    }

    return undefined;
  };
  public static setCurrenLoging = (userSession: IUserSession): void => {
    localStorage.setItem(AppConstants.STORAGE_NAME_MANUAL, JSON.stringify(userSession));

  };

  public static getAccessTk = (): string | null => {
    let currentLogin: IUserSession = HelperFunctions.getCurrenLoging();

    return currentLogin.access_token ? currentLogin.access_token : null;
  };

  public static GetError = (error: unknown): ICustomError => {
    return HelperFunctions.ReportError({
      message: HelperFunctions.GetErrorMessage(error),
    });
  };
  public static GetErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;

    return String(error);
  };
  public static ReportError = ({ message }: { message: string }): ICustomError => {
    // send the error to our logging service...
    const apiError: ICustomError = {
      message,
      severity: "warning",
    };

    return apiError;
  };


  public static string_IsNullOrEmpty(str: string): boolean {
    if (!str || Object.keys(str.trim()).length === 0) {
      return true;
    }
    return false;
  }

  public static roundNumber(number: number, decimals: number): number {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
  }

  /**
 * Try to parse strint number as number
 * @param string_as_number
 * @returns tnumber
 */
  public static parse_Int(string_as_number: string | undefined) {
    if ((string_as_number || "").trim()) {
      return parseInt((string_as_number || "").trim(), 10);
    }
    return undefined;
  }


  /**
   * To format strings similar to String.Format in C#matear cadenas de manera similar a String.Format en C#.
   * @param format  "Hello {0}, {1}?"
   * @param args frase1, frase2, ...
   * @returns Formated string
   */
  public static formatString = (format: string, ...args: any[]): string => {
    return format.replace(/{(\d+)}/g, (match, index) => {
      const arg = args[index];
      return typeof arg !== "undefined" ? arg : match;
    });
  };

  /**
 *  Convert strings as  'true', 'TRUE' , 'false', 'yes','0' and so on to boolean
 * @param stringValue
 * @returns
 */
  public parseBoolean = (stringValue: string): boolean => {
    // const bool_value = value.toLowerCase() == 'true' ? true : false;
    // return bool_value;

    switch (stringValue?.toLowerCase()?.trim()) {
      case "true":
      case "yes":
      case "1":
        return true;

      case "false":
      case "no":
      case "0":
      case null:
      case undefined:
        return false;

      default:
        return JSON.parse(stringValue);
    }
  };
}
