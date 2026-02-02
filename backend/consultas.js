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
    const { rows } = await pool.query("SELECT * FROM productos ORDER BY created_at DESC");
    return rows;
};

const verificarCredenciales = async (email, password) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2";
    const values = [email, password];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) throw { code: 404, message: "No se encontró ningún usuario" };
};

const obtenerUsuario = async (email) => {
    const consulta = "SELECT id, nombre, email, rol, avatar, created_at FROM usuarios WHERE email = $1";
    const values = [email];
    const { rows, rowCount } = await pool.query(consulta, values);
    if (!rowCount) throw { code: 404, message: "No encontrado" };
    return rows[0];
};

const registrarUsuario = async (nombre, email, password, rol, avatar) => {
    const consulta = "INSERT INTO usuarios (nombre, email, password, rol, avatar) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [nombre, email, password, rol, avatar];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) throw { code: 500, message: "Error" };
};

const crearProducto = async (nombre, descripcion, precio, img, stock, condicion, usuario_id) => {
    const consulta = "INSERT INTO productos (nombre, descripcion, precio, img, stock, condicion, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [nombre, descripcion, precio, img, stock, condicion, usuario_id];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) throw { code: 500, message: "Error" };
};

const obtenerProductosUsuario = async (usuario_id) => {
    const consulta = "SELECT * FROM productos WHERE usuario_id = $1 ORDER BY created_at DESC";
    const values = [usuario_id];
    const { rows } = await pool.query(consulta, values);
    return rows;
};

const eliminarProducto = async (id, usuario_id) => {
    const consulta = "DELETE FROM productos WHERE id = $1 AND usuario_id = $2";
    const values = [id, usuario_id];
    const { rowCount } = await pool.query(consulta, values);
    if (!rowCount) throw { code: 403, message: "Sin permiso" };
};

module.exports = {
    obtenerProductos,
    verificarCredenciales,
    obtenerUsuario,
    registrarUsuario,
    crearProducto,
    obtenerProductosUsuario,
    eliminarProducto
};