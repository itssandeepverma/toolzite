import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const SideMenu = ({ menuItems }) => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    <div className="list-group mt-5 pl-4" style={{ backgroundColor: "#5e5e5e", color: "white", borderRadius: "10px", padding: "10px" }}>
      {menuItems?.map((menuItem, index) => (
        <a
          key={index}
          href={menuItem.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenuItem.includes(menuItem.url) ? "active" : ""
          }`}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={activeMenuItem.includes(menuItem.url) ? "true" : "false"}
          style={{ border: 'none' }}
        >
          <i className={`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
        </a>
      ))}
      <style>{`
        .list-group .list-group-item {
          background-color: rgba(94,94,94,0.6);
          color: #fff;
          border: none;
          margin-bottom: 6px;
          transition: color .2s ease;
        }
        /* Only change text color on hover/focus */
        .list-group .list-group-item:hover,
        .list-group .list-group-item:focus {
          background-color: rgba(94,94,94,0.6);
          background-image: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          outline: none;
          box-shadow: none;
        }
        /* Active/selected: keep same background, gradient text only */
        .list-group .list-group-item.active,
        .list-group .list-group-item.active:hover {
          background-color: rgba(94,94,94,0.6) !important;
          background-image: linear-gradient(to right, rgb(0, 156, 62), rgb(172, 236, 32));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: inherit;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default SideMenu;
