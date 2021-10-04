import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

// FORM
import SigninForm from '../../forms/SigninForm';

import './style.scss';

const SignIn = () => {
  return (
    <React.Fragment>
      <section id="breadcrumbs-signin">
        <div className="container">
          <p>Pagina inicial <span><FaChevronRight /> Cadastre-se</span></p>
        </div>
      </section>

      <section id="sigin-area">
        <div className="container">
          <h1 className="title">Olá! Seja bem-vindo ao EasyBind4U</h1>
          <p className="sub-title">Entre com seu nome de usuário e senha.</p>
          <SigninForm />
        </div>
      </section>
    </React.Fragment>
  )
}

export default SignIn;