import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav>
      <div className="nav-wrapper green darken-1" style={{ padding: "0 2rem" }}>
        <a href="/" className="brand-logo">
          Cut The Link!
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to={"/create"}>Create</NavLink>
          </li>
          <li>
            <NavLink to={"/links"}>Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};