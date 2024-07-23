import React, { useEffect, useState } from 'react';
import TextBox from '../controls/TextBox';
import HelperFunctions from '@/Common/helpers/HelperFunctions';
import { IUserSession } from '@/Domain/dto/AuthenticateISVC';
import Button from '../controls/Button';
import { SecurityService } from '@/infra/services/security.service';
import { CustomError } from '@/Domain/base/IMessage';
import Alert from '../controls/Alert';
import { Label } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

const UserSetting = () => {
  const [hideQR, sethideQR] = useState<boolean>(true);
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<CustomError | null>(null);
  const [userSession, setuserSession] = useState<IUserSession>(undefined);
  const [twoFAEnable, setTwoFAEnable] = useState<boolean>(undefined);
  const [qr, setQR] = useState<string>(undefined);
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
  const onChangeHandle = (value: string) => {
    setCode(value);
  };
  const onEnable2FAHandle = () => {
    const secService: SecurityService = new SecurityService();
    secService
      .GetQrImage(userSession.UserName)
      .then((res) => {
        setQR(res.image);
      })
      .catch((err) => {
        setError(err);
        secService.Logout();
      });
  };

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
  const onSendCodeHandle = () => {
    const secService: SecurityService = new SecurityService();
    secService
      .Set2FA(userSession.UserName, code)
      .then((res) => {
        if (res) {
          alert('El usuario ya tiene 2FA activado');
          sethideQR(true);
        } else alert('El codigo ingresado es incorrecto');
      })
      .catch((err) => {
        setError(err);
        secService.Logout();
      });
  };
  return (
    <div className='md:mx-6 md:p-10'>
      <form className='max-w-sm mx-auto'>
        {(qr || !hideQR) && (
          <div className='mb-5'>
            <img src={qr} alt='qr' className='w-1/2' />

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
                onChange={onChangeHandle}
                placeholder={''}
              ></TextBox>
              {/* <Button onClick={onSendCodeHandle}>Enviar codigo</Button> */}

              <button
                type='button'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={onSendCodeHandle}
              >
                Enviar codigo
              </button>
            </div>
          </div>
        )}
      </form>
      <form>
        {twoFAEnable === false && qr === undefined && (
          <div className='mb-5 p-5'>
            <Button disable={false} onClick={onEnable2FAHandle}>
              Habilitar 2FA
            </Button>
          </div>
        )}
        {error && <Alert preText='' text={error.message}></Alert>}
        {/* <p className='mb-0 me-2'>Don't have an account?</p> */}
      </form>
    </div>
  );
};

export default UserSetting;
