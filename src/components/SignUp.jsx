// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import backgroundImg from '../assets/imagenes/signUp.svg'


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const register = () => {
    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email inválido");
      return;
    }

    if (!validatePassword(password)) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setError(null);

    axios.post("http://localhost:3001/api/register", {
      email,
      name,
      password,
    }).then((response) => {
      if (response.data.message) {
        setError(response.data.message);
      } else {
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Su cuenta ha sido creada con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          setEmail("");
          setName("");
          setPassword("");
          window.location.reload();
        });
      }
    }).catch(() => {
      setError("Error al crear la cuenta");
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-screen bg-grey-200">
      <div className="flex w-full h-full">
        <div className="w-3/5 h-full">

          <img src={backgroundImg} alt="Background" className="object-cover w-full" />
        </div>
        <div className="w-2/5 h-full bg-white rounded-l-lg shadow-xl p-10 flex items-center justify-center">
          <form className="w-full">
            <div className="flex items-center mb-6">
              <h1 className="text-3xl font-extrabold text-center w-full text-gray-800">CREA TU CUENTA</h1>
            </div>
            {error && (
              <div className="mb-6">
                <p className="text-center text-red-500 text-lg">{error}</p>
              </div>
            )}
            <div className="mb-6">
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Ingrese su nombre"
                value={name}
                onChange={(e) => { setName(e.target.value) }} required
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Ingrese su Email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }} required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }} required
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input className="mr-2" type="checkbox" value="" />
                <label className="text-gray-700 text-lg">Recordar</label>
              </div>
              <a href="#" className="text-blue-500 hover:text-blue-700 text-lg">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="text-center mt-4 pt-2">
              <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg" onClick={register}>
                REGISTRARSE
              </button>
              <p className="text-lg font-bold mt-4 mb-0">Ingrese a su cuenta <a href="/" className="text-green-500 hover:text-green-700">Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
