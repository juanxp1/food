import './App.css';

import { Route, BrowserRouter } from "react-router-dom";
import Home from './componentes/Home';
import { Landing } from './componentes/Landing';
import Nav from './componentes/Nav'
//import Search from './componentes/Search';
import Detalles from './componentes/Detalles';
import Crear from './componentes/Crear'







function App() {
  return (
    //react fragment --> <> </>
    <>
      <BrowserRouter>



        <Route path="/recetas/:id" component={Detalles} />
        <Route path="/home" component={Nav} />
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/create" component={Crear} />


      </BrowserRouter>


    </>




  );
}

export default App;
