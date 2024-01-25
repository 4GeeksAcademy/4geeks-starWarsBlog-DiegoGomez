import React from "react";
import img from "../../img/boba-fett.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-dark text-white">
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex align-items-center">
          <img src={img} className="w-25" alt="Star Wars Logo" />
          <h1 className="display-2 mt-5">Star Wars API</h1>
        </div>
        <p>
          Made by{" "}
          <a
            className="text-decoration-none"
            href="https://github.com/diegogomezgonza?tab=followers"
          >
            diegogomezgonza
          </a>
        </p>
      </div>

      <div className="p-5 mt-4 text-warning d-flex align-items-center">
  <h1 className="mx-3">Content</h1>
  <a
    href="/characters"
    className="text-decoration-none text-dark text-white mx-3"
  >
    Characters
  </a>
  <a
    href="/vehicles"
    className="text-decoration-none text-dark text-white mx-3"
  >
    Vehicles
  </a>
  <a
    href="/planets"
    className="text-decoration-none text-dark text-white mx-3"
  >
    Planets
  </a>
  <div className="ml-auto p-4">
    <button type="button" className="btn btn-warning btn-lg">
      Favorites<i className="fa-solid fa-caret-down ms-3"></i>
    </button>
  </div>
</div>


    </nav>
  );
};
