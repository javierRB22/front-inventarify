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
    <div>
      <h2>Facturas</h2>
      <div>
        <input
          type="date"
          name="Fecha"
          placeholder="Fecha"
          value={newFactura.Fecha}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="Cantidad_Producto"
          placeholder="Cantidad de Producto"
          value={newFactura.Cantidad_Producto}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Cliente"
          placeholder="Cliente"
          value={newFactura.Cliente}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Añadir Factura</button>
      </div>
      <ul>
        {facturas.map(factura => (
          <li key={factura.id}>
            <input
              type="date"
              value={factura.Fecha}
              onChange={(e) => handleFacturaChange(factura.id, 'Fecha', e.target.value)}
            />
            <input
              type="number"
              value={factura.Cantidad_Producto}
              onChange={(e) => handleFacturaChange(factura.id, 'Cantidad_Producto', e.target.value)}
            />
            <input
              type="text"
              value={factura.Cliente}
              onChange={(e) => handleFacturaChange(factura.id, 'Cliente', e.target.value)}
            />
            <button onClick={() => handleUpdate(factura.id)}>Editar</button>
            <button onClick={() => handleDelete(factura.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaFactura;
