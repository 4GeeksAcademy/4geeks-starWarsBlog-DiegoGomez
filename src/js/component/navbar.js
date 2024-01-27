import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import img from "../../img/boba-fett.png";

export const Navbar = () => {
  const { store } = useContext(Context);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);
  const [favoritePlanets, setFavoritePlanets] = useState([]);

  useEffect(() => {
    // Update favorite characters list whenever favoriteCharacters changes
    const characters = store.favoriteCharacters.map((characterId) => {
      const character = store.characterDetails[characterId];
      return character ? character.name : null;
    });
    setFavoriteCharacters(characters.filter(Boolean));
  }, [store.favoriteCharacters, store.characterDetails]);

  useEffect(() => {
    // Update favorite characters list whenever favoriteCharacters changes
    const vehicles = store.favoriteVehicles.map((vehicleId) => {
      const vehicle = store.vehicleDetails[vehicleId];
      return vehicle ? vehicle.name : null;
    });
    setFavoriteCharacters(vehicles.filter(Boolean));
  }, [store.favoriteVehicles, store.vehicleDetails]);

  useEffect(() => {
    // Update favorite characters list whenever favoriteCharacters changes
    const planets = store.favoritePlanets.map((planetId) => {
      const planet = store.planetDetails[planetId];
      return planet ? planet.name : null;
    });
    setFavoritePlanets(planets.filter(Boolean));
  }, [store.favoritePlanets, store.planetDetails]);

  const handleRemoveCharacter = (characterId) => {
    // Remove character from favorites
    setFavoriteCharacters((prevFavorites) =>
      prevFavorites.filter((name) => name !== characterId)
    );
  };

  const handleRemoveVehicle = (vehicleId) => {
    // Remove character from favorites
    setFavoriteVehicles((prevFavorites) =>
      prevFavorites.filter((name) => name !== vehicleId)
    );
  };

  const handleRemovePlanet = (planetId) => {
    // Remove character from favorites
    setFavoritePlanets((prevFavorites) =>
      prevFavorites.filter((name) => name !== planetId)
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
                  onClick={() => handleRemoveCharacter(character)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
        {favoriteVehicles.length > 0 && (
          <div className="mt-3">
            {favoriteVehicles.map((vehicle, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <p>{vehicle}</p>

                <button
                  className="btn btn-warning ms-2"
                  onClick={() => handleRemoveVehicle(vehicle)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
        {favoritePlanets.length > 0 && (
          <div className="mt-3">
            {favoritePlanets.map((planet, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <p>{planet}</p>

                <button
                  className="btn btn-warning ms-2"
                  onClick={() => handleRemovePlanet(planet)}
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
