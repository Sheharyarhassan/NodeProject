import Home from "../Pages/Home";
import Login from "../Pages/Login";
import AdminLogin from "../Pages/Admin/Login";
import Admin from "../Pages/Admin/Admin";
import Book from "../Pages/Admin/Book";
import AddBook from "../Pages/Admin/Book/Add";
import Genre from "../Pages/Admin/Genre";
import AddGenre from "../Pages/Admin/Genre/Add";
import Logout from "../Pages/Logout";

const protectedRoutes = [
   { path: '/dashboard', component: <Home /> },
   { path: '/settings', component: <Home /> },
   { path: '/Admin', component: <Admin /> },
   { path: '/book', component: <Book /> },
   { path: '/book/add', component: <AddBook /> },
   { path: '/genre', component: <Genre /> },
   { path: '/genre/add', component: <AddGenre /> },
   { path: '/logout', component: <Logout /> },
  ];


const publicRoutes = [
   {path:'/',component:<Home/>},
   {path: '/login', component: <Login /> },
   {path: '/adminLogin', component: <AdminLogin /> },]

export {protectedRoutes, publicRoutes}
