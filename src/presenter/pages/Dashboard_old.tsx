import HelperFunctions from '@/Common/helpers/HelperFunctions';
import { CustomError } from '@/Domain/base/IMessage';
import { IUserSession } from '@/Domain/dto/AuthenticateISVC';
import { SecurityService } from '@/infra/services/security.service';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../controls/Alert';

const Dashboard_old = () => {
  const [twoFAEnable, setTwoFAEnable] = useState<boolean>(undefined);
  const [showDisableFA, setShowDisableFA] = useState<boolean>(false);
  const [userSession, setuserSession] = useState<IUserSession>(undefined);
  const [error, setError] = useState<CustomError | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const session = HelperFunctions.getCurrenLoging();
    if (!session) navigate(`/login`);
    setuserSession({ ...session });
    return () => {};
  }, []);

  useEffect(() => {
    if (userSession) {
      getUser(userSession.UserName);
    }
  }, [userSession]);
  const getUser = (userName: string) => {
    const secService: SecurityService = new SecurityService();
    secService
      .GetUser(userName)
      .then((res) => {
        setTwoFAEnable(res.User.twoFAenabled);
      })
      .catch((err) => {
        setError(err);
        secService.Logout();
      });
  };

  const onLogOutHandler = () => {
    const secService: SecurityService = new SecurityService();
    secService.Logout();
    navigate(`/login`);
  };
  const onDisable2FAHandle = () => {
    const secService: SecurityService = new SecurityService();
    secService
      .Disable2FA(userSession.UserName)
      .then((res) => {
        alert('El usuario ya tiene 2FA desactivado');
        setShowDisableFA(false);
      })
      .catch((err) => {
        setError(err);
        secService.Logout();
      });
  };
  return (
    <div className='min-h-full'>
      <nav className='bg-gray-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <img
                  className='h-8 w-8'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                  alt='Your Company'
                ></img>
              </div>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <a
                    href='#'
                    className='rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                    aria-current='page'
                  >
                    Dashboard
                  </a>
                  <a
                    href='#'
                    className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                  >
                    Team
                  </a>
                  <a
                    href='#'
                    className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                  >
                    Projects
                  </a>
                  {twoFAEnable && (
                    <a
                      href='#'
                      className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                    >
                      Quitar 2FA
                    </a>
                  )}
                  {!twoFAEnable && (
                    <a
                      href='/userSettings'
                      className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                    >
                      Agregar 2FA
                    </a>
                  )}
                  {userSession && (
                    <a
                      onClick={onLogOutHandler}
                      href='#'
                      className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                    >
                      Log out
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className='bg-white shadow'>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
          {/*  content */}
          {showDisableFA && (
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
          {error && <Alert preText='' text={error.message}></Alert>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard_old;
