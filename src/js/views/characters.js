// Characters.js
import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Characters = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchCharacters();
    // Fetch character details for each character
    store.characters.forEach(character => actions.fetchCharacter(character.uid));
  }, [actions]);

  return (
    <div className="p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Star Wars Characters</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {store.characters.map((character) => (
          <div key={character.uid} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                {/* Access character details from store.characterDetails */}
                <p className="card-text">Gender: {store.characterDetails[character.uid]?.gender}</p>
                <p className="card-text">Hair Color: {store.characterDetails[character.uid]?.hair_color}</p>
                <p className="card-text">Eye Color: {store.characterDetails[character.uid]?.eye_color}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
