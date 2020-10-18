import React, { FC } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./images/icon-72x72.png";
import {NavProps, ImageStyle} from "./interfaces";

//navbar logo style
const logoStyle: ImageStyle = {
    width: "1.5rem",
}

const Navbar: FC<NavProps> = ({path}) => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand shadow-sm">
      <div className="container">
      <Link to="/" className="brand-logo font-weight-bold text-white card-link">
        Typing..
        <img src={logo} alt="logo" style={logoStyle}/>
      </Link>
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link to={"/practice"} className={path === "/practice"? "active nav-link": "nav-link"}>
            Practice
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/rooms"} className={path === "/rooms"? "active nav-link": "nav-link"}>
            Rooms
          </Link>
        </li>
      </ul>
      </div>
    </nav>
  );
};
export default Navbar;
