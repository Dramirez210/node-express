
const express = require('express');

const  { matematicas } = require('../datos/cursos.js').infoCursos

const routerMatematicas = express.Router();

//middleware
routerMatematicas.use(express.json());

routerMatematicas.get('/', (req, res) => {
    res.send(matematicas);
});

//parametros de ruta url academia
routerMatematicas.get('/:academia', (req, res) => {
    const academia = req.params.academia;
    const resultados = matematicas.filter( curso =>  curso.academia === academia );
    if(resultados.length === 0){
        return res.status(404).end();
    }

    res.send(resultados);
});

routerMatematicas.get('/:academia/:nivel', (req, res) => {
    const academia = req.params.academia;
    const nivel = req.params.nivel;

    const resultados = matematicas.filter( curso => curso.academia === academia && curso.nivel === nivel);

    if (resultados.length === 0){
        return res.status(404).end();
    }
});

//operaciones
routerMatematicas.post('/', (req, res) => {
    let cursoNuevo = req.body; 
    matematicas.push(cursoNuevo);

    res.send(matematicas);
});

routerMatematicas.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = matematicas.findIndex(curso => curso.id == id);

    if(indice >= 0){
        matematicas[indice] = cursoActualizado;
    }else{
        return res.status(404).end();
    }

    res.send(matematicas);
});

routerMatematicas.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = matematicas.findIndex(curso => curso.id == id);

    if(indice >= 0){
        const curso = matematicas[indice];
        Object.assign(curso, infoActualizada);
    }else{
        return res.status(404).end();
    }

    res.send(matematicas); 

});

routerMatematicas.delete('/:id', (req, res) => {
    const id = req.params.id;

    const indice = matematicas.findIndex(curso => curso.id == id);

    if(indice >= 0){
        matematicas.splice(indice, 1); //cortar
    }else{
        return res.status(404).end();
    }

    res.send(matematicas); //.json
})




module.exports = routerMatematicas;