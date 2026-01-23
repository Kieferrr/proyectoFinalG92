const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        const tokenLimpio = token.replace("Bearer ", "");

        const verified = jwt.verify(tokenLimpio, process.env.JWT_SECRET);

        req.usuario = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token inválido o expirado." });
    }
};

const reportarConsulta = (req, res, next) => {
    console.log(`Consulta recibida: ${req.method} ${req.url} - ${new Date()}`);
    next();
};

module.exports = { verificarToken, reportarConsulta };