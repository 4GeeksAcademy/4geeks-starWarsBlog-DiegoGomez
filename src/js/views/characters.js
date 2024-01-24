import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Characters = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchCharacters();
  }, [actions]);

  console.log("Value of characters:", store.characters);

  return (
    <div className=" p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Star Wars Characters</h1>
      <div className="d-flex w-100">
        {store.characters &&
          store.characters.map((character) => (
            <div key={character.uid} className="card mx-1">
              <div>
                <img
                  src={`https://via.placeholder.com/300x400`} // Adjust the size as needed
                  className="card-img-top"
                  alt={character.name}
                />
                <div className="card-body">
                  <p className="card-title fw-bold">{character.name}</p>
                  <p className="card-text text-black">
                    Gender: {character.gender}<br />
                    Hair color: {character.hair_color}<br />
                    Eye color: {character.eye_color}
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

export default Characters;
