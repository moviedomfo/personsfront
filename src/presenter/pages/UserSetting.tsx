import React, { useEffect, useState } from 'react';
import TextBox from '../controls/TextBox';
import HelperFunctions from '@/Common/helpers/HelperFunctions';
import { IUserSession } from '@/Domain/dto/AuthenticateISVC';
import Button from '../controls/Button';
import { SecurityService } from '@/infra/services/security.service';
import { CustomError } from '@/Domain/base/IMessage';
import Alert from '../controls/Alert';
import { Label } from '@headlessui/react';

const UserSetting = () => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<CustomError | null>(null);
  const [userSession, setuserSession] = useState<IUserSession>(undefined);
  const [twoFAEnable, setTwoFAEnable] = useState<boolean>(undefined);
  const [qr, setQR] = useState<string>(undefined);
  const getCurrenLoging = React.useCallback(async () => {
    const userSession = HelperFunctions.getCurrenLoging();

    setuserSession(userSession);
    getUser(userSession.UserName);
  }, []);

  useEffect(() => {
    getCurrenLoging();
    return () => {};
  }, []);
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

  return (
    <div className='md:mx-6 md:p-12'>
      <form>
        {/*Password input */}
        {/* <img
              src='data:image/png;base64,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'
              alt='qr'
              className='w-1/2'
            /> */}
        {/*Submit button */}
        <div className='mb-12 pb-1 pt-1 text-center'></div>
        {qr && (
          <div className='flex items-center justify-center pb-6'>
            <img src={qr} alt='qr' className='w-1/2' />

            {/*code input */}
            <h4>Ingrese el codigo que obtuvo desde el autenticador</h4>
            <TextBox
              type='text'
              id='inputCode'
              text={code}
              label={'Codigo'}
              onChange={onChangeHandle}
              placeholder={''}
            ></TextBox>
          </div>
        )}

        {twoFAEnable === false &&
          (qr === undefined && (
            <div className='flex items-center justify-between pb-6'>
              <h1 className='justify-center bg-blend-color-dodge'>
                Enable 2FA
              </h1>
              <Button text='Habilitar 2FA' onClick={onEnable2FAHandle}></Button>
            </div>
          ))}
        {error && <Alert preText='' text={error.message}></Alert>}
        {/* <p className='mb-0 me-2'>Don't have an account?</p> */}
      </form>
    </div>
  );
};

export default UserSetting;
