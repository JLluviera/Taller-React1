import './App.css';
import HeaderGuardianes from './Components/headerGuardianes.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ViewAreas from './Components/ViewAreas.jsx';

function App() {
  return (
    <div className="App">
      <div>
      <HeaderGuardianes />
      </div>     
      <div className="container">
        <ViewAreas />
      </div>
    </div>
  );
}

export default App;
