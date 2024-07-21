import React from "react";
import IRoute from "./presenter/components/IRoute";



//const Home = React.lazy(() => import("./Presenter/pages/Home"));

const Login = React.lazy(() => import("./presenter/pages/Login"));


// const InvoicePage = React.lazy(() => import("./Presenter/pages/Profesional/CollectFee/Invoice/InvoicePage"));

const routes: IRoute[] = [
  {path: "/", name: "Login", component: <Login></Login>},
  // {path: "/userSetting", name: "members", component: <FindMemberPage></FindMemberPage>},
  
];

export default routes;
