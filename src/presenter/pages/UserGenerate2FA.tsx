import React, { useEffect, useState } from 'react';
import TextBox from '../controls/TextBox';
import Button from '../controls/Button';
import { SecurityService } from '@/infra/services/security.service';
import { CustomError } from '@/Domain/base/IMessage';
import Alert from '../controls/Alert';
import { useNavigate, useParams } from 'react-router-dom';

const UserGenerate2FA = () => {
  const [hideQR, sethideQR] = useState<boolean>(true);
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<CustomError | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [enableLogin, setEnableLogin] = useState<boolean>(false);
  const [qr, setQR] = useState<string>(undefined);
  const navigate = useNavigate();

  const onChangeHandle = (value: string) => {
    setCode(value);
  };

  const onChangeUserNameHandle = (value: string) => {
    setUserName(value);
  };

  const onEnable2FAHandle = async () => {
    const secService: SecurityService = new SecurityService();
    setError(undefined);
    /** Only for user existe verification */
    if (userName) {
      try {
        await secService.GetUser(userName);
      } catch (e) {
        setError(e);
        return;
      }
    } else {
      alert('Ingrese nombre de usuario');
      return;
    }

    secService
      .GetQrImage(userName)
      .then((res) => {
        setQR(res.image);
      })
      .catch((err) => {
        setError(err);
        secService.Logout();
      });
  };
  const onGoToLoginHandle = () => {
    navigate(`/login`);
  };

  const onSendCodeHandle = () => {
    setError(undefined);
    const secService: SecurityService = new SecurityService();
    secService
      .Set2FA(userName, code)
      .then((res) => {
        if (res) {
          alert('2FA activado');
          sethideQR(true);
          setEnableLogin(true);
        } else alert('El codigo ingresado es incorrecto');
      })
      .catch((err) => {
        setError(err);
        secService.Logout();
      });
  };
  return (
    <div className='md:mx-6 md:p-10'>
      {!enableLogin && (
        <form className='max-w-sm mx-auto'>
          {(qr || hideQR === false) && (
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
      )}
      {!enableLogin && (
        <form>
          {qr === undefined && (
            <>
              <div className='mb-2 p-2'>
                <TextBox
                  type='text'
                  id='inputUserName'
                  text={userName}
                  label={'usuario'}
                  onChange={onChangeUserNameHandle}
                  placeholder={''}
                ></TextBox>
              </div>
              <div className='mb-2 p-2'>
                <Button disable={false} onClick={onEnable2FAHandle}>
                  Habilitar 2FA
                </Button>
              </div>
            </>
          )}
          {error && <Alert preText='' text={error.message}></Alert>}
        </form>
      )}
      {enableLogin && (
        <form>
          <div className='mb-2 p-2'>
            <Button disable={false} onClick={onGoToLoginHandle}>
              Ir a inicio de sesion
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserGenerate2FA;
