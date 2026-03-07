import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const navigate = useNavigate();

  const [register, { isLoading, error }] = useRegisterMutation();

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
    if (!name || name.trim().length < 2) {
      return toast.error("Please enter your name");
    }
    if (!isValidEmail(email)) {
      return toast.error("Please enter a valid email address");
    }
    if (!password || password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    const signUpData = {
      name,
      email,
      password,
    };

    register(signUpData);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <MetaData title={"Register"} />
      <div className="tz-auth-page">
        <div className="tz-auth-surface">
          <div className="tz-auth-header">
            <span className="tz-auth-chip">JOIN TOOLZITE</span>
            <h1>Create your account</h1>
            <p>Save tools, track categories, and get a cleaner discovery experience across the product suite.</p>
          </div>

          <form className="tz-auth-form" onSubmit={submitHandler}>
            <div className="tz-auth-field">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className="tz-auth-field">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                name="email"
                value={email}
                onChange={onChange}
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
                onChange={onChange}
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
            </div>

            <button id="register_button" type="submit" className="tz-auth-submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create account"}
            </button>

            <p className="tz-auth-switch">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
