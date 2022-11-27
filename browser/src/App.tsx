import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import PrivateRouter from "components/PrivateRouter";
import { LoginComponent } from "auth/login";
import { HomeComponent } from "layout/home/home";
import { SignupComponent } from "auth/signup";
function App() {
  return (
    <>
      <Switch>
        <Route path={"/login"} exact>
          <LoginComponent />
        </Route>
        <Route path={"/sign-up"} exact>
          <SignupComponent />
        </Route>
        <Route path={"/"} exact>
          <HomeComponent />
        </Route>
        <PrivateRouter path={"/home"} exact>adadadad</PrivateRouter>
      </Switch>
    </>
  );
}

export default App;
