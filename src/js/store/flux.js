import { createContext } from "react";

const StoreContext = createContext(null);

const getState = ({ setStore }) => {
  return {
    store: {
      characters: [],
    },
	  actions: {
		//Fetch para los detalles de los personajes
      fetchCharacter: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/people/1");
          const data = await response.json();

          console.log("API Fetch:", data);

          setStore({ character: data.properties || {} });
        } catch (error) {
          console.error("Error fetching character:", error);
        }
		  },
		  //Fetch para nombres de los personajes y sus id
      fetchCharacters: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/people/");
          const data = await response.json();

          console.log("API Fetch for characters:", data);

          setStore({ characters: data.results || [] });
        } catch (error) {
          console.error("Error fetching characters:", error);
        }
      },
    },
  };
};

export { StoreContext, getState as default };
