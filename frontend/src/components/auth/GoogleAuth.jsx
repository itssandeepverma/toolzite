import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "312376237839-h1hqjhp3nn6l5rsr230puaojgsfm65he.apps.googleusercontent.com"; // Replace with actual client ID

const GoogleAuth = () => {
  const handleSuccess = (response) => {
    console.log("Google Login Success:", response);
    // Send response.credential to backend
  };

  const handleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
