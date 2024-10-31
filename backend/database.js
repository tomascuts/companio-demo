require('dotenv').config();  // Esto importa el archivo .env

const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Usar la URI desde .env
const mongoURI = "mongodb+srv://matiassanblas:companio123@clustercompanio.res3c.mongodb.net/"

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa con MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
