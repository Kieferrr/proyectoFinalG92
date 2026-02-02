const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { obtenerProductos, verificarCredenciales, obtenerUsuario, registrarUsuario, crearProducto, obtenerProductosUsuario, eliminarProducto } = require('./consultas');
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

app.post('/productos', verificarToken, async (req, res) => {
    try {
        const { nombre, descripcion, precio, img, stock, condicion } = req.body;
        const token = req.header("Authorization").split("Bearer ")[1];
        const { email } = jwt.decode(token);
        const usuario = await obtenerUsuario(email);
        await crearProducto(nombre, descripcion, precio, img, stock, condicion, usuario.id);
        res.status(201).send("OK");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/productos/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.header("Authorization").split("Bearer ")[1];
        const { email } = jwt.decode(token);
        const usuario = await obtenerUsuario(email);
        await eliminarProducto(id, usuario.id);
        res.send("OK");
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
        res.status(error.code || 500).send(error);
    }
});

app.post('/usuarios', async (req, res) => {
    try {
        const { nombre, email, password, rol, avatar } = req.body;
        await registrarUsuario(nombre, email, password, rol, avatar);
        res.status(201).send("OK");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/usuarios', verificarToken, async (req, res) => {
    try {
        const token = req.header("Authorization").split("Bearer ")[1];
        const { email } = jwt.decode(token);
        const usuario = await obtenerUsuario(email);
        const publicaciones = await obtenerProductosUsuario(usuario.id);
        res.json({ ...usuario, publicaciones });
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});

module.exports = app;