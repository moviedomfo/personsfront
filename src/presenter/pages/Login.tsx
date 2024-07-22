import React, { useState } from 'react';
import TextBox from '../controls/TextBox';
import Button from '../controls/Button';
import { CustomError } from '@/Domain/base/IMessage';
import { SecurityService } from '@/infra/services/security.service';
import { useNavigate } from 'react-router-dom';
import { IUserSession } from '@/Domain/dto/AuthenticateISVC';
import HelperFunctions from '@/Common/helpers/HelperFunctions';
import Alert from '../controls/Alert';

const Loging = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<CustomError | null>(null);

  const navigate = useNavigate();
  const onLogingHandle = () => {
    const secService: SecurityService = new SecurityService();
    secService
      .Auth(userName, password)
      .then((res) => {
        const userSession: IUserSession = res;

        HelperFunctions.setCurrenLoging(userSession);

        navigate(`/userSetting`);
        //navigate(`/collectfee/invoiceview/${res.userId}`);
      })
      .catch((err) => {
        setError(err);
        secService.Logout();
      });
  };
  const onChangeUserNameHandle = (value: string) => {
    setUserName(value);
  };
  const onChangePasswordHandle = (value: string) => {
    setPassword(value);
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
        {/*Username input */}
        <TextBox
          type='text'
          id='inputUserName'
          text={userName}
          label={'Nombre usuario'}
          onChange={onChangeUserNameHandle}
          placeholder={'username'}
        ></TextBox>
        {/*Password input */}
        <TextBox
          type='password'
          id='inputPassword'
          text={password}
          label={'Passwpord'}
          onChange={onChangePasswordHandle}
          placeholder={'******'}
        ></TextBox>

        {/*Submit button */}
        <div className='mb-12 pb-1 pt-1 text-center'>
          <Button text='Log in' onClick={onLogingHandle}></Button>

          {error && <Alert preText='' text={error.message}></Alert>}
        </div>
        {/*Register button */}
        {/* <div className='flex items-center justify-between pb-6'>
          <p className='mb-0 me-2'>Don't have an account?</p>
          <button
            type='button'
            className='inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950'
            data-twe-ripple-init
            data-twe-ripple-color='light'
          >
            Register
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default Loging;
