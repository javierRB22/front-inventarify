// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getDepartamentos, createDepartamento, updateDepartamento, deleteDepartamento } from '../services/ServicioDepartamento';
import Swal from 'sweetalert2';

const ListaDepartamento = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [newDepartamento, setNewDepartamento] = useState({ nombre: '', descripcion: '' });
  const [editMode, setEditMode] = useState(null);

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
    // Validar campos obligatorios
    if (!newDepartamento.nombre || !newDepartamento.descripcion) {
      Swal.fire('Campos Requeridos', 'Por favor, completa todos los campos.', 'error');
      return;
    }

    confirmAction(
      '¿Estás seguro?',
      '¿Quieres añadir este departamento?',
      'Sí, añadir',
      createDepartamento
    );
  };

  const confirmAction = async (title, text, confirmButtonText, actionFunction, id = null) => {
    await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (id === null) {
          await actionFunction(newDepartamento);
          setNewDepartamento({ nombre: '', descripcion: '' });
          await loadDepartamentos(); // Actualiza la lista después de añadir
          Swal.fire(
            '¡Añadido!',
            'El departamento ha sido añadido.',
            'success'
          );
        } else {
          const departamento = departamentos.find(dep => dep.id === id);
          await actionFunction(id, departamento);
          loadDepartamentos();
          setEditMode(null);
          Swal.fire(
            '¡Realizado!',
            'El departamento ha sido modificado.',
            'success'
          );
        }
      }
    });
  };

  const handleUpdate = async (id) => {
    setEditMode(id);
  };

  const handleSave = async (id) => {
    confirmAction(
      '¿Estás seguro?',
      '¿Quieres guardar los cambios en este departamento?',
      'Sí, guardar',
      updateDepartamento,
      id
    );
  };

  const handleDelete = async (id) => {
    confirmAction(
      '¿Estás seguro?',
      '¿Quieres eliminar este departamento?',
      'Sí, eliminar',
      deleteDepartamento,
      id
    );
  };

  const handleDepartamentoChange = (id, field, value) => {
    const updatedDepartamentos = departamentos.map(dep =>
      dep.id === id ? { ...dep, [field]: value } : dep
    );
    setDepartamentos(updatedDepartamentos);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-x-hidden animate-fade-in-left">
      <h2 className="text-3xl font-bold text-center mb-8">DEPARTAMENTOS</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg w-full"
        >
          Añadir Departamento
        </button>
      </div>
      <ul className="space-y-4">
        {departamentos.map(departamento => (
          <li key={departamento.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {editMode !== departamento.id ? (
              <>
                <div className="flex-1">{departamento.nombre}</div>
                <div className="flex-1">{departamento.descripcion}</div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={departamento.nombre}
                  onChange={(e) => handleDepartamentoChange(departamento.id, 'nombre', e.target.value)}
                  className="p-2 w-full sm:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-2 sm:mb-0"
                />
                <input
                  type="text"
                  value={departamento.descripcion}
                  onChange={(e) => handleDepartamentoChange(departamento.id, 'descripcion', e.target.value)}
                  className="p-2 w-full sm:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-2 sm:mb-0"
                />
              </>
            )}
            <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
              {editMode !== departamento.id ? (
                <button
                  onClick={() => handleUpdate(departamento.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Editar
                </button>
              ) : (
                <button
                  onClick={() => handleSave(departamento.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Guardar
                </button>
              )}
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
