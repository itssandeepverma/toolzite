import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { useGetMeQuery } from "../../redux/api/userApi";

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();
  const { user } = useSelector((state) => state.auth);
  const bookmarksCount = user?.bookmarks?.length || 0;
  const [scrolled, setScrolled] = useState(false);
  const resourceLinks = [
    { name: "AI Jobs", href: "/ai-jobs" },
    { name: "AI Newsletters", href: "/ai-newsletters" },
    { name: "AI News", href: "/ai-news" },
    { name: "AI Research Papers", href: "/ai-papers" },
    { name: "AI Blogs", href: "/ai-blogs" },
  ];

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link tz-nav-link${isActive ? " tz-nav-link-active" : ""}`;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-xl tz-nav${scrolled ? " tz-nav-scrolled" : ""}`}>
      <div className="container tz-nav-container tz-nav-shell">
        <Link className="navbar-brand tz-brand" to="/">
          <img src="/images/icon.png" alt="" aria-hidden="true" className="tz-brand-icon" />
          <span className="tz-brand-text" data-text="ToolZite">ToolZite</span>
        </Link>

        <div className="tz-nav-mobile-controls d-xl-none ms-auto">
          <Link to="/products" className="tz-search-btn tz-search-btn-mobile" aria-label="Search tools">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
          <button
            className="navbar-toggler tz-nav-toggler d-xl-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#toolziteMobileMenu"
            aria-controls="toolziteMobileMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse d-none d-xl-flex" id="toolziteNavbar">
          <ul className="navbar-nav ms-auto align-items-xl-center tz-nav-links">
            <li className="nav-item">
              <NavLink to="/products" className={navLinkClass}>
                AI Tools
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="/code-tools" className="nav-link tz-nav-link">
                Code Tools
              </a>
            </li>
            <li className="nav-item">
              <a href="/pdf-tools" className="nav-link tz-nav-link">
                PDF Tools
              </a>
            </li>
            <li className="nav-item dropdown">
              <button
                className="btn dropdown-toggle tz-nav-link tz-nav-btn"
                type="button"
                id="exploreDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Resources
              </button>
              <ul className="dropdown-menu tz-dropdown" aria-labelledby="exploreDropdown">
                {resourceLinks.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="dropdown-item tz-dropdown-item">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to="/allcategory" className={navLinkClass}>All Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={user ? "/me/bookmarks" : "/login"} className={navLinkClass}>
                Bookmarks {user && bookmarksCount > 0 ? `(${bookmarksCount})` : ""}
              </NavLink>
            </li>
            <li className="nav-item d-none d-xl-flex">
              <Link to="/products" className="tz-search-btn" aria-label="Search tools">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Link>
            </li>

            {user ? (
              <li className="nav-item dropdown tz-user-menu-wrap">
                <button
                  className="btn dropdown-toggle tz-user-btn"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={(user?.avatar?.url || "/images/default_avatar.jpg").replace('http://','https://')}
                    alt="User Avatar"
                    className="rounded-circle me-2 tz-user-avatar"
                  />
                  <span className="tz-user-name">{user?.name}</span>
                </button>
                <ul className="dropdown-menu tz-dropdown" aria-labelledby="userDropdown">
                  {user?.role === 'admin' && (
                    <>
                      <li>
                        <Link className="dropdown-item tz-dropdown-item" to="/me/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item tz-dropdown-item" to="/me/orders">Orders</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <a className="dropdown-item tz-dropdown-item" href="/me/profile">Profile</a>
                  </li>
                  <li>
                    <a className="dropdown-item tz-dropdown-item" href="/me/bookmarks">
                      Bookmarks {bookmarksCount > 0 ? `(${bookmarksCount})` : ""}
                    </a>
                  </li>
                  <li>
                    <button className="dropdown-item tz-dropdown-item tz-logout-btn" onClick={logoutHandler}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              !isLoading && (
                <li className="nav-item d-flex gap-2 tz-auth-actions">
                  <Link to="/login" className="tz-login-text">Sign in</Link>
                  <Link to="/register" className="tz-nav-auth tz-nav-auth-solid">
                    Get Started <span className="tz-cta-arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start tz-offcanvas d-xl-none"
        tabIndex="-1"
        id="toolziteMobileMenu"
        aria-labelledby="toolziteMobileMenuLabel"
      >
        <div className="offcanvas-header tz-offcanvas-header">
          <Link className="tz-offcanvas-brand" to="/" data-bs-dismiss="offcanvas">
            <img src="/images/icon.png" alt="" aria-hidden="true" className="tz-brand-icon" />
            <span className="tz-brand-text" id="toolziteMobileMenuLabel">ToolZite</span>
          </Link>
          <button
            type="button"
            className="btn-close tz-offcanvas-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close menu"
          ></button>
        </div>
        <div className="offcanvas-body tz-offcanvas-body">
          <div className="tz-offcanvas-links">
            <NavLink to="/products" className={navLinkClass} data-bs-dismiss="offcanvas">
              AI Tools
            </NavLink>
            <a href="/code-tools" className="nav-link tz-nav-link">
              Code Tools
            </a>
            <a href="/pdf-tools" className="nav-link tz-nav-link">
              PDF Tools
            </a>
            <NavLink to="/allcategory" className={navLinkClass} data-bs-dismiss="offcanvas">
              All Categories
            </NavLink>
            <NavLink
              to={user ? "/me/bookmarks" : "/login"}
              className={navLinkClass}
              data-bs-dismiss="offcanvas"
            >
              Bookmarks {user && bookmarksCount > 0 ? `(${bookmarksCount})` : ""}
            </NavLink>
          </div>

          <div className="tz-offcanvas-subhead">Resources</div>
          <div className="tz-offcanvas-resource-list">
            {resourceLinks.map((item, index) => (
              <Link key={index} to={item.href} className="tz-offcanvas-resource" data-bs-dismiss="offcanvas">
                {item.name}
              </Link>
            ))}
          </div>

          {user ? (
            <div className="tz-offcanvas-auth">
              <Link to="/me/profile" className="tz-nav-auth tz-nav-auth-ghost" data-bs-dismiss="offcanvas">
                Profile
              </Link>
              <button
                type="button"
                className="tz-nav-auth tz-nav-auth-solid tz-offcanvas-logout"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          ) : (
            !isLoading && (
              <div className="tz-offcanvas-auth">
                <Link to="/login" className="tz-login-text" data-bs-dismiss="offcanvas">
                  Sign in
                </Link>
                <Link to="/register" className="tz-nav-auth tz-nav-auth-solid" data-bs-dismiss="offcanvas">
                  Get Started <span className="tz-cta-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
