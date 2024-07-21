import React, { useEffect, useState } from 'react';
import TextBox from '../controls/TextBox';
import HelperFunctions from '@/Common/helpers/HelperFunctions';
import { IUserSession } from '@/Domain/dto/AuthenticateISVC';

const UserSetting = () => {
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userSession, setuserSession] = useState<IUserSession>(undefined);
  const getCurrenLoging = React.useCallback(async () => {
    const userSession = HelperFunctions.getCurrenLoging();
    setuserSession(userSession);
  }, []);

  useEffect(() => {
    return () => {};
  }, []);
  const onChangeHandle = (value: string) => {
    // setText(event.target.value);
  };
  return (
    <div className='md:mx-6 md:p-12'>
      {/*Logo */}
      <div className='text-center'>
        <img
          className='mx-auto w-48'
          src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
          alt='logo'
        />
        <h4 className='mb-12 mt-1 pb-1 text-xl font-semibold'>Olecram dev</h4>
      </div>

      <form>
        <p className='mb-4'>Please login to your account</p>
        {/*code input */}
        <TextBox
          type='text'
          id='inputCode'
          text={code}
          label={'Codigo'}
          onChange={onChangeHandle}
          placeholder={''}
        ></TextBox>
        {/*Password input */}

        {/*Submit button */}
        <div className='mb-12 pb-1 pt-1 text-center'></div>

        {/*Register button */}
        <div className='flex items-center justify-between pb-6'>
          <p className='mb-0 me-2'>Don't have an account?</p>
          <button
            type='button'
            className='inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950'
            data-twe-ripple-init
            data-twe-ripple-color='light'
          >
            Set 2FA
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSetting;
