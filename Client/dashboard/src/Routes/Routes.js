import Home from "../Pages/Home";

const protectedRoutes = [
    { path: '/dashboard', component: <Home /> },
    { path: '/settings', component: <Home /> },
  ];


const publicRoutes = [{path:'/',component:<Home/>}]

export {protectedRoutes, publicRoutes}
