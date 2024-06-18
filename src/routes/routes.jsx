import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";

export default function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí deberías tener lógica para manejar la autenticación, por ejemplo, con un formulario de login y validación
    // Simulación de login exitoso
    setIsLoggedIn(true);
    navigate("/"); // Redirigir a la página de Productos u otra página después del login
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres salir de la aplicación?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoggedIn(false); 
        navigate("/"); 
      }
    });
  };

  if (!isLoggedIn) {
    
    return (
      <div className="flex justify-center items-center h-screen">
        <button onClick={handleLogin} className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg focus:outline-none">
          Iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-green-200 fixed top-0 left-0 h-full w-64 shadow-xl">
        <h1 className="font-bold uppercase text-gray-800 text-2xl mb-8 text-center">INVENTARIFY</h1>
        <nav className="space-y-6 flex flex-col items-center">
          <NavLink
            to="/Product"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Productos
          </NavLink>
          <NavLink
            to="/Category"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Categorías
          </NavLink>
          <NavLink
            to="/Clientes"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Clientes
          </NavLink>
          <NavLink
            to="/Proveedores"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Proveedores
          </NavLink>
          <NavLink
            to="/Departamentos"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Departamentos
          </NavLink>
          <NavLink
            to="/Ventas"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Ventas
          </NavLink>
          <NavLink
            to="/Facturas"
            className="block text-gray-800 hover:text-green-600 transition-colors text-lg font-semibold"
          >
            Facturas
          </NavLink>
        </nav>
        
        <div className="absolute bottom-4 left-0 w-60">
          <button 
            onClick={handleLogout}
            className="w-full py-2 text-center text-white bg-red-600 hover:bg-red-800 transition-colors text-lg font-semibold rounded-lg shadow-lg focus:outline-none"
          >
            Salir
          </button>
        </div>
      </div>

      <div id="detail" className="ml-64 p-10">
        <Outlet />
      </div>
    </>
  );
}
