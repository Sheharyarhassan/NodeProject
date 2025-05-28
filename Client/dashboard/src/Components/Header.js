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
  const loadAuthData = () => {
    const storedToken = localStorage.getItem("token") && JSON.parse(localStorage.getItem("token"));
    const storedUserType = localStorage.getItem("userType") && JSON.parse(localStorage.getItem("userType"));

    setToken(storedToken ? storedToken : null);
    setUserType(storedUserType ? storedUserType : null);
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

            </>
          ) : null}
          <NavItem>
            <NavLink href="/categories/">Categories</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">
              GitHub
            </NavLink>
          </NavItem>
        </Nav>
        <Nav>
          {token
            ?
            <NavLink href="/logout">Logout</NavLink> :
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
