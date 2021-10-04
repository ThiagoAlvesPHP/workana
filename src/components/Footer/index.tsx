import React from 'react';
import { FaWhatsapp, FaEnvelope, FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa';

import './style.scss';

export default () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-area">
          <div className="social-networks-area">
            <div className="block">
              <div className="logo">
                logo
              </div>
            </div>
            <div className="block">
              <ul>
                <li>Pagina incial</li>
                <li>Minha conta</li>
                <li>Meus leilões</li>
                <li>Favoritos</li>
              </ul>
            </div>
            <div className="block">
              <ul>
                <li>Comprar</li>
                <li>Meus arremates</li>
                <li>Pagamentos</li>
                <li>Retirada</li>
              </ul>
            </div>
            <div className="block">
              <p>Como funciona Termos de serviço Central de ajuda</p>
            </div>
            <div className="block">
              <div className="title">
                Acompanhe:
              </div>

              <div className="social-networks">
                <FaInstagram />
                <FaTwitter />
                <FaFacebookF />
                <FaYoutube />
              </div>
            </div>
          </div>
          <div className="footer">
            <p>Copyright © 2021 site.com.br LTDA</p>
            <p>CNPJ n.° 00.000.000/0000-00 / Av. Lorem ipsum dolor sit amet, n° 000, Austin, Nova Iguaçu/RJ - CEP 00000-000 - empresa do grupo 4U</p>
          </div>
        </div>
        <div className="contact-area">
          <p className='title'>Atendimento:</p>
          <div className="button-whatsapp">
            <FaWhatsapp />
            Via Whatsapp
          </div>
          <div className="button-email">
            <FaEnvelope />
            Via e-mail
          </div>
          <p className='warning'>segunda a domingo: 8h às 20h (exceto feriados)</p>
        </div>
      </div>
    </footer>
  )
}