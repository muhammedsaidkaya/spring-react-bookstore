/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";
import UserInfo from "../Api/userInfo";
import SectionBucket from "../../views/index-sections/SectionBucket";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            href="index"
            title="Dewamke"
          >
            Prudentia Book Store
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            {
              UserInfo.isAdmin() == true ?  (
                  <>
                    <NavItem>
                      <NavLink
                          href="orders"
                      >
                        <i className="nc-icon nc-cart-simple" /> Orders
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          href="categories"
                      >
                        <i className="nc-icon nc-tile-56" /> Categories
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          href="statistic"
                      >
                        <i className="nc-icon nc-chart-bar-32" /> Statistics
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          href="users"
                      >
                        <i className="nc-icon nc-single-02" /> Users
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          href="products"
                      >
                        <i className="nc-icon nc-book-bookmark" /> Products
                      </NavLink>
                    </NavItem>
                  </>
              ) : (
                  <>
                    <NavItem>
                      <NavLink
                          href="index"
                      >
                        <i className="nc-icon nc-shop" /> Home
                      </NavLink>
                    </NavItem>
                    <SectionBucket/>
                    <NavItem>
                      <NavLink
                          href="profile"
                      >
                        <i className="nc-icon nc-settings-gear-65" /> Profile
                      </NavLink>
                    </NavItem>
                  </>
              )
            }

            <NavItem>
              <Button
                className="btn-round"
                color="danger"
                onClick={() => UserInfo.logout()}
              >
                Logout
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
