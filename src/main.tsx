import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import AxiosInterseptor from './infra/services/AxiosInterseptor.ts';
import { TwoFAContextProvider } from './presenter/pages/context/2FAContextProvider.tsx';

AxiosInterseptor();
const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={loading}>

          <App />

      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
