// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getDepartamentos, createDepartamento, updateDepartamento, deleteDepartamento } from '../services/ServicioDepartamento';

const ListaDepartamento = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [newDepartamento, setNewDepartamento] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    loadDepartamentos();
  }, []);

  const loadDepartamentos = async () => {
    const data = await getDepartamentos();
    setDepartamentos(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDepartamento({ ...newDepartamento, [name]: value });
  };

  const handleCreate = async () => {
    await createDepartamento(newDepartamento);
    loadDepartamentos();
    setNewDepartamento({ nombre: '', descripcion: '' });
  };

  const handleUpdate = async (id) => {
    const departamento = departamentos.find(dep => dep.id === id);
    await updateDepartamento(id, departamento);
    loadDepartamentos();
  };

  const handleDelete = async (id) => {
    await deleteDepartamento(id);
    loadDepartamentos();
  };

  const handleDepartamentoChange = (id, field, value) => {
    const updatedDepartamentos = departamentos.map(dep => 
      dep.id === id ? { ...dep, [field]: value } : dep
    );
    setDepartamentos(updatedDepartamentos);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-x-hidden animate-fade-in-left">
      <h2 className="text-3xl font-bold text-center mb-8">Departamentos</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newDepartamento.nombre}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={newDepartamento.descripcion}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button 
          onClick={handleCreate} 
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Añadir Departamento
        </button>
      </div>
      <ul className="space-y-4">
        {departamentos.map(departamento => (
          <li key={departamento.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <input
              type="text"
              value={departamento.nombre}
              onChange={(e) => handleDepartamentoChange(departamento.id, 'nombre', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={departamento.descripcion}
              onChange={(e) => handleDepartamentoChange(departamento.id, 'descripcion', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
              <button 
                onClick={() => handleUpdate(departamento.id)} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(departamento.id)} 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDepartamento;
