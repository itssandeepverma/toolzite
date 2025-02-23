import React from "react";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(to right, #1c1c1c, #333)",
        position: "fixed",
        top: 0,
        width: "100%",
        opacity: 0.95,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/images/toolzite.png"
            alt="toolZite"
            style={{ width: "170px", height: "50px" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item dropdown">
                <button
                  className="btn dropdown-toggle text-white"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user?.avatar?.url || "/images/default_avatar.jpg"}
                    alt="User Avatar"
                    className="rounded-circle me-2"
                    style={{ width: "30px", height: "30px" }}
                  />
                  {user?.name}
                </button>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/admin/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/me/orders">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/me/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={logoutHandler}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              !isLoading && (
                <li className="nav-item">
                  <Link to="/login" className="btn btn-outline-light">
                    Login
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
