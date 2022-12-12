const { Diet, Recipe } = require('../db');
const { Router } = require('express');
const axios = require('axios');
const router = Router();
require('dotenv').config();

const { YOUR_API_KEY } = process.env



// Configurar los routersc
// Ejemplo: router.use('/auth', authRouter);





////////////////// ESTA FUNCION TRAE TODA LA INFO DE LA API ///////////////////////////////
const allApiInfo = async () => {
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`);
  const apiUrl = await response.json();
  const apiInfo = await apiUrl?.results?.map(e => {
    // console.log("cechequeandoApiNFO", apiUrl.results)
    return {
      id: e.id,
      name: e.title,
      summary: e.summary,
      score: e.spoonacularScore,
      diets: e.diets.map(d => { return { name: d } }),
      healthScore: e.healthScore,
      image: e.image,
      createdInDb: false,
      steps: e.analyzedInstructions[0]?.steps.map(paso => {
        return `${paso.number} ${paso.steps}`
      })
    }
  })
  return apiInfo;
};
////////////////// ///////////////////////////////////////////////////////////////////

/////////////////////// Info de nuestra base de dato////////////////////////
const allDbData = async () => {
  const db = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }
  })
  return db
};
////////////////// ///////////////////////////////////////////////////////////////////



/////////////////// base de datos y en la Api  concatenada///////////////////////////
const allData = async () => {
  const apiData = await allApiInfo();
  const dbData = await allDbData();

  const allDataContainer = apiData?.concat(dbData);

  return allDataContainer
};

//////////////////// /////////////////////////////////////////////////////////////////////






/////// ESTA ES LA FUNCION QUE UTILIZAMOS PARA BUSCAR POR QUERY/////////////////

const nameReceta = async (name) => {

  const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=2&apiKey=${YOUR_API_KEY}`);
  const { results } = resAxios.data;
  if (results.length > 0) {
    let response = results?.map((result) => {
      return {
        name: result.title,
        vegetarian: result.vegetarian,
        vegan: result.vegan,
        glutenFree: result.glutenFree,
        dairyFree: result.dairyFree,
        image: result.image,
        id: result.id,
        score: result.spoonacularScore,
        healthScore: result.healthScore,
        types: result.dishTypes?.map(element => element),
        diets: result.diets?.map(element => element),
        summary: result.summary,
        steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps ? result.analyzedInstructions[0].steps.map(item => item.step).join(" \n") : '')
      }
    })
    return response
  }
}
////////////////// ///////////////////////////////////////////////////////////////////

////////////////////////////////Rutas////////////////////////////////////////

// ESTA RUTA BUSCA POR POR PARAMETRO EN LA BASE DE DATOS Y SI NO EXISTE BUSCA EN LA API 

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const recetasByName = await Recipe.findOne({
        where: { name: name },
        include: {
          model: Diet,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        }
      });

      if (recetasByName) {
        return res.status(200).send([recetasByName]);
      }

      const api = await nameReceta(name)

      if (api) {
        return res.status(200).send(api);
      }
    }


    const allRecetas = await allData()
    if (allRecetas) {
      return res.status(200).send(allRecetas);
    }

  } catch (error) {
    res.status(404).send("NotFound")
  }

})



// /////////////Esta ruta crea un post de una nueva receta con la tabla de los Models
router.post('/', async (req, res) => {

  try {
    const { name, summary, score, healthScore, image, steps, diets } = req.body;

    const newRecipe = await Recipe.create(

      req.body,

    );

    const dbDiet = await Diet.findAll({  //Busca en models DIET => diets
      where: {
        name: diets
      },

    })

    newRecipe.addDiet(dbDiet);   //addDiet => metodo de suqualize para asoicial ambos models de ssql
    res.status(200).send('¡Receta creada con éxito!');
  }

  catch (error) {

    res.status(404).send("NotFound")
  }

})
////////////////////////////////////////////////////////








router.get('/:id', async (req, res) => {

  try {

    const { id } = req.params

    if (id.length > 6) {

      const dataDB = await Recipe.findByPk(id, {
        include: {
          model: Diet,
          atributes: ["name"],
          through: {
            attributes: [],
          },

        },
      });

      return res.status(200).send(dataDB)

    } else {


      const resAxios = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}&addRecipeInformation=true`);

      const result = await resAxios.data;
      //console.log("PATRI", result)

      let obj = {};

      obj = {
        name: result.title,
        vegetarian: result.vegetarian,
        vegan: result.vegan,
        glutenFree: result.glutenFree,
        dairyFree: result.dairyFree,
        image: result.image,
        // idApi: result.id,
        score: result.spoonacularScore,
        healthScore: result.healthScore,
        diets: result.diets?.map(element => element), types: result.dishTypes?.map(element => element),
        summary: result.summary,
        steps: result.instructions
      }
      // console.log("OBJ", obj)
      return res.status(200).send(obj)

    }


  } catch (error) {
    console.error(error)

  }
})






module.exports = router;