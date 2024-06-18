// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../services/ServicioCliente';

const ListaCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({ nombre: '', apellido: '', direccion: '', email: '', telefono: '' });

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
    await createCliente(newCliente);
    loadClientes();
    setNewCliente({ nombre: '', apellido: '', direccion: '', email: '', telefono: '' });
  };

  const handleUpdate = async (id) => {
    const cliente = clientes.find(cli => cli.id === id);
    await updateCliente(id, cliente);
    loadClientes();
  };

  const handleDelete = async (id) => {
    await deleteCliente(id);
    loadClientes();
  };

  const handleClienteChange = (id, field, value) => {
    const updatedClientes = clientes.map(cli => 
      cli.id === id ? { ...cli, [field]: value } : cli
    );
    setClientes(updatedClientes);
  };

  return (
    <div>
      <h2>Clientes</h2>
      <div>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newCliente.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={newCliente.apellido}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={newCliente.direccion}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newCliente.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={newCliente.telefono}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Añadir cliente</button>
      </div>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            <input
              type="text"
              value={cliente.nombre}
              onChange={(e) => handleClienteChange(cliente.id, 'nombre', e.target.value)}
            />
            <input
              type="text"
              value={cliente.apellido}
              onChange={(e) => handleClienteChange(cliente.id, 'apellido', e.target.value)}
            />
            <input
              type="text"
              value={cliente.direccion}
              onChange={(e) => handleClienteChange(cliente.id, 'direccion', e.target.value)}
            />
            <input
              type="text"
              value={cliente.email}
              onChange={(e) => handleClienteChange(cliente.id, 'email', e.target.value)}
            />
            <input
              type="text"
              value={cliente.telefono}
              onChange={(e) => handleClienteChange(cliente.id, 'telefono', e.target.value)}
            />
            <button onClick={() => handleUpdate(cliente.id)}>Editar</button>
            <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCliente;
