import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="flex-shrink-0 lg:w-3/6 w-full m-auto text-center bg-base-100">
      <div>
        <Link to="dashboard">
          <button class="btn btn-primary">Dashboard</button>
        </Link>
      </div>
      <div className="mt-5">
        <Link to="/">
          <button class="mt-2 btn btn-primary">Landing Page</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
