import { DataTypes } from "sequelize";
import db from "../config/db.js";

const fechasBloqueadas = db.define(
"fechasBloqueadas",
{
fecha: {
type: DataTypes.STRING,
allowNull:false
}
}
)

export default fechasBloqueadas;
