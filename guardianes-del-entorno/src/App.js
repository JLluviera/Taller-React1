import './App.css';
import HeaderGuardianes from './Components/headerGuardianes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ViewAreas from './Components/Areas/ViewAreas.jsx';
import ViewSpecies from './Components/Especies/ViewSpecies.jsx';
import Footer from './Components/Footer.jsx';
import CargaDatosEspecies from './Components/ModalCargaDatos/CargaDatosEspecies.jsx';

function App() {
  return (
    <div className="App">
      <div>
      <HeaderGuardianes />
      </div>     
      <div className="container">
        <ViewAreas />
      </div>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="w-100 text-center">
            <h1>Lista de especies</h1> 
          </div>
          <div className="ms-auto">
            <CargaDatosEspecies />
          </div>
        </div>
        <ViewSpecies />
      </div>
    <div>
      <Footer />
    </div>
    </div>  
  );
}

export default App;
