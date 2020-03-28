import React, { useState } from 'react';

import './global.css'
//JSX ( JavaScript XML)
import Routes from './routes';
// instalar pacote de icones do react => npm install react-icons
// instalar rotas => npm install react-router-dom
// cliente http para fazer chamadas as APIs do backend => npm install axios
function App() {
 
  return (
    <Routes />
    );
}
/*
//import Header from './Header'

function App() {
  //quando precisar armazenar informação sempre criar com useState
  //useState retorna um array com dois valores
  // o primeiro é o valor e o segundo uma funcaoDeAtualizacao
  // Array[ valor , funcaoDeAtualizao]
  const [contador, setCounter] = useState(0);

  function increment(){
    
    setCounter(contador+1);
    console.log(contador);
  }
  return (
    <div>
      <Header>Contador: {contador}</Header>
      <button onClick={increment}>Incrementar</button>
    </div>
    );
}

*/

export default App;
