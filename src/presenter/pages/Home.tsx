import HelperFunctions from '@/Common/helpers/HelperFunctions';
import { CustomError } from '@/Domain/base/IMessage';
import { IUserSession } from '@/Domain/dto/AuthenticateISVC';
import { SecurityService } from '@/infra/services/security.service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../controls/Alert';
import UserSetting from './UserSetting';

const Home = () => {
  const [twoFAEnable, setTwoFAEnable] = useState<boolean>(undefined);

  const [showAdd2FA, setShowAddFA] = useState<boolean>(false);
  const [showDisable2FA, setShowDisable2FA] = useState<boolean>(false);
  const [userSession, setuserSession] = useState<IUserSession>(undefined);
  const [error, setError] = useState<CustomError | null>(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const session = HelperFunctions.getCurrenLoging();
  //   if (!session) navigate(`/login`);
  //   setuserSession({ ...session });
  //   return () => {};
  // }, []);

  // const onDisable2FAHandle = () => {
  //   setError(undefined);
  //   const secService: SecurityService = new SecurityService();
  //   secService
  //     .Disable2FA(userSession.UserName)
  //     .then((res) => {
  //       alert('Se desactivo 2FA al usuario');
  //       setShowDisable2FA(false);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       secService.Logout();
  //     });
  // };

  return (
    <>
      <h1>Home Page</h1>
      {/*  content */}
      {/* {showDisable2FA && (
        <>
          <button
            type='button'
            className='mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
                 dark:bg-blue-600
                 dark:hover:bg-blue-700
                 dark:focus:ring-blue-800'
            onClick={onDisable2FAHandle}
          >
            Deshabilitar 2FA
          </button>
        </>
      )}

      {showAdd2FA && (
        <>
          <UserSetting></UserSetting>
        </>
      )}
      {error && <Alert preText='' text={error.message}></Alert>} */}
    </>
  );
};

export default Home;
