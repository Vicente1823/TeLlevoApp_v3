const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let destinos = [];

// Obtener todos los destinos
app.get('/destinos', (req, res) => {
    res.json(destinos);
});

// Obtener un destino específico
app.get('/destinos/:id', (req, res) => {
    const destino = destinos.find(d => d.id === parseInt(req.params.id));
    if (!destino) return res.status(404).send('Destino no encontrado');
    res.json(destino);
});

// Crear un nuevo destino
app.post('/destinos', (req, res) => {
    const nuevoDestino = {
        id: destinos.length + 1,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        pais: req.body.pais,
        precioPromedio: req.body.precioPromedio
    };
    destinos.push(nuevoDestino);
    res.status(201).json(nuevoDestino);
});

// Actualizar un destino
app.put('/destinos/:id', (req, res) => {
    const destino = destinos.find(d => d.id === parseInt(req.params.id));
    if (!destino) return res.status(404).send('Destino no encontrado');

    destino.nombre = req.body.nombre;
    destino.descripcion = req.body.descripcion;
    destino.pais = req.body.pais;
    destino.precioPromedio = req.body.precioPromedio;

    res.json(destino);
});

// Eliminar un destino
app.delete('/destinos/:id', (req, res) => {
    const destinoIndex = destinos.findIndex(d => d.id === parseInt(req.params.id));
    if (destinoIndex === -1) return res.status(404).send('Destino no encontrado');

    destinos.splice(destinoIndex, 1);
    res.status(204).send();
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
