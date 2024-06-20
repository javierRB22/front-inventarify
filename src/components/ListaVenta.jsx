// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getVentas, createVenta, updateVenta, deleteVenta } from '../services/ServicioVenta';
import Swal from 'sweetalert2';

const ListaVenta = () => {
  const [ventas, setVentas] = useState([]);
  const [newVenta, setNewVenta] = useState({ fecha_venta: '', total_ventas: '' });
  const [editMode, setEditMode] = useState(null);

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
          await actionFunction(newVenta);
          setNewVenta({ fecha_venta: '', total_ventas: '' });
          await loadVentas(); // Actualiza la lista después de añadir
          Swal.fire(
            '¡Añadida!',
            'La venta ha sido añadida.',
            'success'
          );
        } else {
          const venta = ventas.find(v => v.id === id);
          await actionFunction(id, venta);
          await loadVentas(); // Actualiza la lista después de editar
          setEditMode(null); // Salir del modo de edición
          Swal.fire(
            '¡Realizado!',
            'La venta ha sido modificada.',
            'success'
          );
        }
      }
    });
  };

  const handleCreate = async () => {
    // Validar campos requeridos
    if (!newVenta.fecha_venta || !newVenta.total_ventas) {
      Swal.fire('Campos Requeridos', 'Por favor, completa todos los campos.', 'error');
      return;
    }

    confirmAction(
      '¿Estás seguro?',
      '¿Quieres añadir esta venta?',
      'Sí, añadir',
      createVenta
    );
  };

  const handleUpdate = async (id) => {
    setEditMode(id);
  };

  const handleSave = async (id) => {
    confirmAction(
      '¿Estás seguro?',
      '¿Quieres guardar los cambios en esta venta?',
      'Sí, guardar',
      updateVenta,
      id
    );
  };

  const handleDelete = async (id) => {
    confirmAction(
      '¿Estás seguro?',
      '¿Quieres eliminar esta venta?',
      'Sí, eliminar',
      deleteVenta,
      id
    );
  };

  const handleVentaChange = (id, field, value) => {
    const updatedVentas = ventas.map(v =>
      v.id === id ? { ...v, [field]: value } : v
    );
    setVentas(updatedVentas);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-x-hidden animate-fade-in-left">
      <h2 className="text-3xl font-bold text-center mb-8">VENTAS</h2>
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
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg w-full"
        >
          Añadir Venta
        </button>
      </div>
      <ul className="space-y-4">
        {ventas.map(venta => (
          <li key={venta.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {editMode !== venta.id ? (
              <>
                <div>{venta.fecha_venta}</div>
                <div>{venta.total_ventas}</div>
              </>
            ) : (
              <>
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
              </>
            )}
            <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
              {editMode !== venta.id ? (
                <button
                  onClick={() => handleUpdate(venta.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Editar
                </button>
              ) : (
                <button
                  onClick={() => handleSave(venta.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Guardar
                </button>
              )}
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
