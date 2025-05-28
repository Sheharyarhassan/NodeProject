import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Admin from "../Pages/Admin/Admin";
import Book from "../Pages/Admin/Book";
import AddBook from "../Pages/Admin/Book/Add";
import Genre from "../Pages/Admin/Genre";
import AddGenre from "../Pages/Admin/Genre/Add";
import Logout from "../Pages/Logout";
import UpdateBook from "../Pages/Admin/Book/Update";

const protectedRoutes = [
  {path: '/dashboard', component: <Home/>},
  {path: '/settings', component: <Home/>},
  {path: '/Admin', component: <Admin/>},
  {path: '/book', component: <Book/>},
  {path: '/book/add', component: <AddBook/>},
  {path: '/book/update/:id', component: <UpdateBook/>},
  {path: '/genre', component: <Genre/>},
  {path: '/genre/add', component: <AddGenre/>},
  {path: '/logout', component: <Logout/>},
];
const publicRoutes = [
  {path: '/', component: <Home/>},
  {path: '/login', component: <Login/>}]
export {protectedRoutes, publicRoutes}
