import express from "express";
import { crearCitaController, eliminarCitaController, actualizarCita, consultarMatriculaController,buscarHorariosController } from "../controllers/citaController.js";

const router = express.Router();

// Ruta para la página de inicio de sesión
router.get("/login", (request, response) => response.render("login.ejs"));

// Ruta para crear una cita
router.post("/consultar/:mat", crearCitaController);

// Ruta para actualizar la cita en la base de datos
router.post("/actualizar/:citaId", actualizarCita);

// Ruta para eliminar una cita
router.delete("/eliminar/:citaId", eliminarCitaController);

// Ruta para la página de consultar cita
router.get("/consultar/:citaId", (request, response) => response.render("consultarCita.ejs"));

//Ruta para buscar por matricula
router.get("/consultar/matricula/:mat", consultarMatriculaController)

router.get("/consultar/horarios/:fecha", buscarHorariosController)


export default router;
