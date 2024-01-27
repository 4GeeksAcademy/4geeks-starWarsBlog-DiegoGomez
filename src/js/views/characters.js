import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Characters = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Obtener los personajes si el length de la lista de personajes es 0
    if (store.characters.length === 0) {
      actions.fetchCharacters();
    }
  }, [actions, store.characters]);

  useEffect(() => {
    // Obtener los detalles de todos los personajes si el length de la lista de personajes es mayor que 0
    if (store.characters.length > 0) {
      // Obtener los IDs de todos los personajes
      const characterIds = store.characters.map((character) => character.uid);
      // Llamar a la función para obtener los detalles de los personajes usando sus IDs
      actions.fetchCharactersDetails(characterIds);
    }
  }, [actions, store.characters]);

  const handleToggleFavorite = (characterId) => {
    actions.toggleFavorite(store, characterId);
  };

  return (
    <div className="p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Characters</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {store.characters.map((character) => (
          <div key={character.uid} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary display-6 fw-bold">
                  {character.name}
                </h5>
                {/* Comprobar si existen los detalles del personaje antes de mostrarlos */}
                {store.characterDetails[character.uid] && (
                  <div>
                    <p className="card-text fw-bold">
                      Gender: {store.characterDetails[character.uid].gender}
                    </p>
                    <p className="card-text fw-bold">
                      Hair color:{" "}
                      {store.characterDetails[character.uid].hair_color}
                    </p>
                    <p className="card-text fw-bold">
                      Eye color:{" "}
                      {store.characterDetails[character.uid].eye_color}
                    </p>
                    <div className="d-flex">
                      <button className="border border-0 bg-transparent"
                        onClick={() => handleToggleFavorite(character.uid)}
                      >
                        <i className="fa-regular fa-heart fs-1"></i>
                      </button>
                      <i className="fa-solid fa-circle-info fs-1 ms-3 text-info"></i>
                    </div>
                  </div>
                )}
                {/* Mostrar mensaje de carga si se están recuperando los detalles del personaje */}
                {!store.characterDetails[character.uid] && (
                  <p className="text-muted">Loading...</p>
                )}
                {/* Mostrar mensaje de error si falla la recuperación de los detalles del personaje */}
                {store.characterDetails[character.uid] === false && (
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

export default Characters;
