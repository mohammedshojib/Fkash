import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img from "../assets/sadface.gif";

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center m-auto min-h-screen">
      <h4 className="mt-16 text-4xl uppercase">404 Not Found</h4>
      <img className="max-w-md" src={img} alt="not-found" />
      <br />
      <a className="btn btn-warning" onClick={() => navigate("/")}>
        <FaArrowLeft /> <span className="ml-3"> </span> Go Back To Home
      </a>
    </div>
  );
};

export default Notfound;
