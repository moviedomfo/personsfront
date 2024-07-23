import React, { useState } from 'react';
import TextBox from '../controls/TextBox';
import Button from '../controls/Button';
import { CustomError } from '@/Domain/base/IMessage';
import { SecurityService } from '@/infra/services/security.service';
import { useNavigate } from 'react-router-dom';
import { IUserSession } from '@/Domain/dto/AuthenticateISVC';
import HelperFunctions from '@/Common/helpers/HelperFunctions';
import Alert from '../controls/Alert';
import { ErrorCodeEnum } from '@/Common/ErrorEnums';

const Loging = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<CustomError | null>(null);
  const [twoFAEnable, setTwoFAEnable] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const navigate = useNavigate();
  const onLogingHandle = () => {
    const secService: SecurityService = new SecurityService();

    secService
      .Auth(userName, password)
      .then((res) => {
        const userSession: IUserSession = res;

        HelperFunctions.setCurrenLoging(userSession);
        navigate(`/dashboard`);
        //navigate(`/userSetting`);
      })
      .catch((e) => {
        const err: CustomError = e as CustomError;
        //Login ok pero requiere 2FA
        if (err.code === ErrorCodeEnum.LOGIN_USER_2FA_CodeRequested) {
          alert('Se requiere codigo de verificacion doble factor');
          setTwoFAEnable(true);
          /**habilitar textbox qr y boton de enviar */
        } else {
          setError(err);
          secService.Logout();
        }
      });
  };
  const onChangeUserNameHandle = (value: string) => {
    setUserName(value);
  };
  const onChangePasswordHandle = (value: string) => {
    setPassword(value);
  };
  const onSendCodeHandle = () => {
    const secService: SecurityService = new SecurityService();
    secService
      .Set2FA(userName, code)
      .then((res) => {
        if (res) {
          navigate(`/dashboard`);
        } else alert('El codigo ingresado es incorrecto');
      })
      .catch((err) => {
        setError(err);
      });
  };
  const onChangeCodeHandle = (value: string) => {
    setCode(value);
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
          <Button onClick={onLogingHandle}>Log in</Button>

          {error && <Alert preText='' text={error.message}></Alert>}
        </div>
      </form>
      <form>
        {twoFAEnable === true && (
          <form className='max-w-sm mx-auto'>
            <div className='mb-5'>
              <label
                htmlFor='inputCode'
                className='block mb-2 text-sm font-medium text-blue-00 dark:text-white'
              >
                Ingrese el codigo que obtuvo desde el autenticador
              </label>

              <div className='flex flex-col items-start  mb-5'>
                <TextBox
                  type='text'
                  id='inputCode'
                  text={code}
                  label={'Codigo'}
                  onChange={onChangeCodeHandle}
                  placeholder={''}
                ></TextBox>

                <button
                  type='button'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={onSendCodeHandle}
                >
                  Enviar codigo
                </button>
              </div>
            </div>
          </form>
        )}
        {error && <Alert preText='' text={error.message}></Alert>}
        {/* <p className='mb-0 me-2'>Don't have an account?</p> */}
      </form>
    </div>
  );
};

export default Loging;
