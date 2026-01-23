const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    allowExitOnIdle: true
});

const obtenerProductos = async () => {
    const { rows } = await pool.query("SELECT * FROM productos");
    return rows;
};

const verificarCredenciales = async (email, password) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2";
    const values = [email, password];
    const { rowCount } = await pool.query(consulta, values);

    if (!rowCount) throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" };
};

module.exports = {
    obtenerProductos,
    verificarCredenciales
};