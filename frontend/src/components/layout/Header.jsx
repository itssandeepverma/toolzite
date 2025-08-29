import React from "react";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import Button from "./LoginButton";

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();
  const { user } = useSelector((state) => state.auth);
  const bookmarksCount = user?.bookmarks?.length || 0;

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  // Removed client-side navigation for full reload via anchor links

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
                  { name: "AI Jobs", href: "/ai-jobs" },
                  { name: "AI Newsletters", href: "/ai-newsletters" },
                  { name: "AI News", href: "/ai-news" },
                  { name: "AI Research Papers", href: "/ai-papers" },
                ].map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="dropdown-item">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>


            {/* All Products */}
            <li className="nav-item">
              <a href="/products" className="nav-link nav-btn">
                All Tools
              </a>
            </li>

            {/* All Categories */}
            <li className="nav-item">
              <a href="/allcategory" className="nav-link nav-btn">
                All Categories
              </a>
            </li>


            {/* News Hubs */}
            <li className="nav-item">
              <a href="/ai-news" className="nav-link nav-btn">AI News</a>
            </li>
            <li className="nav-item">
              <a href="/ai-newsletters" className="nav-link nav-btn">AI Newsletters</a>
            </li>
            <li className="nav-item">
              <a href="/ai-papers" className="nav-link nav-btn">AI Papers</a>
            </li>
            <li className="nav-item">
              <a href="/ai-jobs" className="nav-link nav-btn">AI Jobs</a>
            </li>
            

              {/* My Bookmarks */}
            <li className="nav-item">
              <a href={user ? "/me/bookmarks" : "/login"} className="nav-link nav-btn">
                My Bookmarks {user && bookmarksCount > 0 ? `(${bookmarksCount})` : ""}
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
                  {/* Show admin links only for admin */}
                  {user?.role === 'admin' && (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/me/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/me/orders">Orders</Link>
                      </li>
                    </>
                  )}
                  {/* Always show Profile */}
                  <li>
                    <a className="dropdown-item" href="/me/profile">Profile</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/me/bookmarks">
                      Bookmarks {bookmarksCount > 0 ? `(${bookmarksCount})` : ""}
                    </a>
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
                  <Button text="Login" onClick={() => (window.location.href = "/login")} />
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
          .dropdown-menu .dropdown-item:active,
          .dropdown-menu .dropdown-item:focus {
            background: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-color: rgba(255,255,255,0.1) !important;
            outline: none;
            box-shadow: none;
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
