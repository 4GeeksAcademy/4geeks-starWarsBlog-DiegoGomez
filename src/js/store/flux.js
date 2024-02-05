import { createContext } from "react";

// Crear el contexto de la tienda
const StoreContext = createContext(null);

// Función para obtener el estado y las acciones
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: [], // Almacena la lista de personajes
      vehicles: [], // Almacena la lista de vehículos
      planets: [], // Almacena la lista de planetas
      characterDetails: {}, // Almacena los detalles de cada personaje por su ID
      planetDetails: {}, // Almacena los detalles de cada planeta por su ID
      vehicleDetails: {}, // Almacena los detalles de cada vehículo por su ID
      favoriteCharacters: [], // Almacena los IDs de los personajes favoritos
      favoritePlanets: [], // Almacena los IDs de los planetas favoritos
      favoriteVehicles: [], // Almacena los IDs de los vehículos favoritos
    },
    actions: {
      // Función para recuperar la lista de personajes
      fetchCharacters: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/people/");
          if (!response.ok) {
            throw new Error("Error al recuperar los personajes");
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
          const store = getStore();
          const charactersDetails = store.characterDetails;
          // Iterar sobre todos los IDs de personajes para obtener los detalles de cada uno
          await Promise.all(
            characterIds.map(async (characterId) => {
              // Este endpoint recibe el ID del personaje como parámetro
              const response = await fetch(
                `https://www.swapi.tech/api/people/${characterId}/`
              );
              // Si la respuesta no es correcta, lanzar un error para que se pueda capturar en el bloque catch de la función
              if (!response.ok) {
                throw new Error(
                  `Error al recuperar los detalles del personaje con ID ${characterId}`
                );
              }
              const data = await response.json();
              // Almacenar los detalles del personaje en el objeto characterDetails usando su ID como clave
              charactersDetails[characterId] = data.result.properties;
            })
          );
          // Actualizar el estado con los detalles de los personajes
          setStore({ charactersDetails });
        } catch (error) {
          console.error(
            "Error al recuperar los detalles de los personajes:",
            error
          );
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
      // Función para obtener los detalles de todos los vehículos
      fetchVehicleDetails: async (vehicleIds) => {
        try {
          const store = getStore();
          const vehiclesDetails = store.vehicleDetails;
          await Promise.all(
            vehicleIds.map(async (vehicleId) => {
              const response = await fetch(
                `https://www.swapi.tech/api/vehicles/${vehicleId}/`
              );
              if (!response.ok) {
                throw new Error(
                  `Error al recuperar los detalles del vehículo con ID ${vehicleId}`
                );
              }
              const data = await response.json();
              // Almacenar los detalles del vehículo en el objeto vehicleDetails usando su ID como clave
              vehiclesDetails[vehicleId] = data.result.properties;
            })
          );
          // Actualizar el estado con los detalles de los vehículos
          setStore({ vehiclesDetails });
        } catch (error) {
          console.error(
            "Error al recuperar los detalles de los vehículos:",
            error
          );
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
      // Función para obtener los detalles de un planeta específico
      fetchPlanetDetails: async (planetIds) => {
        try {
          const store = getStore();
          const planetsDetails = store.planetDetails;
          // Iterar sobre todos los IDs de planetas para obtener los detalles de cada uno
          await Promise.all(
            planetIds.map(async (planetId) => {
              // Este endpoint recibe el ID del planeta como parámetro
              const response = await fetch(
                `https://www.swapi.tech/api/planets/${planetId}/`
              );
              // Si la respuesta no es correcta, lanzar un error para que se pueda capturar en el bloque catch de la función
              if (!response.ok) {
                throw new Error(
                  `Error al recuperar los detalles del planeta con ID ${planetId}`
                );
              }
              const data = await response.json();
              // Almacenar los detalles del planeta en el objeto planetDetails usando su ID como clave
              planetsDetails[planetId] = data.result.properties;
            })
          );
          // Actualizar el estado con los detalles de los planetas
          setStore({ planetsDetails });
        } catch (error) {
          console.error(
            "Error al recuperar los detalles de los planetas:",
            error
          );
        }
      },
      // Función para alternar el estado de favorito para un personaje
      toggleFavoriteCharacter: (characterId) => {
        const store = getStore();
        const favoriteIndex = store.favoriteCharacters.indexOf(characterId);
        if (favoriteIndex === -1) {
          setStore({
            ...store,
            favoriteCharacters: [...store.favoriteCharacters, characterId],
          });
        } else {
          setStore({
            ...store,
            favoriteCharacters: store.favoriteCharacters.filter(
              (id) => id !== characterId
            ),
          });
        }
      },
      // Función para alternar el estado de favorito para un planeta
      toggleFavoritePlanet: (planetId) => {
        const store = getStore();
        const favoriteIndex = store.favoritePlanets.indexOf(planetId);
        if (favoriteIndex === -1) {
          setStore({
            ...store,
            favoritePlanets: [...store.favoritePlanets, planetId],
          });
        } else {
          setStore({
            ...store,
            favoritePlanets: store.favoritePlanets.filter(
              (id) => id !== planetId
            ),
          });
        }
      },
      // Función para alternar el estado de favorito para un vehículo
      toggleFavoriteVehicle: (vehicleId) => {
        const store = getStore();
        const favoriteIndex = store.favoriteVehicles.indexOf(vehicleId);
        if (favoriteIndex === -1) {
          setStore({
            ...store,
            favoriteVehicles: [...store.favoriteVehicles, vehicleId],
          });
        } else {
          setStore({
            ...store,
            favoriteVehicles: store.favoriteVehicles.filter(
              (id) => id !== vehicleId
            ),
          });
        }
      },
    },
  };
};

export { StoreContext, getState as default };
