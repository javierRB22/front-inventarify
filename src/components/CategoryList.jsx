// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import Swal from "sweetalert2";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    nombre: "",
    descripcion: "",
  });
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleCreate = async () => {
    // Validar que los campos no estén vacíos
    if (!newCategory.nombre.trim() || !newCategory.descripcion.trim()) {
      Swal.fire(
        "Campos Requeridos",
        "Por favor, completa todos los campos.",
        "error"
      );
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres añadir esta categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, añadir",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await createCategory(newCategory);
        loadCategories();
        setNewCategory({ nombre: "", descripcion: "" });
        Swal.fire("¡Añadido!", "La categoría ha sido añadida.", "success");
      }
    });
  };

  const handleUpdate = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres editar esta categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const category = categories.find((cat) => cat.id === id);
        await updateCategory(id, category);
        loadCategories();
        setEditMode({ ...editMode, [id]: false });
        Swal.fire("¡Realizado!", "La categoría ha sido modificada.", "success");
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar esta categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCategory(id);
        loadCategories();
        Swal.fire("¡Eliminado!", "La categoría ha sido eliminada.", "success");
      }
    });
  };

  const handleCategoryChange = (id, field, value) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === id ? { ...cat, [field]: value } : cat
    );
    setCategories(updatedCategories);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen overflow-x-hidden animate-fade-in-left">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-600">CATEGORIAS</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newCategory.nombre}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={newCategory.descripcion}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleCreate}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg sm:col-span-2"
          >
            Añadir Categoría
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 flex-1">
              {editMode[category.id] ? (
                <input
                  type="text"
                  value={category.nombre}
                  onChange={(e) =>
                    handleCategoryChange(category.id, "nombre", e.target.value)
                  }
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <span>{category.nombre}</span>
              )}
              {editMode[category.id] ? (
                <input
                  type="text"
                  value={category.descripcion}
                  onChange={(e) =>
                    handleCategoryChange(
                      category.id,
                      "descripcion",
                      e.target.value
                    )
                  }
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <span>{category.descripcion}</span>
              )}
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 flex space-x-2">
              {editMode[category.id] ? (
                <button
                  onClick={() => handleUpdate(category.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Guardar
                </button>
              ) : (
                <button
                  onClick={() =>
                    setEditMode({ ...editMode, [category.id]: true })
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                >
                  Editar
                </button>
              )}
              <button
                onClick={() => handleDelete(category.id)}
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

export default CategoryList;
