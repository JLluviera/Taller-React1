import './App.css';
import HeaderGuardianes from './Components/headerGuardianes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ViewAreas from './Components/Areas/ViewAreas.jsx';
import ListaEspecies from './Components/Especies/ListaEspecies.jsx';
import Footer from './Components/Footer.jsx';
import ListAreas from './Components/Areas/ListAreas.jsx';
import CargaDatosEspecies from './Components/ModalCargaDatos/CargaDatosEspecies.jsx';
function App() {
  return (
    <div className="App">
     
      <div>
      <HeaderGuardianes />
      </div>     
      <div className="container">
        <ListAreas/>
      </div>
      <div className="container">
        <ListaEspecies />
      </div>
    <div>
      <Footer />
    </div>
    </div>  
  );
}

export default App;
