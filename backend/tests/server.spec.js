const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de KieferStore", () => {

    it("Obteniendo un 200 y un arreglo con al menos un objeto", async () => {
        const response = await request(server).get("/productos").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it("Obteniendo un 404 al intentar login con un usuario inexistente", async () => {
        const usuarioInexistente = { email: "noexiste@test.com", password: "000" };
        const response = await request(server)
            .post("/login")
            .send(usuarioInexistente);
        expect(response.statusCode).toBe(404);
    });

    it("Realizando un login válido y obteniendo un token (Status 200)", async () => {
        const usuarioValido = { email: "nico@kieferstore.cl", password: "123456" };
        const response = await request(server)
            .post("/login")
            .send(usuarioValido);
        expect(response.statusCode).toBe(200);
        expect(typeof response.text).toBe("string");
    });

    it("Obteniendo un error (401) al acceder a ruta privada sin token", async () => {
        const response = await request(server)
            .get("/usuarios")
            .send();
        expect(response.statusCode).toBe(401);
    });

});