import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="p-5 bg-green-200 fixed top-0 left-0 h-full w-64 shadow-xl">
        <h1 className="font-bold uppercase font-sans text-gray-800 text-2xl mb-8 text-center">INVENTARIFY</h1>
        <nav className="space-y-6 flex flex-col items-center">
          <NavLink
            to="./Product"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Productos
          </NavLink>
          <NavLink
            to="./Category"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Categorias
          </NavLink>
          <NavLink
            to="./Clientes"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Clientes
          </NavLink>
          <NavLink
            to="./Proveedores"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Proveedores
          </NavLink>
          <NavLink
            to="./Departamentos"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Departamentos
          </NavLink>
          <NavLink
            to="./Ventas"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Ventas
          </NavLink>
          <NavLink
            to="./Facturas"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Factura
          </NavLink>
        </nav>
        
        <div className="absolute bottom-10 left-0 w-full">
          <button 
            onClick={() => window.location.href = '/'}
            className="block w-full text-center text-red-600 hover:text-red-800 transition-colors text-lg font-semibold focus:outline-none"
          >
            Salir
          </button>
        </div>
      </div>

      <div id="detail" className="ml-64 p-10 w-full min-h-screen bg-gray-100">
        <Outlet />
      </div>
    </>
  );
}
