import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

import './style.scss';

export default () => {
  return (
    <div className="modal-register-success-area">
      <div className="modal-register-success">
        <FaCheckCircle />
        <h2>Sua conta foi criada<br /> com sucesso :)</h2>
        <Link to='/signin'>Começar</Link>
      </div>
    </div>
  )
}