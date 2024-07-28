import {  ReactNode, useContext, useEffect, useState } from 'react';
import { ICustomError } from '@/Domain/base/IMessage';
import { SecurityService } from '@/infra/services/security.service';
import { UserSimpleViewDTO } from '@/Domain/dto/GetUserISVC';
import { TwoFAContext } from './2FAContextContext';
import HelperFunctions from '@/Common/helpers/HelperFunctions';

interface Props {
  children: ReactNode;
}

const TwoFAContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<ICustomError>();
  const [user, setUser] = useState<UserSimpleViewDTO>(undefined);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const [twoFAEnable, setTwoFAEnable] = useState<boolean>(false);

  useEffect(() => {
    const session = HelperFunctions.getCurrenLoging();
    if (session) getUser(session.UserName);
  }, []);

  const getUser = async (userName: string) => {
    setIsLoading(true);
    const secService: SecurityService = new SecurityService();

    try {
      const res = await secService.GetUser(userName);
      setUser(res.User);
      setTwoFAEnable(res.User.twoFAenabled);

    } catch (e) {
      setIsLoading(false);
      setApiError(e as ICustomError);
    }
  };

  return (
    <TwoFAContext.Provider value={{ user, twoFAEnable,isAuth, setIsAuth }}>
      {children}
    </TwoFAContext.Provider>
  );


};

  // Custom hook para usar el contexto
  const useTwoFAContext = () => useContext(TwoFAContext);
  export { TwoFAContextProvider, useTwoFAContext };
