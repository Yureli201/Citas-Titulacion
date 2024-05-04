import Egresado from "../models/egresado.js";
import Cita from "../models/cita.js";

const crearCitaController = async (req, res) => {
  const { fecha, hora } = req.body;
  const matricula =req.params.mat;
  
  try {
    const nuevaCita = await Cita.create({
      fecha,
      hora,
      egresadoMatricula: matricula,
      estado:true
    });

    res.json("Cita creada")
  } catch (error) {
    console.error("Error al intentar crear la cita:", error);
  }
};

const actualizarCita = async (req, res) => {
  const citaId = req.params.citaId;
  const { fecha, hora, estado } = req.body;

  try {
    const cita = await Cita.findByPk(citaId);

    if (!cita) {
      return res.status(404).send('<script>alert("La cita no existe"); window.location.href = "/citas/consultar";</script>');
    }

    cita.fecha = fecha;
    cita.hora = hora;
    cita.estado = true
    await cita.save();

    res.render("egresados/consultarCita", { cita });
  } catch (error) {
    console.error("Error al intentar editar la cita:", error);
    res.status(500).send('<script>alert("Error al editar la cita"); window.location.href = "/citas/consultar";</script>');
  }
};

const eliminarCitaController = async (req, res) => {
  const citaId = req.params.citaId;

  try {
    const cita = await Cita.findByPk(citaId);

    if (!cita) {
      return res.status(404).send("La cita no existe");
    }

    const egresadoMatricula = cita.egresadoMatricula;

    await cita.destroy();

    const egresado = await Egresado.findOne({
      where: {
        matricula: egresadoMatricula,
      },
    });

    if (egresado) {
      res.render("egresados/citas", { egresado });
    } else {
      res.send('<script>alert("Matrícula no encontrada"); window.location.href = "/citas";</script>');
    }
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    res.status(500).send("Hubo un error al eliminar la cita");
  }
};

const consultarMatriculaController =async(req,res)=>{
  try {
    const matricula=req.params.mat
    
    const cita= await Cita.findAll({where: {egresadoMatricula: matricula}});

    if(!cita){
      return res.status(404).send("Cita no encontrada");
    }
    res.json(cita)
    console.log(cita)
  } catch (error) {
    console.log(error)
    
  }
}

const buscarHorariosController = async (req, res) => {
  try {
    const fecha = req.params.fecha;
    const citas = await Cita.findAll({ where: { fecha: fecha } });

    if(!citas){
      return res.status(404).send("Citas no encontrada");
    }

    const horarios = citas.map(cita => cita.hora).sort((a, b) => a.localeCompare(b));

    res.json(horarios); // Envía los horarios como respuesta
    console.log(horarios); // Imprime los horarios en la consola
  } catch (error) {
    console.error("Error al buscar horarios:", error);
  }
}




export { crearCitaController, eliminarCitaController, actualizarCita, consultarMatriculaController, buscarHorariosController};
