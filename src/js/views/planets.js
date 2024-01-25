import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Planets = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchPlanets();
  }, [actions]);

  console.log("Value of planets:", store.planets);

  return (
    <div className=" p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Star Wars planets</h1>
      <div className="d-flex w-100">
        {store.planets &&
          store.planets.map((planet) => (
            <div key={planet.uid} className="card mx-1">
              <div>
                <img
                  src={`https://via.placeholder.com/300x400`} // Adjust the size as needed
                  className="card-img-top"
                  alt={planet.name}
                />
                <div className="card-body">
                  <p className="card-title fw-bold">{planet.name}</p>
                  <p className="card-text text-black">
                    Films: {planet.films}<br />
                    Diameter: {planet.diameter}<br />
                    Gravity: {planet.gravity}
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

export default Planets;
