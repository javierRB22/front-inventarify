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
    <div className="p-6 bg-gray-100 min-h-screen overflow-x-hidden animate-fade-in-left">
      <h2 className="text-3xl font-bold text-center mb-8">Ventas</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="date"
            name="fecha_venta"
            placeholder="Fecha de Venta"
            value={newVenta.fecha_venta}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            name="total_ventas"
            placeholder="Total Ventas"
            value={newVenta.total_ventas}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button 
          onClick={handleCreate} 
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Añadir Venta
        </button>
      </div>
      <ul className="space-y-4">
        {ventas.map(venta => (
          <li key={venta.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <input
              type="date"
              value={venta.fecha_venta}
              onChange={(e) => handleVentaChange(venta.id, 'fecha_venta', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              value={venta.total_ventas}
              onChange={(e) => handleVentaChange(venta.id, 'total_ventas', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
              <button 
                onClick={() => handleUpdate(venta.id)} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(venta.id)} 
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

export default ListaVenta;
