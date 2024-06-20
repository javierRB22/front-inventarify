import { NavLink, useNavigate } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import backgroundImg from "../assets/imagenes/MISION.jpg";
import backgroundVision from "../assets/imagenes/vision.png";

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/");
    }
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, [navigate]);

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
        <NavLink to="/dashboard">
          <h1 className="font-bold uppercase text-green-600 text-2xl mt-8 mb-4 text-center cursor-pointer">
            INVENTARIFY
          </h1>
        </NavLink>
        <nav className="space-y-2">
          <NavLink
            to="./Product"
            className={`block py-3 px-4 hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${
              location.pathname.includes("/Product")
                ? "text-white bg-green-600"
                : "text-green-600"
            }`}
          >
            Productos
          </NavLink>
          <NavLink
            to="./Category"
            className={`block py-3 px-4 hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${
              location.pathname.includes("/Category")
                ? "text-white bg-green-600"
                : "text-green-600"
            }`}
          >
            Categorías
          </NavLink>
          <NavLink
            to="./Clientes"
            className={`block py-3 px-4 hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${
              location.pathname.includes("/Clientes")
                ? "text-white bg-green-600"
                : "text-green-600"
            }`}
          >
            Clientes
          </NavLink>
          <NavLink
            to="./Proveedores"
            className={`block py-3 px-4 hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${
              location.pathname.includes("/Proveedores")
                ? "text-white bg-green-600"
                : "text-green-600"
            }`}
          >
            Proveedores
          </NavLink>
          <NavLink
            to="./Departamentos"
            className={`block py-3 px-4 hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${
              location.pathname.includes("/Departamentos")
                ? "text-white bg-green-600"
                : "text-green-600"
            }`}
          >
            Departamentos
          </NavLink>
          <NavLink
            to="./Ventas"
            className={`block py-3 px-4 hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${
              location.pathname.includes("/Ventas")
                ? "text-white bg-green-600"
                : "text-green-600"
            }`}
          >
            Ventas
          </NavLink>
          <NavLink
            to="./Facturas"
            className={`block py-3 px-4 hover:text-white hover:bg-green-600 transition-colors text-lg font-semibold rounded ${
              location.pathname.includes("/Facturas")
                ? "text-white bg-green-600"
                : "text-green-600"
            }`}
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

      <div
        id="detail"
        className={`ml-64 p-2 ${
          location.pathname === "/dashboard"
            ? "overflow-y-auto"
            : "overflow-hidden"
        } h-screen relative`}
      >
        {location.pathname === "/dashboard" && (
          <>
            <div className="flex flex-col min-h-screen animate-fade-in-left">
              <header className="bg-black text-white py-8 text-center">
                <h1 className="font-bold uppercase text-green-600 text-4xl mt-8 mb-4 text-center cursor-pointer">
                  BIENVENIDOS A INVENTARIFY
                </h1>
              </header>
              <main className="flex-grow container mx-auto px-4 py-8">
                <section className="my-8">
                  <h2 className="text-3xl font-bold mb-4 text-green-600">¿Quiénes Somos?</h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Bienvenido a Inventarify, el revolucionario sistema de
                    gestión de inventarios y control de ventas diseñado para
                    elevar el potencial de las tiendas de barrio. En un mercado
                    competitivo y en constante evolución, reconocemos la
                    importancia de brindar a los pequeños y medianos
                    comerciantes una herramienta poderosa y fácil de usar que
                    les permita optimizar sus operaciones y maximizar sus
                    beneficios. Con Inventarify, podrás mantener un control
                    preciso de tus existencias en tiempo real, agilizar el
                    proceso de ventas y acceder a valiosos análisis de datos
                    para tomar decisiones informadas. Nuestro compromiso es
                    empoderarte con una solución integral que impulse el
                    crecimiento de tu negocio y fortalezca tu presencia en el
                    mercado. En el corazón de Inventarify se encuentra una
                    interfaz intuitiva que se adapta a tus necesidades y que no
                    requiere de conocimientos avanzados. Nos enorgullece ofrecer
                    una experiencia de usuario excepcional, donde la facilidad
                    de uso y la eficiencia se unen para brindarte la confianza
                    necesaria para enfrentar los retos del mundo comercial
                    actual. Prepárate para llevar tu negocio a nuevas alturas
                    con Inventarify, donde la innovación y el éxito se
                    entrelazan para crear el futuro de la gestión de inventarios
                    y ventas en las tiendas del barrio.
                  </p>
                </section>
                <section className="my-8">
                  <h2 className="text-3xl font-bold mb-4 text-green-600">Valores</h2>
                  <ul className="list-none pl-0">
                    {[
                      "Innovación y Tecnología",
                      "Facilidad de Uso",
                      "Eficiencia Operacional",
                      "Soporte y Formación Continua",
                    ].map((title, index) => (
                      <li key={index} className="mb-2">
                        <button
                          className="w-full text-left py-2 px-4 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring flex items-center justify-between"
                          onClick={() =>
                            document
                              .getElementById(`valor${index}`)
                              .classList.toggle("hidden")
                          }
                        >
                          <span>{title}</span>
                          <svg
                            className="w-6 h-6 transform transition-transform duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <div
                          id={`valor${index}`}
                          className="hidden pl-4 pr-8 pt-2 pb-4 bg-gray-100"
                        >
                          <p className="text-lg text-gray-700">
                            {index === 0 &&
                              "Aprovechamos la tecnología de vanguardia para ofrecer herramientas avanzadas que transforman la gestión de inventarios y ventas en tiendas de barrio, permitiendo un control preciso y en tiempo real de las existencias."}
                            {index === 1 &&
                              "Diseñamos una interfaz intuitiva que no requiere conocimientos avanzados, garantizando una experiencia de usuario excepcional y accesible para todos los comerciantes, independientemente de su nivel de experiencia tecnológica."}
                            {index === 2 &&
                              "Agilizamos el proceso de ventas y optimizamos las operaciones diarias, permitiendo a los comerciantes concentrarse en el crecimiento de su negocio y la maximización de beneficios, reduciendo el tiempo y esfuerzo dedicados a tareas administrativas."}
                            {index === 3 &&
                              "Nos comprometemos a ofrecer soporte constante y formación continua, asegurando que los usuarios aprovechen al máximo todas las características de nuestro sistema, fortaleciendo su capacidad para tomar decisiones informadas y enfrentar los retos del mercado actual."}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="my-8 space-y-8">
                  {[
                    {
                      src: backgroundImg,
                      title: "Misión",
                      description:
                        "Facilitar a los pequeños y medianos comerciantes las herramientas tecnológicas necesarias para optimizar la gestión de inventarios y ventas, ofreciendo una solución integral y fácil de usar que potencie la eficiencia operativa y promueva el crecimiento sostenible de sus negocios.",
                    },
                    {
                      src: backgroundVision,
                      title: "Visión",
                      description:
                        "Convertirnos en el socio estratégico preferido de los comercios de barrio, siendo reconocidos por nuestra capacidad de innovación en la gestión de inventarios y ventas, contribuyendo así al fortalecimiento y expansión de estos negocios en un mercado competitivo y en constante evolución.",
                    },
                  ].map((image, index) => (
                    <div
                      key={index}
                      className="relative w-full h-64 group overflow-hidden rounded-lg"
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-300 transform scale-100 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-100 rounded-lg">
                        <p className="text-white text-3xl mb-2 font-semibold text-center">
                          {image.title}
                        </p>
                        <p className="text-white text-lg text-center px-4">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </section>
              </main>
              <footer className="bg-black text-white text-center py-4">
                <p>&copy; 2024 Inventarify. Todos los derechos reservados.</p>
              </footer>
            </div>
          </>
        )}
        <Outlet />
      </div>
    </>
  );
};

export default Root;
