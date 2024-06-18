// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getFacturas, createFactura, updateFactura, deleteFactura } from '../services/ServicioFactura';

const ListaFactura = () => {
  const [facturas, setFacturas] = useState([]);
  const [newFactura, setNewFactura] = useState({ Fecha: '', Cantidad_Producto: '', Cliente: '' });

  useEffect(() => {
    loadFacturas();
  }, []);

  const loadFacturas = async () => {
    const data = await getFacturas();
    setFacturas(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFactura({ ...newFactura, [name]: value });
  };

  const handleCreate = async () => {
    await createFactura(newFactura);
    loadFacturas();
    setNewFactura({ Fecha: '', Cantidad_Producto: '', Cliente: '' });
  };

  const handleUpdate = async (id) => {
    const factura = facturas.find(fac => fac.id === id);
    await updateFactura(id, factura);
    loadFacturas();
  };

  const handleDelete = async (id) => {
    await deleteFactura(id);
    loadFacturas();
  };

  const handleFacturaChange = (id, field, value) => {
    const updatedFacturas = facturas.map(fac => 
      fac.id === id ? { ...fac, [field]: value } : fac
    );
    setFacturas(updatedFacturas);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-x-hidden animate-fade-in-left">
      <h2 className="text-3xl font-bold text-center mb-8">Facturas</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <input
            type="date"
            name="Fecha"
            placeholder="Fecha"
            value={newFactura.Fecha}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            name="Cantidad_Producto"
            placeholder="Cantidad de Producto"
            value={newFactura.Cantidad_Producto}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="Cliente"
            placeholder="Cliente"
            value={newFactura.Cliente}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button 
          onClick={handleCreate} 
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Añadir Factura
        </button>
      </div>
      <ul className="space-y-4">
        {facturas.map(factura => (
          <li key={factura.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <input
              type="date"
              value={factura.Fecha}
              onChange={(e) => handleFacturaChange(factura.id, 'Fecha', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              value={factura.Cantidad_Producto}
              onChange={(e) => handleFacturaChange(factura.id, 'Cantidad_Producto', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              value={factura.Cliente}
              onChange={(e) => handleFacturaChange(factura.id, 'Cliente', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
              <button 
                onClick={() => handleUpdate(factura.id)} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(factura.id)} 
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

export default ListaFactura;
