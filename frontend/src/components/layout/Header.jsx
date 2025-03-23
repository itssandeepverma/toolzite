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

  const handleAllProductsClick = () => {
    navigate("/products");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "#1c1c1c",
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
            {/* Explore Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="btn dropdown-toggle text-white"
                type="button"
                id="exploreDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Explore
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="exploreDropdown"
                style={{ backgroundColor: "#4a4a4a" }}
              >
                {[
                  { name: "AI Jobs", link: "/comingsoon" },
                  { name: "AI Newsletters", link: "/comingsoon" },
                  { name: "AI Magazines", link: "/comingsoon" },
                  { name: "AI News", link: "/comingsoon" },
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.link} className="dropdown-item">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            {/* All Products */}
            <li className="nav-item">
              <button className="nav-link btn nav-btn" onClick={handleAllProductsClick}>
                All Tools
              </button>
            </li>

            {/* All Categories */}
            <li className="nav-item">
              <Link to="/allcategory" className="nav-link nav-btn">
                All Categories
              </Link>
            </li>

            {/* Submit an AI Tool */}
            <li className="nav-item">
              <a
                href="https://docs.google.com/forms/d/1YgUtr8ekr7SR4k8HhyxIfgQztW0DnRvLPw-OfhwyRaI/edit"
                className="nav-link nav-btn"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "20px" }}
              >
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>➕</span> Submit an AI Tool
              </a>
            </li>

            {/* User Section */}
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
                <ul
                  className="dropdown-menu"
                  aria-labelledby="userDropdown"
                  style={{ backgroundColor: "#4a4a4a" }}
                >
                  {["Dashboard", "Orders", "Profile"].map((item, index) => (
                    <li key={index}>
                      <Link className="dropdown-item" to={`/me/${item.toLowerCase()}`}>
                        {item}
                      </Link>
                    </li>
                  ))}
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
                  <Link to="/login" className="btn login-btn">
                    Login
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Custom CSS for Hover Effects & Active Link Fix */}
      <style>
        {`
          .nav-btn {
            color: rgba(206, 206, 206, 0.67) !important;  /* ✅ Keeps original color after click */
            text-decoration: none;
            transition: 0.3s ease-in-out;
          }

          .nav-btn:hover {
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .dropdown-menu .dropdown-item {
            color: rgba(206, 206, 206, 0.67);
            transition: 0.3s ease-in-out;
          }

          .dropdown-menu .dropdown-item:hover {
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-color: rgba(255, 255, 255, 0.1);
          }

          .login-btn {
            border: 2px solid rgba(206, 206, 206, 0.67);
            color: rgba(206, 206, 206, 0.67);
            transition: 0.3s ease-in-out;
          }

          .login-btn:hover {
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            border-color: transparent;
          }

          /* Fix for active link turning black */
          .nav-link:focus, .nav-link:active {
            color: rgba(206, 206, 206, 0.67) !important;
          }

          /* Fix for button hover state */
          .nav-link.btn:hover {
            color: rgba(206, 206, 206, 0.67) !important;
          }
        `}
      </style>
    </nav>
  );
};

export default Header;
