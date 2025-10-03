import React from "react";

const Menu: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-6">
        <li><a href="#" className="hover:underline">Inicio</a></li>
        <li><a href="#" className="hover:underline">Formulario</a></li>
        <li><a href="#" className="hover:underline">Acerca de</a></li>
      </ul>
    </nav>
  );
};

export default Menu;
