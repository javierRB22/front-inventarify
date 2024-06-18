// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/ServicioProducto';

const ListaProducto = () => {
  const [productos, setProductos] = useState([]);
  const [newProducto, setNewProducto] = useState({ nombre: '', descripcion: '', precio: '', proveedor: '', cantidad_inventario: '' });

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProducto({ ...newProducto, [name]: value });
  };

  const handleCreate = async () => {
    await createProducto(newProducto);
    loadProductos();
    setNewProducto({ nombre: '', descripcion: '', precio: '', proveedor: '', cantidad_inventario: '' });
  };

  const handleUpdate = async (id) => {
    const producto = productos.find(prod => prod.id === id);
    await updateProducto(id, producto);
    loadProductos();
  };

  const handleDelete = async (id) => {
    await deleteProducto(id);
    loadProductos();
  };

  const handleProductoChange = (id, field, value) => {
    const updatedProductos = productos.map(prod => 
      prod.id === id ? { ...prod, [field]: value } : prod
    );
    setProductos(updatedProductos);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-x-hidden">
      <h2 className="text-3xl font-bold text-center mb-8">Productos</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newProducto.nombre}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={newProducto.descripcion}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="precio"
            placeholder="Precio"
            value={newProducto.precio}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="proveedor"
            placeholder="Proveedor"
            value={newProducto.proveedor}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            name="cantidad_inventario"
            placeholder="Cantidad Inventario"
            value={newProducto.cantidad_inventario}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button 
          onClick={handleCreate} 
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        >
          Añadir Producto
        </button>
      </div>
      <ul className="space-y-4">
        {productos.map(producto => (
          <li key={producto.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 flex-1">
              <input
                type="text"
                value={producto.nombre}
                onChange={(e) => handleProductoChange(producto.id, 'nombre', e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                value={producto.descripcion}
                onChange={(e) => handleProductoChange(producto.id, 'descripcion', e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                value={producto.precio}
                onChange={(e) => handleProductoChange(producto.id, 'precio', e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                value={producto.proveedor}
                onChange={(e) => handleProductoChange(producto.id, 'proveedor', e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                value={producto.cantidad_inventario}
                onChange={(e) => handleProductoChange(producto.id, 'cantidad_inventario', e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
              <button 
                onClick={() => handleUpdate(producto.id)} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(producto.id)} 
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

export default ListaProducto;