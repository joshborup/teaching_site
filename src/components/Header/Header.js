import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../Shared/Logo";
import axios from "axios";

function LoggedInLinks({ setToggle, toggle, user }) {
  const dispatch = useDispatch();

  function logout() {
    axios.get("/api/logout").then(() => {
      dispatch({ type: "SET_USER", payload: null });
    });
  }

  console.log("jit");
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
      {user.admin && (
        <NavLink onClick={setToggle} to="/admin/classview">
          Admin
        </NavLink>
      )}
      <NavLink to="/" onClick={logout}>
        Logout
      </NavLink>
    </div>
  );
}

function Header(props) {
  const user = useSelector(({ userDux }) => userDux.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/user")
      .then(res => {
        dispatch({ type: "SET_USER", payload: res.data });
      })
      .catch(err => console.log(err));
  }, []);
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
            <LoggedInLinks
              user={user}
              setToggle={() => setToggle(false)}
              toggle={toggle}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
