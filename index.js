// index.js - Servidor principal de la API MusicalProductipg
// Punto de entrada de la aplicación Express

const express = require("express");
const productosRoutes = require("./routes");

const app = express();
const PORT = 3000;

// ============================================================
// Middleware
// ============================================================

// Parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// ============================================================
// Ruta raíz - Bienvenida a la API
// ============================================================
app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "🎸 Bienvenido a la API de MusicalProductipg",
    descripcion:
      "API RESTful para gestionar el catálogo de instrumentos musicales.",
    version: "1.0.0",
    rutas_disponibles: {
      "GET /productos": "Listar todos los productos",
      "GET /productos/:id": "Obtener un producto por ID",
      "POST /productos": "Crear un nuevo producto",
      "PUT /productos/:id": "Actualizar un producto existente",
      "DELETE /productos/:id": "Eliminar un producto",
    },
  });
});

// ============================================================
// Rutas de la API
// ============================================================
app.use("/productos", productosRoutes);

// ============================================================
// Middleware para rutas no encontradas (404 global)
// ============================================================
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada. Verifica la URL e intenta de nuevo.",
  });
});

// ============================================================
// Iniciar el servidor
// ============================================================
app.listen(PORT, () => {
  console.log(`🎵 Servidor de MusicalProductipg corriendo en http://localhost:${PORT}`);
  console.log(`📋 Visita http://localhost:${PORT} para ver las rutas disponibles`);
});
