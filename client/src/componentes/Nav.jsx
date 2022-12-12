import React from 'react'
import Search from './Search';
import  style from '../componentes/nav.module.css';
import food from '../fotos/food.png';
import { Link } from 'react-router-dom';



export default function Nav() {
  return (


    <div className={style.nav}>
      <img className={style.logo} src={food} alt="GIF" />
      <div className={style.create}>
        <Search />
      </div>
      <div className={style.tuje}>
        <div className={style.crear}><Link className={style.btn} to="/create">Crear Receta</Link></div></div>
       

    </div>

  )
}

