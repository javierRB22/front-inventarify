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
    <div>
      <h2>Departamentos</h2>
      <div>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newDepartamento.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={newDepartamento.descripcion}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Añadir Departamento</button>
      </div>
      <ul>
        {departamentos.map(departamento => (
          <li key={departamento.id}>
            <input
              type="text"
              value={departamento.nombre}
              onChange={(e) => handleDepartamentoChange(departamento.id, 'nombre', e.target.value)}
            />
            <input
              type="text"
              value={departamento.descripcion}
              onChange={( e) => handleDepartamentoChange(departamento.id, 'descripcion', e.target.value)}
            />
            <button onClick={() => handleUpdate(departamento.id)}>Editar</button>
            <button onClick={() => handleDelete(departamento.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDepartamento;
