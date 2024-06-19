import { NavLink, useNavigate } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom"; // Importamos useLocation para obtener la ruta actual
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function Root() {
  const location = useLocation(); // Obtenemos la ruta actual
  const navigate =useNavigate();
  useEffect(() => {
    const email= localStorage.getItem('email');
    if(!email){
      navigate("/")
    }
    // Añadimos overflow-hidden al body para evitar scroll horizontal
    document.body.style.overflowX = "hidden";
    return () => {
      // Limpiamos el estilo al desmontar el componente
      document.body.style.overflowX = "auto";
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres salir de la aplicación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
        localStorage.removeItem("email");
      }
    });
  };

  return (
    <>
      <div className="bg-black fixed top-0 left-0 h-full w-64 shadow-xl">
        <h1 className="font-bold uppercase text-green-600 text-2xl mt-8 mb-4 text-center">
          INVENTARIFY
        </h1>
        <nav className="space-y-2">
          <NavLink
            to="./Product"
            className={`block py-3 px-4   hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${location.pathname.includes('/Product') ? 'text-white bg-green-600' : 'text-green-600'}`}
          >
            Productos
          </NavLink>
          <NavLink
            to="./Category"
            className={`block py-3 px-4   hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${location.pathname.includes('/Category') ? 'text-white bg-green-600' : 'text-green-600'}`}
          >
            Categorías
          </NavLink>
          <NavLink
            to="./Clientes"
            className={`block py-3 px-4   hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${location.pathname.includes('/Clientes') ? 'text-white bg-green-600' : 'text-green-600'}`}
          >
            Clientes
          </NavLink>
          <NavLink
            to="./Proveedores"
            className={`block py-3 px-4   hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${location.pathname.includes('/Proveedores') ? 'text-white bg-green-600' : 'text-green-600'}`}
          >
            Proveedores
          </NavLink>
          <NavLink
            to="./Departamentos"
            className={`block py-3 px-4   hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${location.pathname.includes('/Departamentos') ? 'text-white bg-green-600' : 'text-green-600'}`}
          >
            Departamentos
          </NavLink>
          <NavLink
            to="./Ventas"
            className={`block py-3 px-4   hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${location.pathname.includes('/Ventas') ? 'text-white bg-green-600' : 'text-green-600'}`}
          >
            Ventas
          </NavLink>
          <NavLink
            to="./Facturas"
            className={`block py-3 px-4   hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${location.pathname.includes('/Facturas') ? 'text-white bg-green-600' : 'text-green-600'}`}
          >
            Facturas
          </NavLink>
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 text-center text-white bg-red-600 hover:bg-red-800 transition-colors text-lg font-semibold rounded shadow-lg focus:outline-none"
          >
            Salir
          </button>
        </div>
      </div>

      <div id="detail" className="ml-64 p-2 overflow-auto h-screen">
        <Outlet />
      </div>
    </>
  );
}
