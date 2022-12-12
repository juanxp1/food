

import { GET_ALL_RECETAS, GET_RECETAS_DETAILS, CREATE_RECETAS, BUSCAR_RECETA, GET_TIPO_DIETS, ORDEN_POR_NAME, ORDEN_POR_PUNTUATION, FILTRO_POR_DIET, RESET_DETALLES } from "../action/index";


const initialState = {
  recetas: [],
  recetasDetail: [],
  tipoDietas: [],
  allRecetas: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {


  

    case GET_ALL_RECETAS:
      return {
        ...state,
        recetas: action.payload,
        allRecetas: action.payload
      };


    case GET_TIPO_DIETS:
      return {
        ...state,
        tipoDietas: action.payload
      }


    case BUSCAR_RECETA:

      return {
        ...state,
        recetas: action.payload
      }





    case GET_RECETAS_DETAILS:
      // console.log("actionpayloead", action.payload)
      //console.log(Array.isArray(action.payload))
      return {
        ...state,
        recetasDetail: action.payload
      };



    case CREATE_RECETAS:
      return {
        ...state,
        recetas: [...state.recetas, action.payload],
      };




    case FILTRO_POR_DIET:
      const allRecipes = state.allRecetas;

      const filteredByDietType = action.payload === "All" ? allRecipes :
        allRecipes.filter(r => r.diets?.some(d => d.name === action.payload.toLowerCase()))

      return {
        ...state,
        recetas: filteredByDietType
      };





    case ORDEN_POR_NAME:
      let order = action.payload === 'asc' ?
        state.recetas.sort(function (a, b) {

          if (a.name.toLowerCase() > b.name.toLowerCase()) {

            return 1
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1
          }
          return 0
        }) :
        state.recetas.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1
          }
          return 0
        })
      return {
        ...state,
        recetas: order

      }

    case ORDEN_POR_PUNTUATION:
      let orderpunt = action.payload === 'menormayor' ?
        state.recetas.sort(function (a, b) {
          if (a.healthScore > b.healthScore) {
            return 1
          }
          if (b.healthScore > a.healthScore) {
            return -1
          }
          return 0
        }) :
        state.recetas.sort(function (a, b) {
          if (a.healthScore > b.healthScore) {
            return -1
          }
          if (b.healthScore > a.healthScore) {
            return 1
          }
          return 0
        })
      return {
        ...state,
        recetas: orderpunt
      }



    case RESET_DETALLES:

      return {
        ...state,
        recetasDetail: []

      }

    default:
      return state;

  }
};




export default rootReducer;
