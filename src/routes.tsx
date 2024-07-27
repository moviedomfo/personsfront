import React from 'react';
import IRoute from './presenter/components/IRoute';
import UserSetting from './presenter/pages/UserSetting';
import UserGenerate2FA from './presenter/pages/UserGenerate2FA';
import Remove2FA from './presenter/pages/Remove2FA';
import Home from './presenter/pages/Home';

//const Home = React.lazy(() => import("./Presenter/pages/Home"));

const Login = React.lazy(() => import('./presenter/pages/Login'));

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
  { path: '/home', name: 'home', component: <Home /> },
  { path: '/remove2FA', name: 'remove2FA', component: <Remove2FA /> },
  
];

export default routes;
