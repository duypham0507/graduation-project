import React, { useState } from "react";
import "./App.css";
import { LoginComponent } from "./auth/login/index";
import store from "store";
import { Provider as ReduxProvider } from "react-redux";

import { ConfigProvider } from "antd";
import { getTheme } from "config/theme";
import { MODE } from "enums";
import App from "App";
import { BrowserRouter } from "react-router-dom";
function AppWithContext() {
  const [mode, setMode] = useState<MODE>(MODE.LIGHT);
  return (
    <ReduxProvider store={store}>
      <ConfigProvider theme={getTheme(mode)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </ReduxProvider>
  );
}

export default AppWithContext;
