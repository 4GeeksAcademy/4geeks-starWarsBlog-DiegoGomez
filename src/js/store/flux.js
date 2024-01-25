// Flux.js
import { createContext } from "react";

const StoreContext = createContext(null);

const getState = ({ setStore }) => {
  return {
    store: {
      characters: [],
      vehicles: [],
      planets: [],
      characterDetails: {}, // Store character details for each character separately
    },
    actions: {
      fetchCharacters: async (retryCount = 0) => {
        try {
          const response = await fetch("https://www.swapi.tech/api/people/");
          if (!response.ok) {
            if (response.status === 429) {
              // Retry after a delay
              const delay = 5000; // 5 seconds delay (you can adjust as needed)
              await new Promise((resolve) => setTimeout(resolve, delay));
              if (retryCount < 3) {
                // Retry up to 3 times
                return actions.fetchCharacters(retryCount + 1);
              } else {
                throw new Error("Maximum retry limit reached");
              }
            } else {
              throw new Error("Failed to fetch characters");
            }
          }
          const data = await response.json();
          setStore({ characters: data.results || [] });
        } catch (error) {
          console.error("Error fetching characters:", error);
          // Retry or handle the error as needed
        }
      },

      fetchCharacter: async (characterId) => {
        try {
          const response = await fetch(
            `https://www.swapi.tech/api/people/${characterId}/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch character details");
          }
          const data = await response.json();
          console.log("API Fetch for character:", data);
          // Access the store via setStore
          const { store } = getState({ setStore });
          setStore({
            characterDetails: {
              ...store.characterDetails,
              [characterId]: data.result.properties,
            },
          });
        } catch (error) {
          console.error(
            `Error fetching character with ID ${characterId}:`,
            error
          );
        }
      },

      fetchVehicles: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/vehicles/");
          if (!response.ok) {
            throw new Error("Failed to fetch vehicles");
          }
          const data = await response.json();
          setStore({ vehicles: data.results || [] });
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      },
      fetchPlanets: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/planets/");
          if (!response.ok) {
            throw new Error("Failed to fetch planets");
          }
          const data = await response.json();
          setStore({ planets: data.results || [] });
        } catch (error) {
          console.error("Error fetching planets:", error);
        }
      },
    },
  };
};

export { StoreContext, getState as default };
