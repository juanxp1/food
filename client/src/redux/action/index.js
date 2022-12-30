import axios from "axios";
export const GET_ALL_RECETAS = "GET_ALL_RECETAS";
export const GET_RECETAS_DETAILS = "GET_RECETAS_DETAILS";
export const CREATE_RECETAS = "CREATE_RECETAS";
export const BUSCAR_RECETA = "BUSCAR_RECETA";
export const FILTRO_POR_DIET = "FILTRO_POR_DIET";
export const ORDEN_POR_NAME = "ORDEN_POR_NAME";
export const ORDEN_POR_PUNTUATION = "ORDEN_POR_PUNTUATION";
export const GET_TIPO_DIETS = "GET_TIPO_DIETS";
export const RESET_DETALLES = "RESET_DETALLES"









///Mostrar todas las recetas ////
export const getAllRecetas = () => {
    return async function (dispatch) {
        await axios.get('https://food-production-7e38.up.railway.app/recetas')
            .then((response) =>
                dispatch({ type: GET_ALL_RECETAS, payload: response.data })

            )

    };
};



//////////Detalles de recetas ////////////
export const getRecetasDetail = (id) => {

    return async (dispatch) => {
        await axios.get(`https://food-production-7e38.up.railway.app/recetas/${id}`)
            .then((response) =>
                dispatch({ type: GET_RECETAS_DETAILS, payload: response.data })
            )
    };
};




////Mostrar receta creadas////
export const createRecetas = (NewReceta) => {
    return async (dispatch) => {
        await axios
            .post(`https://food-production-7e38.up.railway.app/recetas/`, NewReceta)
            .then((response) =>
                dispatch({ type: CREATE_RECETAS, payload: response.data })
            );
    };

};



/////buscr por Query////
export const buscarRecetas = (name) => {
    return async function (dispatch) {
        const loQue = await fetch(`https://food-production-7e38.up.railway.app/recetas?name=${name}`)
        const response = await loQue.json()
        dispatch({ type: BUSCAR_RECETA, payload: response })
    };
};

/////////////Filtrados///////////////

export function filtroRecetasPorDiet(payload) {
    return {
        type: FILTRO_POR_DIET,
        payload
    }
}

export function ordenPorName(payload) {
    return {
        type: ORDEN_POR_NAME,
        payload
    }
}

export function ordenPorPuntuation(payload) {
    return {
        type: ORDEN_POR_PUNTUATION,
        payload
    }
}


export function getTipoDiets() {

    return async function (dispatch) {
        await axios.get(`https://food-production-7e38.up.railway.app/dietas`)
            .then((response) =>
                dispatch({ type: GET_TIPO_DIETS, payload: response.data })
            )

    }

}


export function resetDetalles() {

    return async function (dispatch) {
        dispatch({
            type: RESET_DETALLES
        })
    }
}