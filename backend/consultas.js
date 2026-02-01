const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    allowExitOnIdle: true,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
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

const obtenerUsuario = async (email) => {
    const consulta = "SELECT id, nombre, email, rol, created_at FROM usuarios WHERE email = $1";
    const values = [email];
    const { rows, rowCount } = await pool.query(consulta, values);
    if (!rowCount) throw { code: 404, message: "Usuario no encontrado" };
    return rows[0];
};

const registrarUsuario = async (nombre, email, password, rol) => {
    const consulta = "INSERT INTO usuarios (id, nombre, email, password, rol) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING *";
    const values = [nombre, email, password, rol];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) throw { code: 500, message: "No se pudo registrar el usuario" };
};

module.exports = {
    obtenerProductos,
    verificarCredenciales,
    obtenerUsuario,
    registrarUsuario
};