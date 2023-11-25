import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Principal from './pages/Principal';
import Home from './pages/Home';
import SignIn from './pages/Sign-in';
import SignUp from './pages/Sign-up';
import CriarEvento from './pages/Criarevento';
import Gastos from './pages/Gastos';
import Pagamento from './pages/Pagamento';
import ErrorPage from './pages/ErrorPage';
import EditarPerfil from './pages/EditarPerfil'
import Evento from './pages/Evento';
import Convite from './pages/Convite';
import EditarEvento from './pages/EditarEvento';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Principal/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/home/:userId",
    element: <Home/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/signin",
    element: <SignIn/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/criarevento/:userId",
    element: <CriarEvento/>,
  },
  {
    path: "/gastos",
    element: <Gastos/>,
  },
  {
    path: "/pagamento/:userId/:eventoId",
    element: <Pagamento/>,
  },
  {
    path: "/editarperfil/:userId",
    element: <EditarPerfil/>,
  }
  ,
  {
    path: "/evento/:userId/:eventoId",
    element: <Evento/>,
  },
  {
    path: "/convite/:userId/:eventoId",
    element: <Convite/>,
  },
  {
    path: "/editarevento/:userId/:eventoId",
    element: <EditarEvento/>,
  }
]);





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <RouterProvider router = {router}/>
  </React.StrictMode>
);
reportWebVitals();
