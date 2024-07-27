import HelperFunctions from '@/Common/helpers/HelperFunctions';
import { CustomError } from '@/Domain/base/IMessage';
import { IUserSession } from '@/Domain/dto/AuthenticateISVC';
import { SecurityService } from '@/infra/services/security.service';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../controls/Alert';
// import UserSetting from './UserSetting';
import { TwoFAContext } from './context/2FAContextContext';

const Remove2FA = () => {
  // const [showAdd2FA, setShowAddFA] = useState<boolean>(false);
  const [showDisable2FA, setShowDisable2FA] = useState<boolean>(true);
  const [error, setError] = useState<CustomError | null>(null);
  const { user } = useContext(TwoFAContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.twoFAenabled === false) {
      setShowDisable2FA(false);
    } else {
      setShowDisable2FA(true);
    }
  }, []);

  const onDisable2FAHandle = () => {
    setError(undefined);
    const secService: SecurityService = new SecurityService();
    secService
      .Disable2FA(user.userName)
      .then((res) => {
        alert('Se desactivo 2FA al usuario');
        setShowDisable2FA(false);
      })
      .catch((err) => {
        setError(err);
        secService.Logout();
      });
  };

  // const onAdd2FAHandler = () => {
  //   setShowAddFA(true);
  // };
  return (
    <main>
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        {/*  content */}
        {showDisable2FA && (
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
        {!showDisable2FA && (
          <>
            <Alert
              id='alert'
              text='No hay 2FA habilitado para este usuario'
              preText=''
            ></Alert>
          </>
        )}
        {/* 
          {showAdd2FA && (
            <>
              <UserSetting></UserSetting>
            </>
          )} */}
        {error && <Alert preText='' text={error.message}></Alert>}
      </div>
    </main>
  );
};

export default Remove2FA;
