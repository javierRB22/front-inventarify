// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from '../services/ServicioProveedor';
import Swal from 'sweetalert2';

const ListaProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [newProveedor, setNewProveedor] = useState({ nombre: '', direccion: '', telefono: '' });

  useEffect(() => {
    loadProveedores();
  }, []);

  const loadProveedores = async () => {
    const data = await getProveedores();
    setProveedores(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProveedor({ ...newProveedor, [name]: value });
  };

  const handleCreate = async () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres añadir este proveedor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await createProveedor(newProveedor);
        loadProveedores();
        setNewProveedor({ nombre: '', direccion: '', telefono: '' });
        Swal.fire(
          '¡Añadido!',
          'El proveedor ha sido añadido.',
          'success'
        );
      }
    });
  };

  const handleUpdate = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres editar este proveedor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const proveedor = proveedores.find(prov => prov.id === id);
        await updateProveedor(id, proveedor);
        loadProveedores();
        Swal.fire(
          '¡Editado!',
          'El proveedor ha sido editado.',
          'success'
        );
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres eliminar este proveedor?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProveedor(id);
        loadProveedores();
        Swal.fire(
          '¡Eliminado!',
          'El proveedor ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const handleProveedorChange = (id, field, value) => {
    const updatedProveedores = proveedores.map(prov => 
      prov.id === id ? { ...prov, [field]: value } : prov
    );
    setProveedores(updatedProveedores);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-x-hidden animate-fade-in-left">
      <h2 className="text-3xl font-bold text-center mb-8">Proveedores</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newProveedor.nombre}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={newProveedor.direccion}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={newProveedor.telefono}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button 
          onClick={handleCreate} 
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Añadir Proveedor
        </button>
      </div>
      <ul className="space-y-4">
        {proveedores.map(proveedor => (
          <li key={proveedor.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <input
              type="text"
              value={proveedor.nombre}
              onChange={(e) => handleProveedorChange(proveedor.id, 'nombre', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={proveedor.direccion}
              onChange={(e) => handleProveedorChange(proveedor.id, 'direccion', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={proveedor.telefono}
              onChange={(e) => handleProveedorChange(proveedor.id, 'telefono', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
              <button 
                onClick={() => handleUpdate(proveedor.id)} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(proveedor.id)} 
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

export default ListaProveedor;
