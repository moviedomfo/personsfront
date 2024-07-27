import { UserSimpleViewDTO } from "@/Domain/dto/GetUserISVC";
import { createContext } from "react";


export interface ITwoFAContext {
    user: UserSimpleViewDTO;

    twoFAEnable: boolean;
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}



export const TwoFAContext = createContext<ITwoFAContext>({} as ITwoFAContext);


