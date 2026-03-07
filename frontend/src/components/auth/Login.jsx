import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated, navigate]);

  const isValidEmail = (val) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(val);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      return toast.error("Please enter a valid email address");
    }
    if (!password || password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    const loginData = {
      email,
      password,
    };

    login(loginData);
  };

  return (
    <>
      <MetaData title={"Login"} />
      <div className="tz-auth-page">
        <div className="tz-auth-surface">
          <div className="tz-auth-header">
            <span className="tz-auth-chip">WELCOME BACK</span>
            <h1>Login to Toolzite</h1>
            <p>Continue with your account to manage bookmarks and discover curated tools.</p>
          </div>

          <form className="tz-auth-form" onSubmit={submitHandler}>
            <div className="tz-auth-field">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="tz-auth-field">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>

            <div className="tz-auth-meta">
              <a href="/password/forgot">Forgot password?</a>
            </div>

            <button id="login_button" type="submit" className="tz-auth-submit" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Login"}
            </button>

            <p className="tz-auth-switch">
              New to Toolzite? <a href="/register">Create account</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
