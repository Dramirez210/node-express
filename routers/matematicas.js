
const express = require('express');

const  { matematicas } = require('../datos/cursos.js').infoCursos

const routerMatematicas = express.Router();

routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(matematicas));
});

//parametros de ruta url academia
routerMatematicas.get('/:academia', (req, res) => {
    const academia = req.params.academia;
    const resultados = matematicas.filter( curso =>  curso.academia === academia );
    if(resultados.length === 0){
        return res.status(404).send(`No se encontro el recurso .../${academia}`);
    }

    res.send(JSON.stringify(resultados));
});



module.exports = routerMatematicas;