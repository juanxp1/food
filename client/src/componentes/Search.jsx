import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "../componentes/search.module.css";
import { buscarRecetas } from '../redux/action/index'






export default function Search() {
  const dispatch = useDispatch();
  const [receta, setReceta] = useState('');

  return (
    <form className={style.container}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(buscarRecetas(receta));
        setReceta("");
      }}
    >
      <input
        className={style.input}
        type="text"
        placeholder="Buscar Receta 😋 "
        value={receta}
        onChange={(e) => setReceta(e.target.value)}
      />
      <div className={style.btn}>
        <input className={style.boton} type="submit" value="Buscar" />
      </div>
    </form>
  );
}