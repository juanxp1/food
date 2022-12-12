const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type:DataTypes.UUID,  //genera un id unico
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey: true,
    },

    name: {  //nombre
      type: DataTypes.STRING,
      allowNull: false, // ALLOWNULL significa que el no puede ser falso
    },
    summary: { //resumen
      type: DataTypes.STRING,
      allowNull: false,
    },

    score: {  //puntaje
      type: DataTypes.INTEGER
    },

    healthScore:{   //puntacion de salud
      type: DataTypes.INTEGER  // dato enumerable
    },

    image: {
      type: DataTypes.STRING
    },

    steps: {  //pasos
      type: DataTypes.TEXT
    },
  });
};
