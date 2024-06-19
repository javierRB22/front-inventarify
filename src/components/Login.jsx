// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/login", {
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
      if (response.data.message) {
        // Cuando hay un mensaje de error
        setLoginStatus(response.data.message);
        Swal.fire({
          title: 'Error al iniciar sesión',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        // Cuando el inicio de sesión es exitoso
        setLoginStatus(response.data[0].email);
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido/a ' + response.data[0].email,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/dashboard');
        });
      }
    }).catch(() => {
      // Error general al intentar iniciar sesión
      setLoginStatus("Error al iniciar sesión. Por favor, intenta nuevamente.");
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al intentar iniciar sesión. Por favor, intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  };

  useEffect(() => {
    localStorage.setItem('email', loginStatus);
  }, [loginStatus]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-grey-100">
      <div className="w-full md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-xl p-10">
        <form>
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-extrabold text-center w-full text-gray-800">INGRESA CON TU CUENTA</h1>
            <h2 className="text-red-500 text-lg text-center mt-2">{loginStatus}</h2>
          </div>
          <div className="mb-6">
            <input
              type="email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Digita tu correo"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }} required
            />
          </div>
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Digita tu contraseña"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }} required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-1.4-3.6a9.005 9.005 0 00-1.584-.633m-3.832 0a9.005 9.005 0 00-1.584.633m7.68 4.773A9.009 9.009 0 0112 20.5a9.009 9.009 0 01-7.68-4.773M15.6 12.4a9.005 9.005 0 00-1.584-.633m-3.832 0a9.005 9.005 0 00-1.584.633M8.4 3.6A9.009 9.009 0 0112 3.5c1.959 0 3.799.659 5.313 1.775M8.4 3.6A9.009 9.009 0 013.5 12a9.009 9.009 0 004.9 8.4" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.5C16.418 4.5 20 6.814 20 12s-3.582 7.5-8 7.5-8-3.314-8-7.5S7.582 4.5 12 4.5zM12 8.5a3.5 3.5 0 00-3.5 3.5 3.5 3.5 0 003.5 3.5 3.5 3.5 0 003.5-3.5A3.5 3.5 0 0012 8.5z" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input className="mr-2" type="checkbox" value="" />
              <label className="text-gray-700 text-lg">Recordar</label>
            </div>
            <a href="#" className="text-blue-500 hover:text-blue-700 text-lg">Olvidaste tu contraseña?</a>
          </div>
          <div className="text-center mt-4 pt-2">
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg" onClick={login}>
              Iniciar sesión
            </button>
            <p className="text-lg font-bold mt-4 mb-0">No tienes una cuenta aun? <a href="SignUp" className="text-green-500 hover:text-green-700">Registrate</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
