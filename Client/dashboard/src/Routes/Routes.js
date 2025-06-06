import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Admin from "../Pages/Admin/Admin";
import Book from "../Pages/Admin/Book";
import AddBook from "../Pages/Admin/Book/Add";
import Genre from "../Pages/Admin/Genre";
import AddGenre from "../Pages/Admin/Genre/Add";
import UpdateBook from "../Pages/Admin/Book/Update";
import User from "../Pages/Admin/User";
import UpdateUser from "../Pages/Admin/User/Update";
import AddAdmin from "../Pages/Admin/AdminUsers/Add";
import Logout from "../Pages/Logout";
import AdminUsers from "../Pages/Admin/AdminUsers";
import Register from "../Pages/Register";

const protectedRoutes = [
  {path: '/dashboard', component: <Home/>},
  {path: '/settings', component: <Home/>},
  {path: '/Admin', component: <Admin/>},
  {path: '/book', component: <Book/>},
  {path: '/book/add', component: <AddBook/>},
  {path: '/book/update/:id', component: <UpdateBook/>},
  {path: '/genre', component: <Genre/>},
  {path: '/genre/add', component: <AddGenre/>},
  {path: '/user', component: <User/>},
  {path: '/user/update/:id', component: <UpdateUser/>},
  {path: '/admin/view', component: <AdminUsers/>},
  {path: '/admin/add', component: <AddAdmin/>},
  {path: '/admin/update/:id', component: <UpdateUser/>},
  {path: '/logout', component: <Logout/>},
];
const publicRoutes = [
  {path: '/', component: <Home/>},
  {path: '/login', component: <Login/>},
  {path: '/register', component: <Register/>},
]
export {protectedRoutes, publicRoutes}
