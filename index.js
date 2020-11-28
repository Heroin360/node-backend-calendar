const express = require('express');
const { dbConexion } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// crear el servidor de express

const app = express();

//Base de datos
dbConexion();

//Cors
app.use(cors());

//Diectorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// escuchar peticiones

app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
