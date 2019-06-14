import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Shared/Logo";
import axios from "axios";

function LoggedInLinks({ setToggle, toggle }) {
  const dispatch = useDispatch();
  function logout() {
    axios.get("/api/logout").then(() => {
      dispatch({ type: "SET_USER", payload: null });
    });
  }
  return (
    <div
      className={
        toggle ? "main-nav-link-container show" : "main-nav-link-container hide"
      }
    >
      <NavLink onClick={setToggle} to="/">
        Courses
      </NavLink>
      <NavLink onClick={setToggle} to="/resources">
        Resources
      </NavLink>
      <NavLink onClick={setToggle} to="/account">
        Account
      </NavLink>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function Header(props) {
  const user = useSelector(({ userDux: user }) => user);
  const [toggle, setToggle] = useState(false);
  return (
    <header className="main-header">
      <div>
        <div>
          <Logo />
        </div>
        <button
          onClick={() => setToggle(!toggle)}
          className="nav-toggler-button"
        >
          Toggle
        </button>
        <div>
          {user ? (
            <LoggedInLinks setToggle={() => setToggle(false)} toggle={toggle} />
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
