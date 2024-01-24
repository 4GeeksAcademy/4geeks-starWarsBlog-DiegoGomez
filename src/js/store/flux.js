import { createContext } from "react";

const StoreContext = createContext(null);

const getState = ({ setStore }) => {
  return {
    store: {
      character: null,
    },
    actions: {
      fetchCharacter: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/people/1");
          const data = await response.json();

          console.log("Data from API:", data);

          if (data && data.result && data.result.properties) {
            setStore((prevState) => ({
              ...prevState,
              character: {
                name: data.result.properties.name,
                height: data.result.properties.height,
                mass: data.result.properties.mass,
              },
            }));
          }
        } catch (error) {
          console.error("Error fetching character:", error);
        }
      },
    },
  };
};

export { StoreContext, getState as default };