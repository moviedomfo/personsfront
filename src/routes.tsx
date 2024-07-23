import React from 'react';
import IRoute from './presenter/components/IRoute';
import UserSetting from './presenter/pages/UserSetting';

//const Home = React.lazy(() => import("./Presenter/pages/Home"));

const Login = React.lazy(() => import('./presenter/pages/Login'));
const Dashboard = React.lazy(() => import('./presenter/pages/Dashboard'));

const routes: IRoute[] = [
  { path: '/', name: 'Login', component: <Login></Login> },
  { path: '/login', name: 'Login', component: <Login></Login> },
  {
    path: '/userSetting',
    name: 'userSetting',
    component: <UserSetting></UserSetting>,
  },
  { path: '/dashboard', name: 'dashboard', component: <Dashboard /> },
];

export default routes;
