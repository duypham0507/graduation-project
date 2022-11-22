import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import PrivateRouter from "components/PrivateRouter";
import { LoginComponent } from "auth/login";
function App() {
  return (
    <>
      <Switch>
        <Route path={"/login"} exact>
          <LoginComponent />
        </Route>

        <PrivateRouter path={"/home"} exact>adadadad</PrivateRouter>
      </Switch>
    </>
  );
}

export default App;
