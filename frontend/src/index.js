import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Sign-in';
import SignUp from './pages/Sign-up';
import CriarEvento from './pages/Criarevento';
import Gastos from './pages/Gastos';
import Pagamento from './pages/Pagamento';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/criarevento",
    element: <CriarEvento/>,
  },
  {
    path: "/gastos",
    element: <Gastos/>,
  },
  {
    path: "/pagamento",
    element: <Pagamento/>,
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
