import Egresado from "../models/egresado.js";
import PersonalTitulacion from "../models/personalTitulacion.js"; // Asumiendo que el modelo se llama personalTitulacion.js

const loginEController = async (req, res) => {
  try {
    const numeroIdentificacion = req.params.mat;
    const egresado = await Egresado.findOne({
      where: {
        matricula: numeroIdentificacion,
      },
    });

    if (!egresado) {
      return res.status(404).send("Cita no encontrada");
    }

    res.json(egresado)
    }
  catch (error) {
    console.error("No hay ningun Egresado con la matricula ingresada")
    //res.status(500).send("Error interno del servidor");
  }
};

const loginPController = async (req, res) => {
  const numeroIdentificacion = req.params.mat;

  try {

    if (numeroIdentificacion) {
      
      const personal = await PersonalTitulacion.findOne({
        where: {
          numeroTrabajador: numeroIdentificacion,
        },
      });

      if (personal) {
        // Si se encuentra en la tabla de PersonalTitulaciones, renderizar la vista de personal titulación
        //res.render("personalTitulacion/dashboardUsuarios", { personal });
        res.json(personal)
        return;
      }
    }

    // Si no se encuentra en ninguna tabla, mostrar un mensaje de error
    //res.send('<script>alert("Número de identificación no encontrado"); window.location.href = "/citas/login";</script>');
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    //res.status(500).send("Error interno del servidor");
  }
};

export { loginPController, loginEController };
