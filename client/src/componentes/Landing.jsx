

import React from 'react'
import video from '../fotos/chef.mp4';
import style from '../componentes/landing.module.css';
import { Link } from "react-router-dom";


export const Landing = () => {
  return (

    <div className={style.main}>
      <div className={style.over}></div>
      <video className={style.video} src={video} autoPlay loop muted />
      <div className={style.texto}>
        <h1 className={style.h1}>Bievenidos</h1>
        <p className={style.p}>A la felicidad</p>

        <Link to="/home" className={style.neon}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          Ingresar
        </Link>




      </div>
    </div>

  )
}
