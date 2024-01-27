import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
// Este import es funcional después de instalar react-bootstrap
import Modal from "react-bootstrap/Modal";

const Planets = () => {
  const { store, actions } = useContext(Context);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    // Obtener los planetas si el tamaño de la lista de planetas es 0
    if (store.planets.length === 0) {
      actions.fetchPlanets();
    }
  }, [actions, store.planets]);

  useEffect(() => {
    // Obtener los detalles de todos los planetas si el tamaño de la lista de planetas es mayor que 0
    if (store.planets.length > 0) {
      // Obtener los IDs de todos los planetas
      const planetIds = store.planets.map((planet) => planet.uid);
      // Llamar a la función para obtener los detalles de los planetas usando sus IDs
      actions.fetchPlanetDetails(planetIds);
    }
  }, [actions, store.planets]);

  // Alternar el estado favorito para un planeta
  const handleToggleFavorite = (planetId) => {
    actions.toggleFavoritePlanet(planetId);
  };

  // Para mostrar el planeta, se guarda su ID en el estado selectedPlanet
  const handleShowDetails = (planetId) => {
    setSelectedPlanet(planetId);
  };

  // Para cerrar el modal, se pone el estado selectedPlanet a null
  const handleCloseDetails = () => {
    setSelectedPlanet(null);
  };

  // Función para obtener la URL de la imagen del planeta
  const getPlanetImageUrl = (planetId) => {
    return `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;
  };

  return (
    <div className="p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Planets</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {store.planets.map((planet) => (
          <div key={planet.uid} className="col">
            <div className="card">
              <img
                src={getPlanetImageUrl(planet.uid)}
                className="card-img-top"
                alt={planet.name}
              />
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
                      <button
                        className="border border-0 bg-transparent"
                        onClick={() => handleShowDetails(planet.uid)}
                      >
                        <i className="fa-solid fa-circle-info fs-1 ms-3 text-info"></i>
                      </button>
                    </div>
                  </div>
                )}
                {/* Mostrar mensaje de carga si se están recuperando los detalles del planeta */}
                {!store.planetDetails[planet.uid] && (
                  <p className="text-muted">Loading...</p>
                )}
                {/* Mostrar mensaje de error si falla la recuperación de los detalles del planeta */}
                {store.planetDetails[planet.uid] === false && (
                  <p className="text-danger">Error fetching data.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal, se muestra si detecta que se ha hecho click en algún planeta (
      se ha seleccionado un planeta).
      ) */}
      <Modal show={selectedPlanet !== null} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Planet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Accedo a los detalles del planeta que ha sido seleccionado, y en cada p escojo que campo
          mostrar */}
          {selectedPlanet !== null &&
            store.planetDetails[selectedPlanet] && (
              <div>
                <p className="fw-bold">
                  Name: {store.planetDetails[selectedPlanet].name}
                </p>
                <p className="fw-bold">
                  Climate:{" "}
                  {store.planetDetails[selectedPlanet].climate}
                </p>
                <p className="fw-bold">
                  Orbital period:{" "}
                  {store.planetDetails[selectedPlanet].orbital_period}
                </p>
                <p className="fw-bold">
                  Surface water: {store.planetDetails[selectedPlanet].surface_water}
                </p>
                <p className="fw-bold">
                  Rotation period:{" "}
                  {store.planetDetails[selectedPlanet].rotation_period}
                </p>
              </div>
            )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Planets;
