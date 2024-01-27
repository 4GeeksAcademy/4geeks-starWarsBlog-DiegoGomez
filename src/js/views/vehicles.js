import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Vehicles = () => {
  const { store, actions } = useContext(Context);

  // Efecto para cargar la lista de vehículos si está vacía
  useEffect(() => {
    if (store.vehicles.length === 0) {
      actions.fetchVehicles();
    }
  }, [actions, store.vehicles]);

  // Efecto para cargar los detalles de los vehículos una vez que se ha cargado la lista de vehículos
  useEffect(() => {
    if (store.vehicles.length > 0) {
      const vehicleIds = store.vehicles.map((vehicle) => vehicle.uid);
      actions.fetchVehicleDetails(vehicleIds);
    }
  }, [actions, store.vehicles]);

  return (
    <div className="p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Vehicles</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {store.vehicles.map((vehicle) => (
          <div key={vehicle.uid} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-success display-6 fw-bold">
                  {vehicle.name}
                </h5>
                {/* Mostrar los detalles del vehículo si están disponibles */}
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
                      <i className="fa-regular fa-heart fs-1"></i>
                      <i className="fa-solid fa-heart fs-1 ms-3 text-danger"></i>
                      <i className="fa-solid fa-circle-info fs-1 ms-3 text-info"></i>
                    </div>
                  </div>
                )}
                {/* Mostrar mensaje de carga si los detalles del vehículo están siendo cargados */}
                {!store.vehicleDetails[vehicle.uid] && (
                  <p className="text-muted">Loading...</p>
                )}
                {/* Mostrar mensaje de error si falla la carga de los detalles del vehículo */}
                {store.vehicleDetails[vehicle.uid] === false && (
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

export default Vehicles;
