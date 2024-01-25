import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Characters = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Fetch characters only if the store is empty
    if (store.characters.length === 0) {
      actions.fetchCharacters();
    }
  }, [actions, store.characters]);

  useEffect(() => {
    // Fetch character details for each character
    store.characters.forEach(character => {
      // Check if character details exist in store before fetching
      if (!store.characterDetails[character.uid]) {
        actions.fetchCharacter(character.uid);
      }
    });
  }, [actions, store.characters, store.characterDetails]);

  return (
    <div className="p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Star Wars Characters</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {store.characters.map((character) => (
          <div key={character.uid} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                {/* Check if character details exist before displaying them */}
                {store.characterDetails[character.uid] && (
                  <>
                    <p className="card-text">Gender: {store.characterDetails[character.uid]?.gender}</p>
                    <p className="card-text">Hair Color: {store.characterDetails[character.uid]?.hair_color}</p>
                    <p className="card-text">Eye Color: {store.characterDetails[character.uid]?.eye_color}</p>
                  </>
                )}
                {/* Display loading message if character details are being fetched */}
                {!store.characterDetails[character.uid] && (
                  <p className="text-muted">Fetching character details...</p>
                )}
                {/* Display error message if fetching character details failed */}
                {store.characterDetails[character.uid] === false && (
                  <p className="text-danger">Failed to fetch character details.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
