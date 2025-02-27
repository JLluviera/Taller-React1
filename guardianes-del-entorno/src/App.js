import './App.css';
import HeaderGuardianes from './Components/headerGuardianes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ViewSpecies from './Components/Especies/ViewEspecies.jsx';
import Footer from './Components/Footer.jsx';
import ListAreas from './Components/Areas/ListAreas.jsx';

function App() {
  return (
    <div className="App">
      <head>
        <link
         rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

      </head>
      <div>
      <HeaderGuardianes />
      </div>     
      <div className="container">
        <ListAreas/>
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
