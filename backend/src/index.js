import express from "express";

const app = express();
const PORT = 4000; // puedes cambiar el puerto

// Middleware para que entienda JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});