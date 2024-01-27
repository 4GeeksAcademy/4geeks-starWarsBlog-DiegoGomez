import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Planets = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Obtener los personajes si el length de la lista de personajes es 0
    if (store.planets.length === 0) {
      actions.fetchPlanets();
    }
  }, [actions, store.planets]);

  useEffect(() => {
    // Obtener los detalles de todos los planetas si el length de la lista de planetas es mayor que 0
    if (store.planets.length > 0) {
      // Obtener los IDs de todos los planetas
      const planetIds = store.planets.map((planet) => planet.uid);
      // Llamar a la función para obtener los detalles de los planetas usando sus IDs
      actions.fetchPlanetDetails(planetIds);
    }
  }, [actions, store.planets]);

  // Toggle favorite status for vehicle
  const handleToggleFavorite = (planetId) => {
    actions.toggleFavoritePlanet(planetId);
  };
  return (
    <div className="p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Planets</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {store.planets.map((planet) => (
          <div key={planet.uid} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-danger display-6 fw-bold">
                  {planet.name}
                </h5>
                {/* Comprobar si existen los detalles del planeta antes de mostrarlos */}
                {store.planetDetails[planet.uid] && (
                  <div>
                    <p className="card-text fw-bold">
                      Population: {store.planetDetails[planet.uid].population}
                    </p>
                    <p className="card-text fw-bold">
                      Diameter: {store.planetDetails[planet.uid].diameter}
                    </p>
                    <p className="card-text fw-bold">
                      Gravity: {store.planetDetails[planet.uid].gravity}
                    </p>
                    <div className="d-flex">
                      <button
                        className="border border-0 bg-transparent"
                        onClick={() => handleToggleFavorite(planet.uid)}
                      >
                        <i className="fa-regular fa-heart fs-1"></i>
                      </button>
                      <i className="fa-solid fa-circle-info fs-1 ms-3 text-info"></i>
                    </div>
                  </div>
                )}
                {/* Mostrar mensaje de carga si se están recuperando los detalles del planeta */}
                {!store.planetDetails[planet.uid] && (
                  <p className="text-muted">Loading...</p>
                )}
                {/* Mostrar mensaje de error si falla la recuperación de los detalles del planeta */}
                {store.planetDetails[planet.uid] === false && (
                  <p className="text-danger">Error fetching.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;
