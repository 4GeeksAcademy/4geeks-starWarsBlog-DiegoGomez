// Flux.js
import { createContext } from "react";

const StoreContext = createContext(null);

const getState = ({ setStore }) => {
  return {
    store: {
      characters: [], // Almacena la lista de personajes
      vehicles: [], // Almacena la lista de vehículos
      planets: [], // Almacena la lista de planetas
      characterDetails: {}, // Almacena los detalles de cada personaje por su ID
    },
    actions: {
      // Función para recuperar la lista de personajes
      fetchCharacters: async (retryCount = 0) => {
        try {
          const response = await fetch("https://www.swapi.tech/api/people/");
          if (!response.ok) {
            if (response.status === 429) {
              // Si se recibe un código de estado 429 (demasiadas solicitudes), intentar nuevamente después de 5 segundos
              const delay = 5000;
              await new Promise((resolve) => setTimeout(resolve, delay));
              // El número máximo de reintentos es 3
              if (retryCount < 3) {
                // Reintentar la solicitud incrementando el contador de reintentos en 1 cada vez
                return actions.fetchCharacters(retryCount + 1);
              } else {
                throw new Error("Límite máximo de reintentos alcanzado");
              }
            } else {
              throw new Error("Error al recuperar los personajes");
            }
          }
          const data = await response.json();
          // Actualizar el estado con la lista de personajes obtenida
          setStore({ characters: data.results || [] });
        } catch (error) {
          console.error("Error al recuperar los personajes:", error);
        }
      },

      // Función para recuperar los detalles de todos los personajes
      fetchCharactersDetails: async (characterIds) => {
        try {
          const characterDetails = {};
          // Iterar sobre todos los IDs de personajes para obtener los detalles de cada uno
          await Promise.all(characterIds.map(async (characterId) => {
            //Este endpoint recibe el ID del personaje como parámetro
            const response = await fetch(`https://www.swapi.tech/api/people/${characterId}/`);
            // Si la respuesta no es correcta, lanzar un error para que se pueda capturar en el bloque catch de la función
            if (!response.ok) {
              throw new Error(`Error al recuperar los detalles del personaje con ID ${characterId}`);
            }
            const data = await response.json();
            // Almacenar los detalles del personaje en el objeto characterDetails usando su ID como clave
            characterDetails[characterId] = data.result.properties;
          }));
          // Actualizar el estado con los detalles de los personajes
          setStore({ characterDetails });
        } catch (error) {
          console.error("Error al recuperar los detalles de los personajes:", error);
        }
      },

      // Función para recuperar la lista de vehículos
      fetchVehicles: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/vehicles/");
          if (!response.ok) {
            throw new Error("Error al recuperar los vehículos");
          }
          const data = await response.json();
          // Actualizar el estado con la lista de vehículos obtenida
          setStore({ vehicles: data.results || [] });
        } catch (error) {
          console.error("Error al recuperar los vehículos:", error);
        }
      },
      
      // Función para recuperar la lista de planetas
      fetchPlanets: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/planets/");
          if (!response.ok) {
            throw new Error("Error al recuperar los planetas");
          }
          const data = await response.json();
          // Actualizar el estado con la lista de planetas obtenida
          setStore({ planets: data.results || [] });
        } catch (error) {
          console.error("Error al recuperar los planetas:", error);
        }
      },
    },
  };
};

export { StoreContext, getState as default };
