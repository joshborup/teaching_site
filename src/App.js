import React from "react";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import CourseView from "./components/Course/Course";
import Resources from "./components/Resources/Resources";
import Account from "./components/Account/Account";
import AuthContainer from "./components/Auth/AuthContainer";
import userFetch from "./hooks/fetchUser";
import SingleCourse from "./components/SingleCourse/SingleCourse";

import "./App.scss";

function App() {
  userFetch("/api/user");

  const user = useSelector(({ userDux }) => userDux.user);
  return (
    <div className="App">
      {user ? (
        <>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <Layout
                    flexDirection="column"
                    justifyContent="flex-start"
                    className="home-container"
                  >
                    <CourseView />
                  </Layout>
                );
              }}
            />
            <Route
              path="/account"
              render={() => {
                return (
                  <Layout
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="initial"
                    className="home-container"
                  >
                    <Account />
                  </Layout>
                );
              }}
            />
            <Route
              path="/resources"
              render={() => {
                return (
                  <Layout
                    flexDirection="column"
                    justifyContent="flex-start"
                    className="home-container"
                  >
                    <Resources />
                  </Layout>
                );
              }}
            />
            <Route
              path="/course/:id"
              render={() => {
                return (
                  <Layout
                    flexDirection="column"
                    justifyContent="flex-start"
                    className="home-container"
                  >
                    <SingleCourse />
                  </Layout>
                );
              }}
            />
          </Switch>
        </>
      ) : (
        <AuthContainer />
      )}
    </div>
  );
}

export default App;
