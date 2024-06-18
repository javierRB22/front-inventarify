import { useState } from "react";
import axios from "axios";

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState(null);

  function register() {
    console.log(name, email, password);
    axios.post("http://localhost:3001/api/register", {
      email,
      name,
      password,
    }).then((response) => {
      console.log(response);
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
      }
    });
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-xl p-10">
          <form>
            <div className="flex items-center mb-6">
              <h1 className="text-3xl font-extrabold text-center w-full text-gray-800">CREA TU CUENTA</h1>
            </div>
            <div className="mb-6">
              <p className="text-center text-green-500 text-lg">{registerStatus}</p>
            </div>
            <div className="mb-6">
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Ingrese su nombre"
                onChange={(e) => { setName(e.target.value) }} required
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                onChange={(e) => { setEmail(e.target.value) }} placeholder="Ingrese su Email" required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                onChange={(e) => { setPassword(e.target.value) }} placeholder="Ingrese su contraseña" required
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
    </>
  );
};

export default SignUp;
