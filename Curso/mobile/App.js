import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import Routes from './src/routes';
//caseo não identifique a instalação do yarn -> npm install -g yarn
// eexecutar o yarn -> yarn start

//para usar link com API, instalar axios => npm install axios
//para formatar valore no android, instalar intl => npm install intl
export default function App() {
  return (
    <Routes />
  );
}