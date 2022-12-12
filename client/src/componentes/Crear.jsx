import { React, useState, useEffect } from "react";
import { createRecetas, getTipoDiets } from "../redux/action/index";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from '../componentes/crear.module.css'
import foto from '../fotos/sal.png'





const Crear = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: "",
    score: 0,
    image: "",
    diets: ""

  });



  const [errors, setErrors] = useState({});

  const validate = (input) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;



    if (!input.name.trim()) {
      errors.name = "El campo 'Name' es obligatorio";

    } else if (!regexName.test(input.name)) {
      errors.name = "El campo 'Name' solo acepta letras y espacios en blanco";
    }

    return errors;
  };


  function handleChange(event) {
    if (event.target.id === "typeSelect") {
      const updatedTypes = [...values.types, event.target.value];
      setValues({
        ...values,
        types: updatedTypes,
      });
    } else {
      setErrors(
        validate({
          ...values,
          [event.target.name]: event.target.value,
        })
      );
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!values.name.length) alert("Tienes que completar el nombre")
    if (!values.summary.length) alert("El campo summary tiene que tener un valor")

    else {
      dispatch(createRecetas(values));
      alert("RECETA CREADA :D");
    }
  }

  /////Filtrados////


  useEffect(() => {
    const setRecetas = async () => { await dispatch(getTipoDiets()) }
    setRecetas();
  }, [dispatch])







  return (
    <div className={style.cont}>
      <div className={style.containerss}>
        <img className={style.foti} src={foto} alt="foto" />
        <form className={style.form} onSubmit={handleSubmit}>
          <label>Name </label>
          <input type="text" name="name" onChange={handleChange} />
          {errors.name && <p className={style.danger}>{errors.name}</p>}

          <label>Dieta</label>
          <input type="text" name="diets" onChange={handleChange} />

          <label>HealthScore</label>
          <input type="text" name="healthScore" onChange={handleChange} />
          <label>Score </label>
          <input type="text" name="score" onChange={handleChange} />
          <label>summary </label>
          <input type="text" name="summary" onChange={handleChange} />
          <label>instructions </label>
          <input type="text" name="instructions" onChange={handleChange} />
          <label>image </label>
          <input type="text" name="image" onChange={handleChange} />
          <label>steps </label>
          <input type="text" name="steps" onChange={handleChange} />

          <button className={style.b} type="submit">Crear Receta</button>
        </form>
        <Link className={style.botoncin} to="/home">
          Regresar        </Link>
      </div>
    </div>
  );
};

export default Crear;