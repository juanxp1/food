import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { getRecetasDetail, resetDetalles } from '../redux/action'
import style from '../componentes/detalles.module.css'







export default function Detalles() {

    const { id } = useParams();
    const receta = useSelector((state) => state.recetasDetail)
    const dispatch = useDispatch();


    useEffect(() => {
        const getRecetas = async () => { await dispatch(getRecetasDetail(id)) }

        getRecetas();
    }, [dispatch, id])


    function reset() {
        dispatch(resetDetalles())
    }


   
   // console.log("RECETAS", receta)
    //console.log(typeof receta)

    if (receta) {

        return (

            <div className={style.container}>

                <div className={style.izquierda}>
                    <h1 className={style.titulin}>{receta?.name}</h1>
                    <h3 className={style.puntaje}>HealthScore: {receta?.healthScore}</h3>
                    <img className={style.fotito} src={receta?.image} alt="-NO SE PUDO CARGAR TU IMAGEN-" />
                    {Array.isArray(receta?.diets) ? <h5 className={style.diets}>{receta[0]?.diets}</h5> : <h5 className={style.diets}>{receta?.diets}</h5>
                    }

                    <Link onClick={reset} className={style.boton} to="/home">
                        Regresar
                    </Link>
                </div>

                <div className={style.derecha}>

                    <div className={style.summary}>
                        <p className={style.p}>Resumen: {receta.summary?.replace(/<[^>]*>/g, '')}</p>

                    </div>

                    <p className={style.steps}>Pasos: {receta.steps?.replace(/<[^>]*>/g, '')}</p>
                </div>





            </div>
        )

    }

}
