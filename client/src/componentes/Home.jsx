
import React, { useEffect, useState } from 'react';
import style from '../componentes/home.module.css'

import Tarjeta from "../componentes/Tarjeta";
import { useDispatch, useSelector } from "react-redux"
import { getAllRecetas, ordenPorName, ordenPorPuntuation, filtroRecetasPorDiet, buscarRecetas } from "../redux/action/index";
import { Link } from 'react-router-dom';
import Paginado from '../componentes/Paginado';



function Home() {


  const receta = useSelector((state) => state.recetas)

  const paginado = (paginaNumer) => {
    setCurrentPage(paginaNumer)
  }


  const [search, setSearch] = useState('')
  const [orden, setOrden] = useState('')
  const [order, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage, setrecipesPerPage] = useState(9)
  const indexLastRecipe = currentPage * recipesPerPage
  const indexFirstRecipe = indexLastRecipe - recipesPerPage
  const currentRecipes = receta.length ? receta.slice(indexFirstRecipe, indexLastRecipe) : []





  const dispatch = useDispatch();

  useEffect(() => {
    const getRecetas = async () => { await dispatch(getAllRecetas()) }
    getRecetas();

  }, [dispatch])

  {/*Filtrados*/ }

  function handleFilterTypeDiet(e) {
    // console.log("target", e.target.value)
    dispatch(filtroRecetasPorDiet(e.target.value))
    setCurrentPage(1)
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(ordenPorName(e.target.value))
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`)
  }

  function handlePuntuation(e) {
    e.preventDefault();
    dispatch(ordenPorPuntuation(e.target.value))
    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`)
  }




  return (



    <div className={style.home}>


      {/* FILTRADOS */}

      <div className={style.filtro}>

        <select onChange={e => handleSort(e)} className={style.select}>
          <option value="asc">ascendent(A-Z)</option>
          <option value="des">descendent(Z-A)</option>
        </select>

        <div>
          <select onChange={e => handlePuntuation(e)} className={style.select}>
            <option value="mayormenor">mayor a menor por puntuacion</option>
            <option value="menormayor">menor a mayor por puntuacion</option>
          </select>
        </div>
        <div>
          <select onChange={e => handleFilterTypeDiet(e)} className={style.select}>
            <option value="All">All recipes</option>
            <option value="gluten free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="vegetarian">Vegetarian </option>
            <option value="lacto-vegetarian">Lacto-Vegetarian </option>
            <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="whole 30">Whole 30</option>
          </select>
        </div>
      </div>




      <div className={style.paginado}>
        <Paginado
          recipesPerPage={recipesPerPage}
          receta={receta.length}
          paginado={paginado}
        />
      </div>

      <div className={style.otrodiv}>
        {currentRecipes?.map((receta, index) =>

          <Link className={style.card} to={`/recetas/${receta.id}`} >

            <Tarjeta

              name={receta.name}

              key={index}

              image={receta.image}

              healthScore={receta.healthScore}

              diets={receta.diets?.map(r => r.name)}


            /> </Link>)}

      </div>





    </div >



  );

}

export default Home;