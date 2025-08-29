import React, { useEffect, useState } from "react";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Password reset successfully");
      navigate("/login");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password does not match. Try again!");
    }
    if (!password || password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    const data = { password, confirmPassword };

    resetPassword({ token: params?.token, body: data });
  };

  return (
    <>
      <MetaData title={"Reset Password"} />
      <div style={{ marginTop: "140px", marginBottom: "120px" }} className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded form-dark"
            onSubmit={submitHandler}
            style={{ backgroundColor: "rgba(30,30,30,0.6)", color: "#e0e0e0", padding: 20 }}
          >
            <h2 className="mb-4">New Password</h2>

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

            <div className="mb-3">
              <label htmlFor="confirm_password_field" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn w-100 py-2"
              disabled={isLoading}
            >
              Set Password
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

export default ResetPassword;
