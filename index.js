require("dotenv").config();  //carga la configuracion de variables de entorno

const http = require("http");  //trae la instancia NEON

const { neon } = require("@neondatabase/serverless");
const express = require('express');
const app = express();

// Definir el puerto
const PORT = 3000;
const sql = neon(process.env.DATABASE_URL);  //crea la conexion con Neon

// Ruta principal
app.get('/', async (req, res) => {
    try {
        const result = await sql`SELECT * FROM tbl_tareas`; // Consulta todos los registros de la tabla
        res.json(result); // Devuelve los datos en formato JSON
    } catch (error) {
        res.status(500).send("Error al obtener los datos: " + error.message);
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});