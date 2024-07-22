import React from 'react';
import IRoute from './presenter/components/IRoute';
import UserSetting from './presenter/pages/UserSetting';

//const Home = React.lazy(() => import("./Presenter/pages/Home"));

const Login = React.lazy(() => import('./presenter/pages/Login'));

// const InvoicePage = React.lazy(() => import("./Presenter/pages/Profesional/CollectFee/Invoice/InvoicePage"));

const routes: IRoute[] = [
  { path: '/', name: 'Login', component: <Login></Login> },
  { path: '/login', name: 'Login', component: <Login></Login> },
  {
    path: '/userSetting',
    name: 'users',
    component: <UserSetting></UserSetting>,
  },
  { path: '/user', name: 'invoiceview', component: <UserSetting /> },
];

export default routes;
