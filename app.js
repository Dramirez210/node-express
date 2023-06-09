
const express = require('express');

const app = express(); //funcion de mayor nivel

const {infoCursos} = require('./datos/cursos.js');

//Routers
const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas');
app.use('/api/cursos/matematicas', routerMatematicas);


//Routing
app.get('/', (req, res) => {
    res.send("Mi primer servidor con express ");
});

app.get('/api/cursos', (req, res) => {
    res.send(infoCursos);
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
 console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});

