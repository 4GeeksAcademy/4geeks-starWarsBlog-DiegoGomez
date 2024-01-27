import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Vehicles = () => {
  const { store, actions } = useContext(Context);

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
                      <i className="fa-solid fa-circle-info fs-1 ms-3 text-info"></i>
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
    </div>
  );
};

export default Vehicles;
