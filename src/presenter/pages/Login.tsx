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
  const [twoFAVisible, setTwoFAVisible] = useState<boolean>(false);
  const [genQRVisible, setGenQRVisible] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const navigate = useNavigate();
  const onLogingHandle = () => {
    const secService: SecurityService = new SecurityService();

    secService
      .Auth(userName, password)
      .then((res) => {
        const userSession: IUserSession = res;

        HelperFunctions.setCurrenLoging(userSession);
        navigate(`/home`);
      })
      .catch((e) => {
        const err: CustomError = e as CustomError;
        const session = secService.GetCurrenLoging();

        switch (err.code) {
          case ErrorCodeEnum.LOGIN_USER_2FA_CodeRequested:
            alert('Se requiere codigo de verificacion doble factor');
            setTwoFAVisible(true);
            if (session) {
              navigate(`/userGenerate2FA`);
            } else {
              setGenQRVisible(true);
            }
            break;
          case ErrorCodeEnum.LOGIN_USER_2FA_FAIL:
            alert('Se requiere codigo de renovar doble factor');
            setTwoFAVisible(true);
            setError(undefined);
            break;
          default:
            setError(err);
            secService.Logout();
            break;
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
          //navigate(`/dashboard`);
          alert('Codigo enviado correctamente');
          setTwoFAVisible(false);
          setError(undefined);
        } else alert('El codigo ingresado es incorrecto');
      })
      .catch((err) => {
        setError(err);
      });
  };
  const onChangeCodeHandle = (value: string) => {
    setCode(value);
  };
  const onGenQrHandle = () => {
    navigate(`/userGenerate2FA`);
  };

  return (
    <div className='flex items-center justify-center bg-gray-100'>
      <div className='p-3 w-full max-w-sm bg-white rounded-lg shadow-md'>
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
          {/*Username input */}
          <TextBox
            type='text'
            disable={twoFAVisible}
            id='inputUserName'
            text={userName}
            label={'Nombre usuario'}
            onChange={onChangeUserNameHandle}
            placeholder={'username'}
          ></TextBox>
          {/*Password input */}
          <TextBox
            disable={twoFAVisible}
            type='password'
            id='inputPassword'
            text={password}
            label={'Passwpord'}
            onChange={onChangePasswordHandle}
            placeholder={'******'}
          ></TextBox>

          <div className='mt-3  text-center'>
            <Button disable={twoFAVisible} onClick={onLogingHandle}>
              Log in
            </Button>
          </div>
          {twoFAVisible === true && (
            <div className='flex flex-col items-start  mb-1'>
              <TextBox
                type='text'
                id='inputCode'
                text={code}
                label={'Codigo'}
                onChange={onChangeCodeHandle}
                placeholder={''}
              ></TextBox>
              <p className='mb-2 font-mono text-center text-gray-500 '>
                Ingrese el codigo 2FA
              </p>
              <div className='flex flex-row space-x-4'>
                <button
                  type='button'
                  className='
                  px-5 py-2.5 
                  text-white
                  bg-blue-700
                  hover:bg-blue-800 
                  focus:ring-4 
                  focus:outline-none
                  focus:ring-blue-300 
                  font-medium rounded-lg 
                  text-sm w-full sm:w-auto 
                  text-center
                   dark:bg-blue-600
                   dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={onSendCodeHandle}
                >
                  Enviar codigo
                </button>
                <Button disable={!genQRVisible} onClick={onGenQrHandle}>
                  Generar QR
                </Button>
              </div>
            </div>
          )}
          <div className='mb-1 mt-1 p-1 text-center'>
            {error && <Alert preText='' text={error.message}></Alert>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loging;
