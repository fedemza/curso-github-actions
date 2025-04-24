require('dotenv').config();

// saco el nombre de la variable de entorno
nombre = process.env.NOMBRE || "sin nombre";
console.log(`Hola ${nombre}, bien hecho!`);