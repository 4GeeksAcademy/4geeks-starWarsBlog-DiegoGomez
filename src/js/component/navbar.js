import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import img from "../../img/boba-fett.png";

export const Navbar = () => {
  const { store } = useContext(Context);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteVehicles, setFavoriteVehicles] = useState([]);
  const [favoritePlanets, setFavoritePlanets] = useState([]);

  // Efectos para actualizar la lista de favoritos cuando cambian los datos de la tienda
  useEffect(() => {
    updateFavorites(store.favoriteCharacters, store.characterDetails, setFavoriteCharacters);
  }, [store.favoriteCharacters, store.characterDetails]);

  useEffect(() => {
    updateFavorites(store.favoriteVehicles, store.vehicleDetails, setFavoriteVehicles);
  }, [store.favoriteVehicles, store.vehicleDetails]);

  useEffect(() => {
    updateFavorites(store.favoritePlanets, store.planetDetails, setFavoritePlanets);
  }, [store.favoritePlanets, store.planetDetails]);

  // Función para actualizar la lista de favoritos
  const updateFavorites = (favoriteIds, details, setFavorites) => {
    const favorites = favoriteIds.map(id => details[id]?.name).filter(Boolean);
    setFavorites(favorites);
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
        <a href="/characters" className="text-decoration-none text-dark text-white mx-3">
          Characters
        </a>
        <a href="/vehicles" className="text-decoration-none text-dark text-white mx-3">
          Vehicles
        </a>
        <a href="/planets" className="text-decoration-none text-dark text-white mx-3">
          Planets
        </a>
      </div>
      <div className="col-4">
        <h1 className="text-warning display-6">Favorites</h1>
        {renderFavorites(favoriteCharacters, setFavoriteCharacters)}
        {renderFavorites(favoriteVehicles,  setFavoriteVehicles)}
        {renderFavorites(favoritePlanets,  setFavoritePlanets)}
      </div>
    </div>
  );
};

// Función para renderizar la lista de elementos favoritos
const renderFavorites = (favorites) => {
  return favorites.length > 0 && (
    <div className="mt-3">
      {favorites.map((item, index) => (
        <div key={index} className="d-flex justify-content-between align-items-center mb-2">
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};
