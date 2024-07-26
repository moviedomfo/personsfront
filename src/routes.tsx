import React from 'react';
import IRoute from './presenter/components/IRoute';
import UserSetting from './presenter/pages/UserSetting';
import UserGenerate2FA from './presenter/pages/UserGenerate2FA';

//const Home = React.lazy(() => import("./Presenter/pages/Home"));

const Login = React.lazy(() => import('./presenter/pages/Login'));
const Dashboard = React.lazy(() => import('./presenter/pages/Dashboard'));

const routes: IRoute[] = [
  { path: '/', name: 'Login', component: <Login></Login> },
  { path: '/login', name: 'Login', component: <Login></Login> },
  {
    path: '/userSettings',
    name: 'userSettings',
    component: <UserSetting></UserSetting>,
  },
  {
    path: '/userGenerate2FA',
    name: 'userGenerate2FA',
    component: <UserGenerate2FA></UserGenerate2FA>,
  },
  { path: '/dashboard', name: 'dashboard', component: <Dashboard /> },
];

export default routes;
