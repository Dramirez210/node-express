
const express = require('express');

const app = express();

const {infoCursos} = require('./cursos.js');

//Routing
app.get('/', (req, res) => {
    res.send("Mi primer servidor con express ");
});

app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
});

//en lugar de app. /api/cursos/programacion --> router /
app.get('/api/cursos/programacion', (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
});

//parametros de ruta url lenguaje
app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
    const lenguaje =  req.params.lenguaje;
    const resultados = infoCursos.programacion.filter( curso =>  curso.lenguaje === lenguaje );
    
    if(resultados.length === 0){
        return res.status(404).send(`No se encontro el curso de ${lenguaje}`);
    }

    //Parametros query
    if(req.query.ordenar === 'vistas'){
        return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)));//mayor a menor
    }

    res.send(JSON.stringify(resultados));
});

app.get('/api/cursos/programacion/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados = infoCursos.programacion.filter( curso => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if(resultados.length === 0 ){
        return res.status(404).send(`No se encontro el recurso ${lenguaje}/${nivel}`);
    }

    res.send(JSON.stringify(resultados));
});

app.get('/api/cursos/matematicas', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
});

//parametros de ruta url academia
app.get('/api/cursos/matematicas/:academia', (req, res) => {
    const academia =  req.params.academia;
    const resultados = infoCursos.matematicas.filter( curso =>  curso.academia === academia );
    if(resultados.length === 0){
        return res.status(404).send(`No se encontro el curso de ${academia}`);
    }

    res.send(JSON.stringify(resultados));
});



const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
 console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});



