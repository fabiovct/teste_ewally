import logo from './logo.svg';
import './App.css';
import {BrowserRouter } from 'react-router-dom';
import Header from './componentes/header';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
    
      <Header/>
      <Routes/>
    
    </BrowserRouter>
  );
}

export default App;
