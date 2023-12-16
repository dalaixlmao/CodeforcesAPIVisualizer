import React from "react";
import "./Header.css";
function Header({ title }) {
  return (
    <div className="head">
      <svg
        className="logo"
        width="60"
        height="47"
        viewBox="0 0 60 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="44" y="18" width="16" height="29" rx="4" fill="#E7331A" />
        <rect x="22" width="16" height="47" rx="4" fill="#0D98BA" />
        <rect y="13" width="16" height="34" rx="4" fill="#F6FF92" />
      </svg>
      <div className="title">{title}</div>
    </div>
  );
}

export default Header;
