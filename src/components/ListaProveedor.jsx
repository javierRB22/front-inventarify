// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  getProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} from "../services/ServicioProveedor";
import Swal from "sweetalert2";

const ListaProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [newProveedor, setNewProveedor] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
  });
  const [editMode, setEditMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const confirmAction = async (
    title,
    text,
    confirmButtonText,
    actionFunction,
    id = null
  ) => {
    await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (id === null) {
          await actionFunction(newProveedor);
          setNewProveedor({ nombre: "", direccion: "", telefono: "" });
        } else {
          const proveedor = proveedores.find((prov) => prov.id === id);
          await actionFunction(id, proveedor);
          setEditMode(null); // Salir del modo de edición después de guardar
        }
        loadProveedores();
        Swal.fire(
          "¡Realizado!",
          `El proveedor ha sido ${id === null ? "añadido" : "modificado"}.`,
          "success"
        );
      }
    });
  };

  const handleCreate = async () => {
    if (
      newProveedor.nombre.trim() === "" ||
      newProveedor.direccion.trim() === "" ||
      newProveedor.telefono.trim() === ""
    ) {
      await Swal.fire({
        icon: "error",
        title: "Campos requeridos",
        text: "Por favor completa todos los campos.",
      });
    } else {
      confirmAction(
        "¿Estás seguro?",
        "¿Quieres añadir este proveedor?",
        "Sí, añadir",
        createProveedor
      );
    }
  };

  const handleUpdate = async (id) => {
    confirmAction(
      "¿Estás seguro?",
      "¿Quieres guardar los cambios?",
      "Sí, guardar",
      updateProveedor,
      id
    );
  };

  const handleDelete = async (id) => {
    confirmAction(
      "¿Estás seguro?",
      "¿Quieres eliminar este proveedor?",
      "Sí, eliminar",
      deleteProveedor,
      id
    );
  };

  const handleProveedorChange = (id, field, value) => {
    const updatedProveedores = proveedores.map((prov) =>
      prov.id === id ? { ...prov, [field]: value } : prov
    );
    setProveedores(updatedProveedores);
  };

  const totalPages = Math.ceil(proveedores.length / itemsPerPage);
  const currentProveedores = proveedores.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 bg-gray-300 min-h-screen overflow-x-hidden animate-fade-in-left">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-600">PROVEEDORES</h2>
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
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg sm:col-span-2 w-full"
        >
          Añadir Proveedor
        </button>
      </div>
      <ul className="space-y-4">
        {currentProveedores.map((proveedor) => (
          <li
            key={proveedor.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-row items-center justify-between"
          >
            {editMode === proveedor.id ? (
              <>
                <input
                  type="text"
                  value={proveedor.nombre}
                  onChange={(e) =>
                    handleProveedorChange(
                      proveedor.id,
                      "nombre",
                      e.target.value
                    )
                  }
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  value={proveedor.direccion}
                  onChange={(e) =>
                    handleProveedorChange(
                      proveedor.id,
                      "direccion",
                      e.target.value
                    )
                  }
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  value={proveedor.telefono}
                  onChange={(e) =>
                    handleProveedorChange(
                      proveedor.id,
                      "telefono",
                      e.target.value
                    )
                  }
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </>
            ) : (
              <>
                <span>{proveedor.nombre}</span>
                <span>{proveedor.direccion}</span>
                <span>{proveedor.telefono}</span>
              </>
            )}
            <div className="flex space-x-2">
              {editMode === proveedor.id ? (
                <button
                  onClick={() => handleUpdate(proveedor.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Guardar
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(proveedor.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Editar
                </button>
              )}
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
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg shadow-lg ${
              currentPage === index + 1 ? 'bg-green-500 text-white' : 'bg-white text-green-500 border border-green-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListaProveedor;
