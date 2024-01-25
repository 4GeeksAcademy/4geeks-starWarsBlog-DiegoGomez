import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Vehicles = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchVehicles();
  }, [actions]);

  console.log("Value of vehicles:", store.vehicles);

  return (
    <div className=" p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Star Wars Vehicles</h1>
      <div className="d-flex w-100">
        {store.vehicles &&
          store.vehicles.map((vehicle) => (
            <div key={vehicle.uid} className="card mx-1">
              <div>
                <img
                  src={`https://via.placeholder.com/300x400`} // Adjust the size as needed
                  className="card-img-top"
                  alt={vehicle.name}
                />
                <div className="card-body">
                  <p className="card-title fw-bold">{vehicle.name}</p>
                  <p className="card-text text-black">
                    Length: {vehicle.length}<br />
                    Model: {vehicle.model}<br />
                    Passengers: {vehicle.passengers}
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Vehicles;
