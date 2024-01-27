import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import img from "../../img/boba-fett.png";

export const Navbar = () => {
  const { store } = useContext(Context);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    // Update favorite characters list whenever favoriteCharacters changes
    const characters = store.favoriteCharacters.map((characterId) => {
      const character = store.characterDetails[characterId];
      return character ? character.name : null;
    });
    setFavoriteCharacters(characters.filter(Boolean)); // Filter out null values
  }, [store.favoriteCharacters, store.characterDetails]);

  const handleRemoveFavorite = (characterId) => {
    // Remove character from favorites
    setFavoriteCharacters((prevFavorites) =>
      prevFavorites.filter((name) => name !== characterId)
    );
  };

  return (
    <div className="d-flex bg-dark text-white p-5 align-items-center">
      <div className="col-4 d-flex align-items-center">
        <img src={img} className="w-25" alt="Star Wars Logo" />
        <div>
          <h1 className="display-5 mt-5">Star Wars API</h1>
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
      </div>
      <div className="col-4 text-warning">
        <h1 className="mx-3 display-6">Content</h1>
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
      </div>
      <div className="col-4">
        <h1 className="text-warning display-6">Favorites</h1>
        {favoriteCharacters.length > 0 && (
          <div className="mt-3">
            {favoriteCharacters.map((character, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <p>{character}</p>

                <button
                  className="btn btn-warning ms-2"
                  onClick={() => handleRemoveFavorite(character)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
