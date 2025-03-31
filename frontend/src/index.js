import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <GoogleOAuthProvider clientId="312376237839-h1hqjhp3nn6l5rsr230puaojgsfm65he.apps.googleusercontent.com"> */}
        <App />
      {/* </GoogleOAuthProvider> */}
    </Provider>
  </React.StrictMode>
);
