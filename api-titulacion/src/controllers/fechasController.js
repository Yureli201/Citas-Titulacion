import fechasBloqueadas from "../models/fechasBloqueadas.js";

const agregarFechasController = async (req, res) => {
    try {
        // Verifica el contenido del cuerpo de la solicitud
        console.log('Cuerpo de la solicitud:', req.body);

        // Guarda las fechas en la base de datos
        const fechasGuardadas = [];
        for (const fecha of req.body) {
            // Verifica si la fecha ya existe en la base de datos
            const fechaExistente = await fechasBloqueadas.findOne({ where: { fecha } });
            if (!fechaExistente) {
                // Si la fecha no existe, la guarda en la base de datos
                const nuevaFecha = await fechasBloqueadas.create({ fecha });
                console.log('Fecha guardada:', nuevaFecha);
                fechasGuardadas.push(nuevaFecha);
            } else {
                console.log('Fecha ya existente, se omitió:', fecha);
            }
        }

        // Envía una respuesta con las fechas guardadas
        res.json({ message: 'Fechas guardadas correctamente', fechas: fechasGuardadas });
    } catch (error) {
        console.error('Error al guardar fechas:', error);
        res.status(500).json({ error: 'Error interno al procesar la solicitud.' });
    }
};

const obtenerFechasController = async (req, res) => {
    try {
        // Obtén todas las fechas de la tabla fechasBloqueadas
        const fechas = await fechasBloqueadas.findAll();

        // Mapea los resultados para extraer solo las fechas como cadenas
        const fechasComoString = fechas.map(fecha => fecha.fecha.toString());

        // Envía las fechas como cadena de texto en la respuesta JSON
        res.json(fechasComoString);
    } catch (error) {
        console.error('Error al obtener fechas:', error);
        res.status(500).json({ error: 'Error interno al obtener las fechas.' });
    }
};

const eliminarFechasController = async (req, res) => {
    try {
        const fechasAEliminar = req.body;

        // Guarda las fechas eliminadas
        const fechasEliminadas = [];
        for (const fecha of fechasAEliminar) {
            // Busca y elimina las fechas que coincidan con la fecha en la base de datos
            const eliminadas = await fechasBloqueadas.destroy({ where: { fecha } });
            if (eliminadas > 0) {
                console.log(`Fechas eliminadas para la fecha ${fecha}: ${eliminadas}`);
                fechasEliminadas.push({ fecha, eliminadas });
            } else {
                console.log(`No se encontraron fechas para la fecha ${fecha}`);
            }
        }

        res.json({ message: 'Fechas eliminadas correctamente', fechas: fechasEliminadas });
    } catch (error) {
        console.error('Error al eliminar fechas:', error);
        res.status(500).json({ error: 'Error interno al procesar la solicitud.' });
    }
};

const eliminarTodasController = async (req,res) =>{
    try {
        // Elimina todas las fechas de la tabla
        await fechasBloqueadas.destroy({
            where: {},
          truncate: true // Esto asegura que todas las filas sean eliminadas
        });
        res.json("Lista limpia")
    } catch (error) {
        console.error('Error al eliminar todas las fechas:', error);
        res.status(500).json({ success: false, error: 'Error al eliminar todas las fechas' });
    }
}


export {agregarFechasController, obtenerFechasController, eliminarFechasController, eliminarTodasController};