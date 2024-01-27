import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
// Este import es funcional después de instalar react-bootstrap
import Modal from "react-bootstrap/Modal";

const Vehicles = () => {
  const { store, actions } = useContext(Context);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    // Obtener los vehículos si el tamaño de la lista de vehículos es 0
    if (store.vehicles.length === 0) {
      actions.fetchVehicles();
    }
  }, [actions, store.vehicles]);

  useEffect(() => {
    // Obtener los detalles de todos los vehículos si el tamaño de la lista de vehículos es mayor que 0
    if (store.vehicles.length > 0) {
      // Obtener los IDs de todos los vehículos
      const vehicleIds = store.vehicles.map((vehicle) => vehicle.uid);
      // Llamar a la función para obtener los detalles de los vehículos usando sus IDs
      actions.fetchVehicleDetails(vehicleIds);
    }
  }, [actions, store.vehicles]);

  // Alternar el estado favorito para un vehículo
  const handleToggleFavorite = (vehicleId) => {
    actions.toggleFavoriteVehicle(vehicleId);
  };

  // Para mostrar el vehículo, se guarda su ID en el estado selectedVehicle
  const handleShowDetails = (characterId) => {
    setSelectedVehicle(characterId);
  };

  // Para cerrar el modal, se pone el estado selectedVehicle a null
  const handleCloseDetails = () => {
    setSelectedVehicle(null);
  };

  // Función para obtener la URL de la imagen del vehículo
  const getVehicleImageUrl = (vehicleId) => {
    return `https://starwars-visualguide.com/assets/img/vehicles/${vehicleId}.jpg`;
  };

  return (
    <div className="p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Vehicles</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {store.vehicles.map((vehicle) => (
          <div key={vehicle.uid} className="col">
            <div className="card">
              <img
                src={getVehicleImageUrl(vehicle.uid)}
                className="card-img-top"
                alt={vehicle.name}
              />
              <div className="card-body">
                <h5 className="card-title text-success display-6 fw-bold">
                  {vehicle.name}
                </h5>
                {/* Comprobar si existen los detalles del vehículo antes de mostrarlos */}
                {store.vehicleDetails[vehicle.uid] && (
                  <div>
                    <p className="card-text fw-bold">
                      Length: {store.vehicleDetails[vehicle.uid].length}
                    </p>
                    <p className="card-text fw-bold">
                      Model: {store.vehicleDetails[vehicle.uid].model}
                    </p>
                    <p className="card-text fw-bold">
                      Passengers: {store.vehicleDetails[vehicle.uid].passengers}
                    </p>
                    <div className="d-flex">
                      <button
                        className="border border-0 bg-transparent"
                        onClick={() => handleToggleFavorite(vehicle.uid)}
                      >
                        <i className="fa-regular fa-heart fs-1"></i>
                      </button>
                      <button
                        className="border border-0 bg-transparent"
                        onClick={() => handleShowDetails(vehicle.uid)}
                      >
                        <i className="fa-solid fa-circle-info fs-1 ms-3 text-info"></i>
                      </button>
                    </div>
                  </div>
                )}
                {/* Mostrar mensaje de carga si se están recuperando los detalles del vehículo */}
                {!store.vehicleDetails[vehicle.uid] && (
                  <p className="text-muted">Loading...</p>
                )}
                {/* Mostrar mensaje de error si falla la recuperación de los detalles del vehículo */}
                {store.vehicleDetails[vehicle.uid] === false && (
                  <p className="text-danger">Error fetching data.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal, se muestra si detecta que se ha hecho click en algún vehículo (
      se ha seleccionado un vehículo).
      ) */}
      <Modal show={selectedVehicle !== null} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Vehicle Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Accedo a los detalles del vehículo que ha sido seleccionado, y en cada p escojo que campo
          mostrar */}
          {selectedVehicle !== null &&
            store.vehicleDetails[selectedVehicle] && (
              <div>
                <p className="fw-bold">
                  Name: {store.vehicleDetails[selectedVehicle].name}
                </p>
                <p className="fw-bold">
                  Consumables:{" "}
                  {store.vehicleDetails[selectedVehicle].consumables}
                </p>
                <p className="fw-bold">
                  Cost in credits:{" "}
                  {store.vehicleDetails[selectedVehicle].cost_in_credits}
                </p>
                <p className="fw-bold">
                  Crew: {store.vehicleDetails[selectedVehicle].crew}
                </p>
                <p className="fw-bold">
                  Manufacturer:{" "}
                  {store.vehicleDetails[selectedVehicle].manufacturer}
                </p>
              </div>
            )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Vehicles;
