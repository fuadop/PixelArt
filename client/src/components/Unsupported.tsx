import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./images/icon-72x72.png";

const fullScreen = { height: "100vh", width: "100vw" };

const Unsupported = () => {
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center flex-column" style={fullScreen}>
          <img src={Logo} alt="keyboard" className="img-fluid"/>
          <p className="display-3 text-center font-weight-bold text-capitalize">not available on mobile screens</p>
        </div>
      </div>
    </div>
  );
};

export default Unsupported;
