// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ nombre: '', descripcion: '' });

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
    await createCategory(newCategory);
    loadCategories();
    setNewCategory({ nombre: '', descripcion: '' });
  };

  const handleUpdate = async (id) => {
    const category = categories.find(cat => cat.id === id);
    await updateCategory(id, category);
    loadCategories();
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    loadCategories();
  };

  const handleCategoryChange = (id, field, value) => {
    const updatedCategories = categories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    );
    setCategories(updatedCategories);
  };

  return (
    <div>
      <h2>Categories</h2>
      <div>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newCategory.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={newCategory.descripcion}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Añadir producto</button>
      </div>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <input
              type="text"
              value={category.nombre}
              onChange={(e) => handleCategoryChange(category.id, 'nombre', e.target.value)}
            />
            <input
              type="text"
              value={category.descripcion}
              onChange={(e) => handleCategoryChange(category.id, 'descripcion', e.target.value)}
            />
            <button onClick={() => handleUpdate(category.id)}>Editar</button>
            <button onClick={() => handleDelete(category.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
