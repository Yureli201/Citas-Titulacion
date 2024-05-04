import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Egresado = db.define(
  "Egresados",
  {
    matricula: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
      unique:true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivelTitulacion: {
      type: DataTypes.ENUM("TSU","Lic/Ing"),
      allowNull: false,
    },
    generacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carreraTitulacion: {
      type: DataTypes.ENUM(
      "Agricultura Sustentable y Protegida",
      "Gastronomía",
      "Procesos Alimentarios",
      "Química Área Biotecnología",
      "Administración Área Capital Humano",
      "Operaciones Comerciales Internacionales Área Negocios Internacionales",
      "Mecatrónica Área Automatización.",
      "Sistemas Automotrices",
      "Mantenimiento Área Industrial",
      "Mantenimiento Área Petróleo",
      "Terapia Física Área Rehabilitación",
      "Tecnologías de la Información Área Desarrollo de Software Multiplataforma",
      "Tecnologías de la Información Área Entornos Virtuales y Negocios Digitales",
      "Biotecnología",
      "Gestión del Capital Humano",
      "Mecatrónica",
      "Mantenimiento Industrial",
      "Terapia Física",
      "Desarrollo y Gestión de Software",
      "Entornos Virtuales y Negocios Digitales"),
      allowNull: false,
    },
    curp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      unique: true,
    },
    telefono: {
      type: DataTypes.BIGINT,
    },
  },
  { timestamps: true }
);

export default Egresado;
