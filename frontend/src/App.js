import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Sign-in';
import SignUp from './pages/Sign-up';
import CriarEvento from './pages/Criarevento';
import Gastos from './pages/Gastos';
import Pagamento from './pages/Pagamento';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/criarevento' element={<CriarEvento/>}/>
        <Route path='/gastos' element={<Gastos/>}/>
        <Route path='/pagamento' element={<Pagamento/>}/>
      </Routes>
    </Router>
  );
}

export default App;
