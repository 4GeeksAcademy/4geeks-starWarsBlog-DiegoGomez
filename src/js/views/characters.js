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
      const characterIds = store.characters.map(character => character.uid);
      // Llamar a la función para obtener los detalles de los personajes usando sus IDs
      actions.fetchCharactersDetails(characterIds);
    }
  }, [actions, store.characters]);

  return (
    <div className="p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Personajes de Star Wars</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {store.characters.map((character) => (
          <div key={character.uid} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                {/* Comprobar si existen los detalles del personaje antes de mostrarlos */}
                {store.characterDetails[character.uid] && (
                  <>
                    <p className="card-text">Género: {store.characterDetails[character.uid].gender}</p>
                    <p className="card-text">Color de pelo: {store.characterDetails[character.uid].hair_color}</p>
                    <p className="card-text">Color de ojos: {store.characterDetails[character.uid].eye_color}</p>
                  </>
                )}
                {/* Mostrar mensaje de carga si se están recuperando los detalles del personaje */}
                {!store.characterDetails[character.uid] && (
                  <p className="text-muted">Loading...</p>
                )}
                {/* Mostrar mensaje de error si falla la recuperación de los detalles del personaje */}
                {store.characterDetails[character.uid] === false && (
                  <p className="text-danger">Loading.</p>
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
