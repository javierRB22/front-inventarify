// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from '../services/ServicioProveedor';

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
    await createProveedor(newProveedor);
    loadProveedores();
    setNewProveedor({ nombre: '', direccion: '', telefono: '' });
  };

  const handleUpdate = async (id) => {
    const proveedor = proveedores.find(prov => prov.id === id);
    await updateProveedor(id, proveedor);
    loadProveedores();
  };

  const handleDelete = async (id) => {
    await deleteProveedor(id);
    loadProveedores();
  };

  const handleProveedorChange = (id, field, value) => {
    const updatedProveedores = proveedores.map(prov => 
      prov.id === id ? { ...prov, [field]: value } : prov
    );
    setProveedores(updatedProveedores);
  };

  return (
    <div>
      <h2>Proveedores</h2>
      <div>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newProveedor.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={newProveedor.direccion}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={newProveedor.telefono}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Añadir Proveedor</button>
      </div>
      <ul>
        {proveedores.map(proveedor => (
          <li key={proveedor.id}>
            <input
              type="text"
              value={proveedor.nombre}
              onChange={(e) => handleProveedorChange(proveedor.id, 'nombre', e.target.value)}
            />
            <input
              type="text"
              value={proveedor.direccion}
              onChange={(e) => handleProveedorChange(proveedor.id, 'direccion', e.target.value)}
            />
            <input
              type="text"
              value={proveedor.telefono}
              onChange={(e) => handleProveedorChange(proveedor.id, 'telefono', e.target.value)}
            />
            <button onClick={() => handleUpdate(proveedor.id)}>Editar</button>
            <button onClick={() => handleDelete(proveedor.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProveedor;
