import './App.css';
import HeaderGuardianes from './Components/headerGuardianes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ViewAreas from './Components/ViewAreas.jsx';
import ViewSpecies from './Components/Especies/ViewEspecies.jsx';
import Footer from './Components/Footer.jsx';

function App() {
  return (
    <div className="App">
      <div>
      <HeaderGuardianes />
      </div>     
      <div className="container">
        <ViewAreas />
      </div>
      <div className='container'>
        <h1>Lista de especies</h1>
        <ViewSpecies />
    </div>
    <div>
      <Footer />
    </div>
    </div>
  );
}

export default App;
