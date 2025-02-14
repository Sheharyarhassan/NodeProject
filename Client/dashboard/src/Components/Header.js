import React, { useState } from "react";
import {
   Collapse,
   Navbar,
   NavbarToggler,
   NavbarBrand,
   Nav,
   NavItem,
   NavLink,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
   NavbarText,
} from "reactstrap";

function Header() {
   const [isOpen, setIsOpen] = useState(false);
   const toggle = () => setIsOpen(!isOpen);
   const token = JSON.parse(localStorage.getItem("adminToken"));
   const usertoken = JSON.parse(localStorage.getItem("token"));
   const userType = JSON.parse(localStorage.getItem("userType"));
   return (
      <Navbar className={"px-lg-4"} color="light" light expand="md">
         <NavbarBrand href="/">Books</NavbarBrand>
         <NavbarToggler onClick={toggle} />
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
                              <DropdownItem divider />
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
                              <DropdownItem divider />
                              <DropdownItem>
                                 <NavLink href="/genre/add">Add Genre</NavLink>
                              </DropdownItem>
                           </DropdownMenu>
                        </UncontrolledDropdown>

                     </>
                  ) :null}
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
               {token || usertoken
                  ?
                  <NavLink href="/logout">Logout</NavLink>:
                  <>
                     <NavLink href="/login">User Login</NavLink>
                     <NavLink href="/adminLogin">Admin Login</NavLink>
                  </>
               }
            </Nav>
         </Collapse>
      </Navbar>
   );
}

export default Header;
