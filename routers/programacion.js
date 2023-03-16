
const express = require('express');

const  { programacion } = require('../datos/cursos.js').infoCursos

const routerProgramacion = express.Router();

//middleware
routerProgramacion.use(express.json()); //procesar cuerpo en json de la solicitud

//en lugar de app. /api/cursos/programacion --> router /
routerProgramacion.get('/', (req, res) => {
    res.send(programacion);
});

//parametros de ruta url lenguaje
routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje =  req.params.lenguaje;
    const resultados = programacion.filter( curso =>  curso.lenguaje === lenguaje );
    
    if(resultados.length === 0){
        // return res.status(404).send(`No se encontro el curso de ${lenguaje}`);
        return res.end();
    }

    //Parametros query
    if(req.query.ordenar === 'vistas'){
        return res.send(resultados.sort((a, b) => b.vistas - a.vistas));//mayor a menor
    }

    res.send(resultados);
});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados = programacion.filter( curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if(resultados.length === 0 ){
        // return res.status(404).send(`No se encontro el recurso ${lenguaje}/${nivel}`);
        return res.end();
    }

    res.send(resultados);
});

//operaciones
routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body; //extraer
    programacion.push(cursoNuevo);

    res.send(programacion);
});

routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if(indice >= 0){
        programacion[indice] = cursoActualizado;
    }else{
        res.status(404).send(`No se encontro el recurso...`);
    }

    res.send(programacion);
});

routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if(indice >= 0){
        const curso = programacion[indice];
        Object.assign(curso, infoActualizada);
    }else{
        res.status(404).send(`No se encontro el recurso...`);
    }

    res.send(programacion); //send maneja buffer, string, objecto o array

});

routerProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;

    const indice = programacion.findIndex(curso => curso.id == id);

    if(indice >= 0){
        programacion.splice(indice, 1); //cortar
    }else{
        res.status(404).send(`No se encontro el recurso...`)
    }

    res.send(programacion); //.json
})

module.exports = routerProgramacion;