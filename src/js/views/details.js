import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Details = () => {
  //Obtengo los parámetros de la ruta con useParams
  const { category, id } = useParams();
  const { store } = useContext(Context);

  let details;
  // Segun la categoría que envío desde cada, obtengo el id del objeto que almacena
  // los detalles de cada cada elemento.
  switch (category) {
    case "characters":
      details = store.characterDetails[id];
      break;
    case "vehicles":
      details = store.vehicleDetails[id];
      break;
    case "planets":
      details = store.planetDetails[id];
      break;
    default:
      details = null;
  }

  return (
    //Dependiendo de la caegoría, el contenido del div cambia
    <div className="text-white d-flex justify-content-center align-items-center vh-100">
      {details && (
        <div>
          <h1>Details</h1>
          {category === "characters" && (
            <div className="text-white">
              <h1 className="display-2">Character: {details.name}</h1>
              <p>Birth year: {details.birth_year}</p>
              <p>Height: {details.height}</p>
              <p>Homeworld: {details.homeworld}</p>
              <p>Birth year: {details.skin_color}</p>
              <Link to={"/characters"} className="text-warning display-6">
                Go back
              </Link>
            </div>
          )}
          {category === "vehicles" && (
            <div className="text-white">
              <h1 className="display-2">Vehicle: {details.name}</h1>
              <p>Consumables: {details.consumables}</p>
              <p>Cost in credits: {details.cost_in_credits}</p>
              <p>Crew: {details.crew}</p>
              <p>Manufacturer: {details.manufacturer}</p>
              <Link to={"/vehicles"} className="text-warning display-6">
                Go back
              </Link>
            </div>
          )}
          {category === "planets" && (
            <div className="text-white">
              <h1 className="display-2">Planet: {details.name}</h1>
              <p>Climate: {details.climate}</p>
              <p>Orbital period: {details.orbital_period}</p>
              <p>Surface water: {details.surface_water}</p>
              <p>Rotation_period: {details.rotation_period}</p>
              <Link to={"/planets"} className="text-warning display-6">
                Go back
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;
