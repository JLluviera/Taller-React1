import './App.css';
import HeaderGuardianes from './Components/headerGuardianes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Footer from './Components/Footer.jsx';
import ListAreas from './Components/Areas/ListAreas.jsx';
import ListSpecies from './Components/Especies/ListSpecies.jsx';
import ListaTodosUsuarios from './Components/Usuario/ListaTodosUsuarios.jsx';

function App() {
  return (
    <div className="App">
     
      <div>
      <HeaderGuardianes />
      </div>     
      <div className="container">
        <ListaTodosUsuarios />
        </div>
      <div className="container">
        <ListAreas/>
      </div>
      <div className="container">
        <ListSpecies />
      </div>
    <div>
      <Footer />
    </div>
    </div>  
  );
}

export default App;
