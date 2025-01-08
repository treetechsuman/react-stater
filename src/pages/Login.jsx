import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginForm from "../components/forms/LoginForm";
const Login = ({}) => {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <LoginForm></LoginForm>
    </GoogleOAuthProvider>
  );
};

export default Login;
