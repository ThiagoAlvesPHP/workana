import React from 'react';
import { FaChevronRight, FaHome, FaFileAlt, FaCog, FaCube, FaPowerOff, FaCreditCard, FaGavel, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

// FORM
import MyAccountForm from '../../forms/MyAccountForm';

// SERVICE
import AuthHandler from '../../config/services/AuthHandler';

import './style.scss';

const Home = () => {

  /**
   * Disconnect the logged in user by removing the token
   */
  function handleLogout() {
    AuthHandler.doLogout();

    window.location.href = '/signin';
  }

  return (
    <React.Fragment>
      <section id="breadcrumbs-home">
        <div className="container">
          <p>Pagina inicial <span><FaChevronRight /> Meus arremates</span></p>
        </div>
      </section>

      <section id="content-my-account">
        <div className="container">
          <aside>
            <h2 className="title">Minha Conta</h2>

            <ul className="menu-my-account">
              <li><FaHome /> Página Inicial</li>
              <li><FaFileAlt /> Como funciona</li>
              <li className="active"><FaCog /> Meu cadastro</li>
              <li><FaGavel /> Meus arremates</li>
              <li><FaCreditCard /> Pagamentos</li>
              <li><FaCube /> Retirada</li>
              <li onClick={handleLogout}><FaPowerOff /> Sair</li>
            </ul>

            <div className="contact">
              <p>Atendimento: </p>

              <div className="button-whatsapp">
                <FaWhatsapp /> Via Whatsapp
              </div>
              <div className="button-email">
                <FaEnvelope /> Via e-mail
              </div>

              <span>segunda a domingo: 8h às 20h (exceto feriados)</span>
            </div>
          </aside>
          <section>
            <MyAccountForm />
          </section>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Home;