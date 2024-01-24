import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const Character = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchCharacter();
  }, [actions]);

  console.log("Character:", store.character);

  return (
    <div className="text-white">
      <h1 className="">Star Wars Character</h1>
      {store.character && (
        <div className="text-white">
          <h2 className="text-white">{store.character.name}</h2>
          <p className="text-white">Height: {store.character.height}</p>
          <p className="text-white">Mass: {store.character.mass}</p>
        </div>
      )}
    </div>
  );
};

export default Character;