import React, { FC } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar";

// button styles
const flatBtn = {
    borderRadius: "0px"
}

const Home: FC = () => {
  return (
    <div>
      <Navbar/>
      <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col-md-6 text-right">
          <Link
            to={"/practice"}
            className="text-white btn btn-warning text-center"
            style={flatBtn}
          >
            practice
          </Link>
        </div>
        <div className="col-md-6 text-left">
          <Link
            to={"/rooms"}
            className="text-white btn btn-warning text-center"
            style={flatBtn}
          >
            Rooms
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
