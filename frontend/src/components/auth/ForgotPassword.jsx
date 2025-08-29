import React, { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Email Sent. Please check your inbox");
    }
  }, [error, isAuthenticated, isSuccess]);

  const isValidEmail = (val) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(val);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      return toast.error("Please enter a valid email address");
    }
    forgotPassword({ email });
  };

  return (
    <>
      <MetaData title={"Forgot Password"} />
      <div style={{ marginTop: "140px", marginBottom: "120px" }} className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded form-dark"
            onSubmit={submitHandler}
            style={{ backgroundColor: "rgba(30,30,30,0.6)", color: "#e0e0e0", padding: 20 }}
          >
            <h2 className="mb-4">Forgot Password</h2>
            <div className="mt-3">
              <label htmlFor="email_field" className="form-label">
                Enter Email
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

            <button
              id="forgot_password_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Email"}
            </button>
          </form>
          <style>{`
            .form-dark .form-label, .form-dark h2 { color: #eaeaea; }
            .form-dark .form-control {
              background-color: #f1f3f5; /* light gray */
              color: #111;
              border: 1px solid rgba(255,255,255,0.15);
            }
            .form-dark .form-control:focus { outline: none; box-shadow: none; }
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
          `}</style>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
