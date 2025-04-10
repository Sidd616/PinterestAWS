import { AuthProvider } from "react-oidc-context";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_BRgR5KGvm",
  client_id: "f2gt4v2ut7bn16tl7ctbunu6e",
  redirect_uri: "http://localhost:5173/",//"https://main.dp42myfy09fyo.amplifyapp.com/",
  response_type: "code",
  scope: "phone openid email",
  //   onSigninCallback: () => {
  //     window.history.replaceState({}, document.title, window.location.pathname);
  //   },
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
