import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
// Este import es funcional después de instalar react-bootstrap
import Modal from "react-bootstrap/Modal";

const Characters = () => {
  const { store, actions } = useContext(Context);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    // Obtener los personajes si el tamaño de la lista de personajes es 0
    if (store.characters.length === 0) {
      actions.fetchCharacters();
    }
  }, [actions, store.characters]);

  useEffect(() => {
    // Obtener los detalles de todos los personajes si el tamaño de la lista de personajes es mayor que 0
    if (store.characters.length > 0) {
      // Obtener los IDs de todos los personajes
      const characterIds = store.characters.map((character) => character.uid);
      // Llamar a la función para obtener los detalles de los personajes usando sus IDs
      actions.fetchCharactersDetails(characterIds);
    }
  }, [actions, store.characters]);

  // Alternar el estado favorito para un personaje
  const handleToggleFavorite = (characterId) => {
    actions.toggleFavoriteCharacter(characterId);
  };

  // Para mostrar el personaje, se guarda su ID en el estado selectedCharacter
  const handleShowDetails = (characterId) => {
    setSelectedCharacter(characterId);
  };

  // Para cerrar el modal, se pone el estado selectedCharacter a null
  const handleCloseDetails = () => {
    setSelectedCharacter(null);
  };

  // Función para obtener la URL de la imagen del personaje
  const getCharacterImageUrl = (characterId) => {
    return `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
  };

  return (
    <div className="p-5 mt-5">
      <h1 className="text-center mb-4 text-white">Characters</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {store.characters.map((character) => (
          <div key={character.uid} className="col">
            <div className="card">
              <img
                src={getCharacterImageUrl(character.uid)}
                className="card-img-top w-50 rounded mx-auto d-block"
                alt={character.name}
              />
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
                      <button
                        className="border border-0 bg-transparent"
                        onClick={() => handleToggleFavorite(character.uid)}
                      >
                        <i
                          className={`fa-regular fs-1 ${
                            store.favoriteCharacters.includes(character.uid)
                              ? "fa-solid fa-heart text-danger"
                              : "fa-heart"
                          }`}
                        ></i>
                      </button>
                      <button
                        className="border border-0 bg-transparent"
                        onClick={() => handleShowDetails(character.uid)}
                      >
                        <i className="fa-solid fa-circle-info fs-1 ms-3 text-info"></i>
                      </button>
                    </div>
                  </div>
                )}
                {/* Mostrar mensaje de carga si se están recuperando los detalles del personaje */}
                {!store.characterDetails[character.uid] && (
                  <p className="text-muted">Loading...</p>
                )}
                {/* Mostrar mensaje de error si falla la recuperación de los detalles del personaje */}
                {store.characterDetails[character.uid] === false && (
                  <p className="text-danger">Error fetching data.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal, se muestra si detecta que se ha hecho click en algún personaje (
      se ha seleccionado un personaje).
      ) */}
      <Modal show={selectedCharacter !== null} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Character Details</Modal.Title>
        </Modal.Header>
        {/* Accedo a los detalles del personaje que ha sido seleccionado, y en cada p escojo que campo
          mostrar */}
        <Modal.Body>
          {selectedCharacter !== null &&
            store.characterDetails[selectedCharacter] && (
              <div>
                <p className="fw-bold">
                  Name: {store.characterDetails[selectedCharacter].name}
                </p>
                <p className="fw-bold">
                  Birth Year:{" "}
                  {store.characterDetails[selectedCharacter].birth_year}
                </p>
                <p className="fw-bold">
                  Height: {store.characterDetails[selectedCharacter].height}
                </p>
                <p className="fw-bold">
                  Homeworld:{" "}
                  {store.characterDetails[selectedCharacter].homeworld}
                </p>
                <p className="fw-bold">
                  Skin Color:{" "}
                  {store.characterDetails[selectedCharacter].skin_color}
                </p>
              </div>
            )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Characters;
