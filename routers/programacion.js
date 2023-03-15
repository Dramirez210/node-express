
const express = require('express');

const  { programacion } = require('../datos/cursos.js').infoCursos

const routerProgramacion = express.Router();

//en lugar de app. /api/cursos/programacion --> router /
routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(programacion));
});

//parametros de ruta url lenguaje
routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje =  req.params.lenguaje;
    const resultados = programacion.filter( curso =>  curso.lenguaje === lenguaje );
    
    if(resultados.length === 0){
        return res.status(404).send(`No se encontro el curso de ${lenguaje}`);
    }

    //Parametros query
    if(req.query.ordenar === 'vistas'){
        return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)));//mayor a menor
    }

    res.send(JSON.stringify(resultados));
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados = programacion.filter( curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if(resultados.length === 0 ){
        return res.status(404).send(`No se encontro el recurso ${lenguaje}/${nivel}`);
    }

    res.send(JSON.stringify(resultados));
});

module.exports = routerProgramacion;