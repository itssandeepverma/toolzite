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

  const [login, { isLoading, error, data }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated]);

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
      <div style={{ marginTop: "140px", marginBottom: "120px" }} className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded form-dark"
            onSubmit={submitHandler}
            style={{ backgroundColor: "rgba(30,30,30,0.6)", color: "#e0e0e0", padding: 20 }}
          >
            <h2 className="mb-4">Login</h2>
            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <a href="/password/forgot" className="float-end mb-4">
              Forgot Password?
            </a>

            <button
              id="login_button"
              type="submit"
              className="btn btn-gradient w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "LOGIN"}
            </button>

            <div className="my-3">
              <a href="/register" className="float-end">
                New User?
              </a>
            </div>
          </form>
          <style>{`
            .form-dark .form-label, .form-dark h2 { color: #eaeaea; }
            .form-dark .form-control {
              background-color: #f1f3f5; /* light gray */
              color: #111;
              border: 1px solid rgba(255,255,255,0.15);
            }
            .form-dark .form-control:focus {
              outline: none;
              box-shadow: none;
            }
            .form-dark .form-control::placeholder { color: #cfcfcf; }
            .btn-gradient {
              background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
              color: #111;
              border: none;
              transition: transform .15s ease, box-shadow .15s ease, filter .2s;
            }
            .btn-gradient:hover {
              filter: brightness(1.05);
              box-shadow: 0 8px 24px rgba(0,0,0,0.35);
              color: #111;
            }
            .btn-gradient:focus, .btn-gradient:active { outline: none; box-shadow: none; }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default Login;
