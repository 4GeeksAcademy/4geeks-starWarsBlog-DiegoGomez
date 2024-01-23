import React from "react";
import img from "../../img/boba-fett.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-dark text-white">
      <div className="d-flex flex-column align-items-center">
    <div className="d-flex align-items-center">
        <img src={img} className="w-25" alt="Star Wars Logo" />
        <h1 className="display-2 mt-5">Star Wars</h1>
    </div>
    <p>
        Made by <a className="text-decoration-none" href="https://github.com/diegogomezgonza?tab=followers">diegogomezgonza</a>
    </p>
</div>


      <div className="ml-auto p-4">
        <button type="button" class="btn btn-warning btn-lg">
          Favorites<i class="fa-solid fa-caret-down ms-3"></i>
        </button>
      </div>
    </nav>
  );
};
