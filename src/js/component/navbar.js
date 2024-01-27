// navbar.js
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import img from "../../img/boba-fett.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

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
          <div className="dropdown">
            <button
              className="btn btn-warning btn-lg dropdown-toggle"
              type="button"
              onClick={toggleFavorites}
            >
              Favorites ({store.favoriteCharacters.length})
            </button>
            {showFavorites && (
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {store.favoriteCharacters.map((characterId) => (
                  <Link
                    key={characterId}
                    to={`/characters/${characterId}`}
                    className="dropdown-item"
                  >
                    {store.characterDetails[characterId].name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
