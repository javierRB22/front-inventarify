// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../services/ServicioCliente';
import Swal from 'sweetalert2';

const ListaCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({ nombre: '', apellido: '', direccion: '', email: '', telefono: '' });
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value });
  };

  const handleCreate = async () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres añadir este cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await createCliente(newCliente);
        loadClientes();
        setNewCliente({ nombre: '', apellido: '', direccion: '', email: '', telefono: '' });
        Swal.fire(
          '¡Añadido!',
          'El cliente ha sido añadido.',
          'success'
        );
      }
    });
  };

  const handleUpdate = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres editar este cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const cliente = clientes.find(cli => cli.id === id);
        await updateCliente(id, cliente);
        loadClientes();
        setEditMode({ ...editMode, [id]: false });
        Swal.fire(
          '¡Editado!',
          'El cliente ha sido editado.',
          'success'
        );
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres eliminar este cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCliente(id);
        loadClientes();
        Swal.fire(
          '¡Eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const handleClienteChange = (id, field, value) => {
    const updatedClientes = clientes.map(cli => 
      cli.id === id ? { ...cli, [field]: value } : cli
    );
    setClientes(updatedClientes);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-x-hidden animate-fade-in-left">
      <h2 className="text-3xl font-bold text-center mb-8">Clientes</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newCliente.nombre}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={newCliente.apellido}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={newCliente.direccion}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newCliente.email}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={newCliente.telefono}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button 
          onClick={handleCreate} 
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Añadir cliente
        </button>
      </div>
      <ul className="space-y-4">
        {clientes.map(cliente => (
          <li key={cliente.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {editMode[cliente.id] ? (
                <>
                  <input
                    type="text"
                    value={cliente.nombre}
                    onChange={(e) => handleClienteChange(cliente.id, 'nombre', e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    value={cliente.apellido}
                    onChange={(e) => handleClienteChange(cliente.id, 'apellido', e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    value={cliente.direccion}
                    onChange={(e) => handleClienteChange(cliente.id, 'direccion', e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    value={cliente.email}
                    onChange={(e) => handleClienteChange(cliente.id, 'email', e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    value={cliente.telefono}
                    onChange={(e) => handleClienteChange(cliente.id, 'telefono', e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </>
              ) : (
                <>
                  <span>{cliente.nombre}</span>
                  <span>{cliente.apellido}</span>
                  <span>{cliente.direccion}</span>
                  <span>{cliente.email}</span>
                  <span>{cliente.telefono}</span>
                </>
              )}
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
              {editMode[cliente.id] ? (
                <button 
                  onClick={() => handleUpdate(cliente.id)} 
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Guardar
                </button>
              ) : (
                <button 
                  onClick={() => setEditMode({ ...editMode, [cliente.id]: true })} 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Editar
                </button>
              )}
              <button 
                onClick={() => handleDelete(cliente.id)} 
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

export default ListaCliente;
