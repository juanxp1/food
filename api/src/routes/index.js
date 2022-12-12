const { Router } = require('express');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recetas = require('./recetas.js');
const dietas = require('./dietas.js'); 



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recetas', recetas);  //api/recetas/
router.use('/dietas', dietas);    // api/dietas/




module.exports = router;
