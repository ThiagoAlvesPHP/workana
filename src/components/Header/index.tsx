import React, { useEffect, useState } from "react";
import { FaSistrix, FaBars, FaUser, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// SERVICE
import AuthHandler from "../../config/services/AuthHandler";

import './style.scss'

export default () => {

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [pageIcon, setPageIcon] = useState<boolean>(false);

  useEffect(() => {
    logged();
  }, [])

  /**
   * Check if the user is logged in and change the header icon
   */
  function logged() {
    setIsLogged(AuthHandler.isLogged());

    if (window.location.href.substr(window.location.href.length - 1, 1) === '/') {
      setPageIcon(true);
    } else {
      setPageIcon(false);
    }
  }

  return (
    <header>
      <div className="container">
        <div className="group-mobile-1">
          <div className="bars-icon-mobile">
            {pageIcon ?
              <FaArrowLeft />
              :
              <FaBars />
            }
          </div>

          <div className="logo-mobile">
            logo
          </div>
        </div>

        <div className="logo">
          logo
        </div>

        <div className="input">
          <input type="text" className="search" placeholder='O que você está procurando?' />

          <button className="button-search">
            <FaSistrix />
          </button>
        </div>

        {isLogged ?
          <div className="my-account-area">
            <div className="credits">
              <p>Você tem: </p>
              <span>42 Créditos</span>
            </div>
            <div className="my-account">
              <p><FaUser /> Minha conta</p>
            </div>
          </div>
          :
          <ul className="menu">
            <li><Link to='/signin'>Entrar</Link></li>
            <li><Link to='/signup'>Cadastrar-se</Link></li>
          </ul>
        }

        <div className="group-mobile-2">
          <div className="search-icon-mobile">
            <FaSistrix />
          </div>

          <div className="user-icon-mobile">
            <FaUser />
          </div>
        </div>
      </div>
    </header>
  )
}