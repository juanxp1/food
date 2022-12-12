

import React from 'react'
import style from '../componentes/tarjeta.module.css'
import { useDispatch } from 'react-redux'
import { getRecetasDetail } from '../redux/action'



export default function Tarjeta({ name, image, healthScore, diets, id }) {
    const dispatch = useDispatch();
    return (

        <div key={id} className={style.container}>
           
            <div className={style.tarjeta}>
                <div onClick={() => dispatch(getRecetasDetail(id))} />
                <div className={style.card}>
                    <img src={image} className={style.img} alt='DB' />
                    <div className={style.title}>{name}</div>
                    <p className={style.heal}>HealthScore {healthScore}</p>
                    <p className={style.diets}>{diets}</p>
                </div>
            </div>

        </div>


    )
}
