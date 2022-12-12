import React from "react";
import  style from '../componentes/paginado.module.css'






export default function Paginado ({recipesPerPage ,  receta , paginado}) {
const paginaNumbers = []


    for (let i = 0 ; i < Math.ceil(receta/recipesPerPage) ; i++){
   paginaNumbers.push(i+1)
}
return (
          
    <nav>
        <div className={style.ul} >
            {
                paginaNumbers && paginaNumbers.map(n => (
                    <div className={style.opa} key={n}  >
                    <span className={style.contar} onClick= {() => paginado(n)} >{n}</span>
                    </div>
                ))
            }
        </div>
    </nav>
            
)
}