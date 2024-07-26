import HelperFunctions from '@/Common/helpers/HelperFunctions';
import { CustomError } from '@/Domain/base/IMessage';
import { IUserSession } from '@/Domain/dto/AuthenticateISVC';
import { SecurityService } from '@/infra/services/security.service';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../controls/Alert';
import UserSetting from './UserSetting';

const Dashboard = () => {
  const [twoFAEnable, setTwoFAEnable] = useState<boolean>(undefined);

  const [showAdd2FA, setShowAddFA] = useState<boolean>(false);
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
    setError(undefined);
    const secService: SecurityService = new SecurityService();
    secService
      .Disable2FA(userSession.UserName)
      .then((res) => {
        alert('Se desactivo 2FA al usuario');
        setShowDisableFA(false);
      })
      .catch((err) => {
        setError(err);
        secService.Logout();
      });
  };
  const onRemove2FAHandler = () => {
    setShowDisableFA(true);
  };
  const onAdd2FAHandler = () => {
    setShowAddFA(true);
  };
  return (
    <>
      <nav className='bg-gray-800'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              {/*  Mobile menu button*/}
              <button
                type='button'
                className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='absolute -inset-0.5'></span>
                <span className='sr-only'>Open main menu</span>
                {/* 
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          */}
                <svg
                  className='block h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
                {/* 
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          */}
                <svg
                  className='hidden h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex flex-shrink-0 items-center'>
                <img
                  className='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                  alt='Your Company'
                ></img>
              </div>
              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                  {/*  Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
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
                      onClick={onRemove2FAHandler}
                      href='#'
                      className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                    >
                      Quitar 2FA
                    </a>
                  )}
                  {!twoFAEnable && (
                    <a
                      onClick={onAdd2FAHandler}
                      // href='/userSettings'
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
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <button
                type='button'
                className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
              >
                <span className='absolute -inset-1.5'></span>
                <span className='sr-only'>View notifications</span>
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                  />
                </svg>
              </button>

              {/*  Profile dropdown */}
              <div className='relative ml-3'>
                <div>
                  <button
                    type='button'
                    className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                  >
                    <span className='absolute -inset-1.5'></span>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    ></img>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
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

          {showAdd2FA && (
            <>
              <UserSetting></UserSetting>
            </>
          )}
          {error && <Alert preText='' text={error.message}></Alert>}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
