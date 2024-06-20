// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  getFacturas,
  createFactura,
  updateFactura,
  deleteFactura
} from '../services/ServicioFactura';

const ListaFactura = () => {
  const [facturas, setFacturas] = useState([]);
  const [newFactura, setNewFactura] = useState({ Fecha: '', Cantidad_Producto: '', Cliente: '' });
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de facturas por página

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
          await actionFunction(newFactura);
          setNewFactura({ Fecha: '', Cantidad_Producto: '', Cliente: '' });
          await loadFacturas(); // Actualiza la lista después de añadir
          Swal.fire('¡Añadida!', 'La factura ha sido añadida.', 'success');
        } else {
          const factura = facturas.find(fac => fac.id === id);
          await actionFunction(id, factura);
          await loadFacturas(); // Actualiza la lista después de editar
          setEditMode(null); // Salir del modo de edición
          Swal.fire('¡Guardado!', 'La factura ha sido guardada.', 'success');
        }
      }
    });
  };

  const handleCreate = async () => {
    // Validar campos requeridos
    if (!newFactura.Fecha || !newFactura.Cantidad_Producto || !newFactura.Cliente) {
      Swal.fire('Campos Requeridos', 'Por favor, completa todos los campos.', 'error');
      return;
    }

    confirmAction(
      '¿Estás seguro?',
      '¿Quieres añadir esta factura?',
      'Sí, añadir',
      createFactura
    );
  };

  const handleUpdate = async (id) => {
    setEditMode(id);
  };

  const handleSave = async (id) => {
    confirmAction(
      '¿Estás seguro?',
      '¿Quieres guardar los cambios en esta factura?',
      'Sí, guardar',
      updateFactura,
      id
    );
  };

  const handleDelete = async (id) => {
    confirmAction(
      '¿Estás seguro?',
      '¿Quieres eliminar esta factura?',
      'Sí, eliminar',
      deleteFactura,
      id
    );
  };

  const handleFacturaChange = (id, field, value) => {
    const updatedFacturas = facturas.map(fac =>
      fac.id === id ? { ...fac, [field]: value } : fac
    );
    setFacturas(updatedFacturas);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facturas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-300 min-h-screen overflow-x-hidden animate-fade-in-left">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-600">FACTURAS</h2>
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
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg w-full"
        >
          Añadir Factura
        </button>
      </div>
      <ul className="space-y-4">
        {currentItems.map(factura => (
          <li key={factura.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {editMode !== factura.id ? (
              <>
                <div>{factura.Fecha}</div>
                <div>{factura.Cantidad_Producto}</div>
                <div>{factura.Cliente}</div>
              </>
            ) : (
              <>
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
              </>
            )}
            <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
              {editMode !== factura.id ? (
                <button
                  onClick={() => handleUpdate(factura.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Editar
                </button>
              ) : (
                <button
                  onClick={() => handleSave(factura.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Guardar
                </button>
              )}
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
      {/* Pagination controls */}
      <div className="mt-4 flex justify-center">
        {[...Array(Math.ceil(facturas.length / itemsPerPage)).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-1 rounded-lg ${currentPage === number + 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListaFactura;
