// routes.js - Definición de rutas de la API MusicalProductipg
// Contiene todas las rutas CRUD para el recurso /productos

const express = require("express");
const router = express.Router();
const productos = require("./data");

// ============================================================
// GET /productos - Listar todos los productos
// ============================================================
router.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "Lista de productos de MusicalProductipg",
    total: productos.length,
    datos: productos,
  });
});

// ============================================================
// GET /productos/:id - Obtener un producto por ID
// ============================================================
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({
      error: `Producto con id ${id} no encontrado.`,
    });
  }

  res.status(200).json({
    mensaje: "Producto encontrado",
    dato: producto,
  });
});

// ============================================================
// POST /productos - Crear un nuevo producto
// ============================================================
router.post("/", (req, res) => {
  const { nombre, precio, categoria } = req.body;

  // --- Validación de campos obligatorios ---
  if (!nombre || precio === undefined || !categoria) {
    return res.status(400).json({
      error:
        "Faltan campos obligatorios. Se requieren: nombre, precio y categoria.",
    });
  }

  // --- Validación de tipos ---
  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({
      error: "El campo 'nombre' debe ser una cadena de texto no vacía.",
    });
  }

  if (typeof precio !== "number" || isNaN(precio) || precio < 0) {
    return res.status(400).json({
      error: "El campo 'precio' debe ser un número positivo.",
    });
  }

  if (typeof categoria !== "string" || categoria.trim() === "") {
    return res.status(400).json({
      error: "El campo 'categoria' debe ser una cadena de texto no vacía.",
    });
  }

  // --- Crear nuevo producto ---
  const nuevoProducto = {
    id: productos.length + 1,
    nombre: nombre.trim(),
    precio,
    categoria: categoria.trim(),
  };

  productos.push(nuevoProducto);

  res.status(201).json({
    mensaje: "Producto creado exitosamente.",
    dato: nuevoProducto,
  });
});

// ============================================================
// PUT /productos/:id - Actualizar un producto existente
// ============================================================
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: `Producto con id ${id} no encontrado.`,
    });
  }

  const { nombre, precio, categoria } = req.body;

  // --- Validación: al menos un campo debe enviarse ---
  if (nombre === undefined && precio === undefined && categoria === undefined) {
    return res.status(400).json({
      error:
        "Debes enviar al menos un campo para actualizar: nombre, precio o categoria.",
    });
  }

  // --- Validaciones de tipo si el campo está presente ---
  if (nombre !== undefined) {
    if (typeof nombre !== "string" || nombre.trim() === "") {
      return res.status(400).json({
        error: "El campo 'nombre' debe ser una cadena de texto no vacía.",
      });
    }
  }

  if (precio !== undefined) {
    if (typeof precio !== "number" || isNaN(precio) || precio < 0) {
      return res.status(400).json({
        error: "El campo 'precio' debe ser un número positivo.",
      });
    }
  }

  if (categoria !== undefined) {
    if (typeof categoria !== "string" || categoria.trim() === "") {
      return res.status(400).json({
        error: "El campo 'categoria' debe ser una cadena de texto no vacía.",
      });
    }
  }

  // --- Aplicar actualización parcial (PATCH-like con PUT) ---
  if (nombre !== undefined) productos[indice].nombre = nombre.trim();
  if (precio !== undefined) productos[indice].precio = precio;
  if (categoria !== undefined) productos[indice].categoria = categoria.trim();

  res.status(200).json({
    mensaje: "Producto actualizado exitosamente.",
    dato: productos[indice],
  });
});

// ============================================================
// DELETE /productos/:id - Eliminar un producto
// ============================================================
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: `Producto con id ${id} no encontrado.`,
    });
  }

  const productoEliminado = productos.splice(indice, 1)[0];

  res.status(200).json({
    mensaje: "Producto eliminado exitosamente.",
    dato: productoEliminado,
  });
});

module.exports = router;
