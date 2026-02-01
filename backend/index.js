const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { obtenerProductos, verificarCredenciales, obtenerUsuario, registrarUsuario } = require('./consultas');
const { verificarToken, reportarConsulta } = require('./middlewares');

app.use(cors());
app.use(express.json());
app.use(reportarConsulta);

app.get('/productos', async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        await verificarCredenciales(email, password);
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        res.send(token);
    } catch (error) {
        console.log(error);
        res.status(error.code || 500).send(error);
    }
});

app.post('/usuarios', async (req, res) => {
    try {
        const { nombre, email, password, rol, lenguage } = req.body;
        await registrarUsuario(nombre, email, password, rol, lenguage);
        res.status(201).send("Usuario registrado con éxito");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/usuarios', verificarToken, async (req, res) => {
    try {
        const token = req.header("Authorization").split("Bearer ")[1];
        const { email } = jwt.decode(token);
        const usuario = await obtenerUsuario(email);
        res.json(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;