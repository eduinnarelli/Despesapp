import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
  <div className="box-layout box-layout--not-found">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Página não encontrada!</h1>
      <Link className="button" to="/">Voltar</Link>
    </div>
  </div>
);

export default NotFoundPage;