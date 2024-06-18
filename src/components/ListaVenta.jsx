// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getVentas, createVenta, updateVenta, deleteVenta } from '../services/ServicioVenta';

const ListaVenta = () => {
  const [ventas, setVentas] = useState([]);
  const [newVenta, setNewVenta] = useState({ fecha_venta: '', total_ventas: '' });

  useEffect(() => {
    loadVentas();
  }, []);

  const loadVentas = async () => {
    const data = await getVentas();
    setVentas(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenta({ ...newVenta, [name]: value });
  };

  const handleCreate = async () => {
    await createVenta(newVenta);
    loadVentas();
    setNewVenta({ fecha_venta: '', total_ventas: '' });
  };

  const handleUpdate = async (id) => {
    const venta = ventas.find(v => v.id === id);
    await updateVenta(id, venta);
    loadVentas();
  };

  const handleDelete = async (id) => {
    await deleteVenta(id);
    loadVentas();
  };

  const handleVentaChange = (id, field, value) => {
    const updatedVentas = ventas.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    );
    setVentas(updatedVentas);
  };

  return (
    <div>
      <h2>Ventas</h2>
      <div>
        <input
          type="date"
          name="fecha_venta"
          placeholder="Fecha de Venta"
          value={newVenta.fecha_venta}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="total_ventas"
          placeholder="Total Ventas"
          value={newVenta.total_ventas}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Añadir Venta</button>
      </div>
      <ul>
        {ventas.map(venta => (
          <li key={venta.id}>
            <input
              type="date"
              value={venta.fecha_venta}
              onChange={(e) => handleVentaChange(venta.id, 'fecha_venta', e.target.value)}
            />
            <input
              type="number"
              value={venta.total_ventas}
              onChange={(e) => handleVentaChange(venta.id, 'total_ventas', e.target.value)}
            />
            <button onClick={() => handleUpdate(venta.id)}>Editar</button>
            <button onClick={() => handleDelete(venta.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaVenta;
