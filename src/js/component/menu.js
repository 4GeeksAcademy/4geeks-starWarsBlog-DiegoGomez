import React from "react";

export const Menu = () => {
  return (
    <div className="p-5 mt-4 text-warning">
      <h1>Menu</h1>
      <a
        href="/characters"
        className="d-block text-decoration-none text-dark mb-2 text-white"
      >
        Characters
      </a>
      <a
        href="/vehicles"
        className="d-block text-decoration-none text-dark mb-2 text-white"
      >
        Vehicles
      </a>
      <a
        href="/planets"
        className="d-block text-decoration-none text-dark mb-2 text-white"
      >
        Planets
      </a>
    </div>
  );
};
