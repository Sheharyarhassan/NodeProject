import React, {useEffect, useState} from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import api from "../ApiHandle/api";
import Cookies from "js-cookie";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({});
  const [cart, setCart] = useState(null);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [guestId, setGuestId] = useState(null);

  useEffect(() => {
    const id = Cookies.get('guestId');
    setGuestId(id);
  }, []);
  const loadAuthData = () => {
    const storedToken = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");
    const storedUser = localStorage.getItem("userDetails");

    setToken(storedToken ? JSON.parse(storedToken) : null);
    setUserType(storedUserType ? JSON.parse(storedUserType) : null);
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser ? parsedUser.name : null);
    setUserDetails(parsedUser);
  };

  useEffect(() => {
    loadAuthData();
    const onStorageChange = () => loadAuthData();
    window.addEventListener("authChange", onStorageChange);
    return () => {
      window.removeEventListener("authChange", onStorageChange);
    };
  }, []);

  useEffect(() => {
    if (userDetails?.id) {
      api.get(`${process.env.BASE_URL}getCart/${userDetails.id}`).then((res) => {
        setCart(res.data);
      });
    } else if (guestId && guestId) {
      api.get(`${process.env.BASE_URL}getCart/${guestId}`).then((res) => {
        setCart(res.data);
      });
    }
  }, [userDetails]);

  const handleMenuOpen = (menuName, event) => {
    setMenuAnchor((prev) => ({...prev, [menuName]: event.currentTarget}));
  };

  const handleMenuClose = (menuName) => {
    setMenuAnchor((prev) => ({...prev, [menuName]: null}));
  };

  return (
    <AppBar position="static" color="default" sx={{px: {lg: 4}}}>
      <Toolbar sx={{justifyContent: 'space-between', alignItems: 'center'}}>
        <Box sx={{display: {xs: "none", md: "flex"}, gap: 2}}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{display: {md: "none"}, mr: 2}}
          >
            <MenuIcon/>
          </IconButton>

          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{mb: 0.5, alignSelf: 'center', marginRight: '1rem', textDecoration: "none", color: "inherit"}}
          >
            Books
          </Typography>
          {token && userType?.toLowerCase() === "admin" && (
            <>
              {/* Book Dropdown */}
              <Box>
                <Button onClick={(e) => handleMenuOpen("book", e)} endIcon={<span>&#x25BE;</span>}>
                  Book
                </Button>
                <Menu
                  anchorEl={menuAnchor.book}
                  open={Boolean(menuAnchor.book)}
                  onClose={() => handleMenuClose("book")}
                >
                  <MenuItem onClick={() => handleMenuClose("book")} component="a" href="/book">
                    View All
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClose("book")} component="a" href="/book/add">
                    Add Book
                  </MenuItem>
                </Menu>
              </Box>

              {/* Genre Dropdown */}
              <Box>
                <Button onClick={(e) => handleMenuOpen("genre", e)} endIcon={<span>&#x25BE;</span>}>
                  Genre
                </Button>
                <Menu
                  anchorEl={menuAnchor.genre}
                  open={Boolean(menuAnchor.genre)}
                  onClose={() => handleMenuClose("genre")}
                >
                  <MenuItem component="a" href="/genre">
                    View All
                  </MenuItem>
                  <MenuItem component="a" href="/genre/add">
                    Add Genre
                  </MenuItem>
                </Menu>
              </Box>

              <Button href="/user">Users</Button>

              {/* Admin Dropdown */}
              <Box>
                <Button onClick={(e) => handleMenuOpen("admin", e)} endIcon={<span>&#x25BE;</span>}>
                  Admin
                </Button>
                <Menu
                  anchorEl={menuAnchor.admin}
                  open={Boolean(menuAnchor.admin)}
                  onClose={() => handleMenuClose("admin")}
                >
                  <MenuItem component="a" href="/admin/view">
                    View All
                  </MenuItem>
                  <MenuItem component="a" href="/admin/add">
                    Add Admin
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
          <Button href="/genres">Categories</Button>
        </Box>

        <Box sx={{display: "flex", justifyContent: 'end', alignItems: "center", gap: 2}}>
          {token ? (
            <>
              <Box>
                <Button startIcon={<AccountCircle/>} onClick={(e) => handleMenuOpen("profile", e)}>
                  {user}
                </Button>
                <Menu
                  anchorEl={menuAnchor.profile}
                  open={Boolean(menuAnchor.profile)}
                  onClose={() => handleMenuClose("profile")}
                >
                  <MenuItem component="a" href="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem component="a" href="/changepass">
                    Change Password
                  </MenuItem>
                </Menu>
              </Box>

              <IconButton href="/cart">
                <Badge badgeContent={cart?.cart?.item?.length || 0} color="secondary">
                  <ShoppingCartIcon/>
                </Badge>
              </IconButton>
              <Button href="/logout">Logout</Button>
            </>
          ) : (
            <>
              <IconButton href="/cart">
                <ShoppingCartIcon/>
              </IconButton>
              <Button href="/login">Login</Button>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{width: 250}} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            <ListItem button component="a" href="/">
              Home
            </ListItem>
            <ListItem button component="a" href="/genres">
              Categories
            </ListItem>
            {token && userType?.toLowerCase() === "admin" && (
              <>
                <ListItem button component="a" href="/book">
                  View Books
                </ListItem>
                <ListItem button component="a" href="/book/add">
                  Add Book
                </ListItem>
                <ListItem button component="a" href="/genre">
                  View Genres
                </ListItem>
                <ListItem button component="a" href="/genre/add">
                  Add Genre
                </ListItem>
                <ListItem button component="a" href="/user">
                  Users
                </ListItem>
                <ListItem button component="a" href="/admin/view">
                  View Admins
                </ListItem>
                <ListItem button component="a" href="/admin/add">
                  Add Admin
                </ListItem>
              </>
            )}
            {token ? (
              <>
                <ListItem button component="a" href="/profile">
                  Profile
                </ListItem>
                <ListItem button component="a" href="/changepass">
                  Change Password
                </ListItem>
                <ListItem button component="a" href="/cart">
                  Cart
                </ListItem>
                <ListItem button component="a" href="/logout">
                  Logout
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component="a" href="/cart">
                  Cart
                </ListItem>
                <ListItem button component="a" href="/login">
                  Login
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Header;
