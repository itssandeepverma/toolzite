import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { useGetMeQuery } from "../../redux/api/userApi";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const hardNavigate = (event, path) => {
    event.preventDefault();
    window.location.assign(path);
  };

  const navLinkClass = (matcher) =>
    `nav-link tz-nav-link${
      (typeof matcher === "function" ? matcher(location.pathname) : location.pathname === matcher)
        ? " tz-nav-link-active"
        : ""
    }`;

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
        <a className="navbar-brand tz-brand" href="/">
          <img src="/images/icon.png" alt="" aria-hidden="true" className="tz-brand-icon" />
          <span className="tz-brand-text" data-text="ToolZite">ToolZite</span>
        </a>

        <div className="tz-nav-mobile-controls d-xl-none ms-auto">
          <a
            href="/products"
            className="tz-search-btn tz-search-btn-mobile"
            aria-label="Search tools"
            onClick={(event) => hardNavigate(event, "/products")}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </a>
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
              <a href="/products" className={navLinkClass("/products")}>
                AI Tools
              </a>
            </li>
            <li className="nav-item">
              <a href="/code-tools" className={navLinkClass((path) => path.startsWith("/code-tools"))}>
                Code Tools
              </a>
            </li>
            <li className="nav-item">
              <a href="/pdf-tools" className={navLinkClass((path) => path.startsWith("/pdf-tools"))}>
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
                    <Link to={item.href} className="dropdown-item tz-dropdown-item">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <a href="/allcategory" className={navLinkClass("/allcategory")}>All Categories</a>
            </li>
            <li className="nav-item">
              <a
                href={user ? "/me/bookmarks" : "/login"}
                className={navLinkClass((path) => (user ? path.startsWith("/me/bookmarks") : path === "/login"))}
              >
                Bookmarks {user && bookmarksCount > 0 ? `(${bookmarksCount})` : ""}
              </a>
            </li>
            <li className="nav-item d-none d-xl-flex">
              <a href="/products" className="tz-search-btn" aria-label="Search tools">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" stroke="currentColor" strokeWidth="2" />
                  <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
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
                        <a className="dropdown-item tz-dropdown-item" href="/me/dashboard">Dashboard</a>
                      </li>
                      <li>
                        <a className="dropdown-item tz-dropdown-item" href="/me/orders">Orders</a>
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
                  <a href="/login" className="tz-login-text">Sign in</a>
                  <a href="/register" className="tz-nav-auth tz-nav-auth-solid">
                    Get Started <span className="tz-cta-arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end tz-offcanvas d-xl-none"
        tabIndex="-1"
        id="toolziteMobileMenu"
        aria-labelledby="toolziteMobileMenuLabel"
      >
        <div className="offcanvas-header tz-offcanvas-header">
          <a className="tz-offcanvas-brand" href="/" data-bs-dismiss="offcanvas">
            <img src="/images/icon.png" alt="" aria-hidden="true" className="tz-brand-icon" />
            <span className="tz-brand-text" id="toolziteMobileMenuLabel">ToolZite</span>
          </a>
          <button
            type="button"
            className="btn-close tz-offcanvas-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close menu"
          ></button>
        </div>
        <div className="offcanvas-body tz-offcanvas-body">
          <div className="tz-offcanvas-links">
            <a
              href="/products"
              className={navLinkClass("/products")}
              data-bs-dismiss="offcanvas"
              onClick={(event) => hardNavigate(event, "/products")}
            >
              AI Tools
            </a>
            <a
              href="/code-tools"
              className={navLinkClass((path) => path.startsWith("/code-tools"))}
              data-bs-dismiss="offcanvas"
              onClick={(event) => hardNavigate(event, "/code-tools")}
            >
              Code Tools
            </a>
            <a
              href="/pdf-tools"
              className={navLinkClass((path) => path.startsWith("/pdf-tools"))}
              data-bs-dismiss="offcanvas"
              onClick={(event) => hardNavigate(event, "/pdf-tools")}
            >
              PDF Tools
            </a>
            <a
              href="/allcategory"
              className={navLinkClass("/allcategory")}
              data-bs-dismiss="offcanvas"
              onClick={(event) => hardNavigate(event, "/allcategory")}
            >
              All Categories
            </a>
            <a
              href={user ? "/me/bookmarks" : "/login"}
              className={navLinkClass((path) => (user ? path.startsWith("/me/bookmarks") : path === "/login"))}
              data-bs-dismiss="offcanvas"
              onClick={(event) => hardNavigate(event, user ? "/me/bookmarks" : "/login")}
            >
              Bookmarks {user && bookmarksCount > 0 ? `(${bookmarksCount})` : ""}
            </a>
          </div>

          <div className="tz-offcanvas-subhead">Resources</div>
          <div className="tz-offcanvas-resource-list">
            {resourceLinks.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="tz-offcanvas-resource"
                data-bs-dismiss="offcanvas"
                onClick={(event) => hardNavigate(event, item.href)}
              >
                {item.name}
              </a>
            ))}
          </div>

          {user ? (
            <div className="tz-offcanvas-auth">
              <a
                href="/me/profile"
                className="tz-nav-auth tz-nav-auth-ghost"
                data-bs-dismiss="offcanvas"
                onClick={(event) => hardNavigate(event, "/me/profile")}
              >
                Profile
              </a>
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
                <a
                  href="/login"
                  className="tz-login-text"
                  data-bs-dismiss="offcanvas"
                  onClick={(event) => hardNavigate(event, "/login")}
                >
                  Sign in
                </a>
                <a
                  href="/register"
                  className="tz-nav-auth tz-nav-auth-solid"
                  data-bs-dismiss="offcanvas"
                  onClick={(event) => hardNavigate(event, "/register")}
                >
                  Get Started <span className="tz-cta-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
