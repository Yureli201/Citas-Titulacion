import express from "express";
import { aministrarCitasController, mostrarFormularioEditarCita, personalEditarCita, personalEliminarCita, administrarPersonalController, administrarUsuariosController, mostrarFormularioEditarEgresado, editarEgresado, eliminarEgresado, mostrarFormularioEditarPersonal, editarPersonal, eliminarPersonal, agregarNuevoEgresado, renderAgregarEgresado, renderAgregarPersonal, registrarPersonal } from "../controllers/personalController.js";

const router = express.Router();

// Ruta para mostrar el listado de citas
router.get("/administrarCitas", aministrarCitasController);

// Ruta para mostrar el formulario de edición de cita
router.get("/:mat/editar", mostrarFormularioEditarCita);

// Ruta para editar la cita
router.post("/:id/guardarCita", personalEditarCita);

// Ruta para eliminar una cita
router.post("/:id/eliminar", personalEliminarCita);

// Ruta para mostrar el listado de egresados y personal de titulación
router.get("/administrarUsuarios", administrarUsuariosController);

router.get("/administrarPersonal", administrarPersonalController);

// Ruta para mostrar el formulario de edición de egresado
router.get("/egresados/:matricula/editar", mostrarFormularioEditarEgresado);

// Ruta para procesar la solicitud de edición de egresado
router.post("/egresados/:matricula/editar", editarEgresado);

// Ruta para eliminar un egresado
router.delete("/egresados/:matricula/eliminar", eliminarEgresado);

// Ruta para mostrar el formulario de edición de personal de titulación
router.get("/personal/:numeroTrabajador/editar", mostrarFormularioEditarPersonal);

// Ruta para procesar la solicitud de edición de personal de titulación
router.post("/personal/:numeroTrabajador/editar", editarPersonal);

// Ruta para eliminar un registro de personalTitulacion
router.delete("/personal/:numeroTrabajador/eliminar", eliminarPersonal);

// Ruta para agregar un nuevo egresado
router.post("/egresados/agregar", agregarNuevoEgresado);

// Ruta para renderizar la vista de agregar egresados
router.get("/egresados/agregar", renderAgregarEgresado);

// Ruta para registrar nuevo personal
router.post("/personal/agregar", registrarPersonal);
// Ruta para renderizar el formulario de agregar nuevo personal
router.get("/personal/agregar", renderAgregarPersonal);

export default router;
