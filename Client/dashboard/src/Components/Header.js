import React, {useEffect, useState} from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  const loadAuthData = () => {
    const storedToken = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token"));
    const storedUserType = localStorage.getItem("userType") && JSON.parse(localStorage.getItem("userType"));
    const storedUser = localStorage.getItem("userDetails") && JSON.parse(localStorage.getItem("userDetails"));
    setToken(storedToken ? storedToken : null);
    setUserType(storedUserType ? storedUserType : null);
    setUser(storedUser ? storedUser.name : null);
  };

  useEffect(() => {
    loadAuthData();
    const onStorageChange = () => loadAuthData();
    window.addEventListener("authChange", onStorageChange);
    return () => {
      window.removeEventListener("authChange", onStorageChange);
    };
  }, []);
  return (
    <Navbar className={"px-lg-4"} color="light" light expand="md">
      <NavbarBrand href="/">Books</NavbarBrand>
      <NavbarToggler onClick={toggle}/>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          {token && userType?.toLowerCase() === "admin" ? (
            <>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Book
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <NavLink href="/book">View All</NavLink>
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem>
                    <NavLink href="/book/add">Add Book</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Genre
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <NavLink href="/genre">View All</NavLink>
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem>
                    <NavLink href="/genre/add">Add Genre</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="/user">Users</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Admin
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <NavLink href="/admin/view">View All</NavLink>
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem>
                    <NavLink href="/admin/add">Add Admin</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          ) : null}

          <NavItem>
            <NavLink href="/genres">
              Categories
            </NavLink>
          </NavItem>
        </Nav>
        <Nav>
          {token
            ?
            <>
              <UncontrolledDropdown>
                <DropdownToggle nav caret>{user}</DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>
                    <NavLink href="/profile">Profile</NavLink>
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem>
                    <NavLink href="/changepass">Change Password</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavLink href="/logout">Logout</NavLink>
            </>
            :
            <>
              <NavLink href="/login">Login</NavLink>
            </>
          }
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Header;
