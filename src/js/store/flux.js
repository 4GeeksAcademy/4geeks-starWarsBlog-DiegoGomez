// Flux.js
import { createContext } from "react";

const StoreContext = createContext(null);

const getState = ({ setStore }) => {
  return {
    store: {
      // Nombres
      characters: [],
      vehicles: [],
      planets: [],
      // Detalles
      characterDetails: {} // Store character details for each character separately
    },
    actions: {
      // Fetch para nombres de los personajes y sus id
      fetchCharacters: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/people/");
          const data = await response.json();

          setStore({ characters: data.results || [] });
        } catch (error) {
          console.error("Error fetching characters:", error);
        }
      },
      // Fetch para los detalles de un personaje específico
      fetchCharacter: async (characterId) => {
        try {
          const response = await fetch(`https://www.swapi.tech/api/people/${characterId}/`);
          if (!response.ok) {
            throw new Error("Failed to fetch character details");
          }
          const data = await response.json();

          console.log("API Fetch for character:", data);

          // Set character details for the specific character ID
          setStore(prevState => ({
            characterDetails: {
              ...prevState.characterDetails,
              [characterId]: data.result.properties || {}
            }
          }));
        } catch (error) {
          console.error(`Error fetching character with ID ${characterId}:`, error);
        }
      },
      fetchVehicles: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/vehicles/");
          const data = await response.json();

          setStore({ vehicles: data.results || [] });
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      },
      fetchPlanets: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/planets/");
          const data = await response.json();


          setStore({ planets: data.results || [] });
        } catch (error) {
          console.error("Error fetching planets:", error);
        }
      },
    },
    }
  };

export { StoreContext, getState as default };
