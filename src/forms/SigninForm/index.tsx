import React, { useState } from 'react';
import { FaEye, FaUser, FaKey, FaEyeSlash, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// SERVICEs
import ValidationForms from '../../config/services/ValidationForms';
import Api from '../../config/services/Api';
import AuthHandler from '../../config/services/AuthHandler';

import './style.scss';

interface validation {
  status: boolean,
  message: string
}

const SigninForm = () => {

  const [ email, setEmail ] = useState<string>('');
  const [ emailStatus, setEmailStatus ] = useState<validation>();
  const [ password, setPassword ] = useState<string>('');
  const [ passwordStatus, setPasswordStatus ] = useState<validation>();
  const [ visiblePassword, setVisiblePassword ] = useState<boolean>(false);
  const [ requestStatus, setRequestStatus ] = useState<validation>();

  /**
   * Validation of the email field and activation of the warning box
   */
  function onBlurEmail() {
    let boxWarning = document.querySelector('.box-warning-email');
    let validation = ValidationForms.validadeEmail(email);
    
    if(validation.status) {
      boxWarning?.classList.add('box-warning-active');
    } else {
      boxWarning?.classList.remove('box-warning-active');
    }

    setEmailStatus(validation);
  }

  /**
   * Validation of the password field and activation of the warning box
   */
  function onBlurPassword() {
    let boxWarning = document.querySelector('.box-warning-password');
    let validation = ValidationForms.validadePassword(password);
    
    if(validation.status) {
      boxWarning?.classList.add('box-warning-active');
    } else {
      boxWarning?.classList.remove('box-warning-active');
    }

    setPasswordStatus(validation);
  }

  /**
   * Validation of all fields and request to login
   */
  async function heandleGoHome() {
    let boxWarningEmail = document.querySelector('.box-warning-email');
    let boxWarningPassword = document.querySelector('.box-warning-password');
    let boxWarningRequest = document.querySelector('.box-warning-request');
    let validationEmail = ValidationForms.validadeEmail(email);
    let validationPassword = ValidationForms.validadePassword(password);
    
    if(validationEmail.status) {
      boxWarningEmail?.classList.add('box-warning-active');
    } else {
      boxWarningEmail?.classList.remove('box-warning-active');
    }

    if(validationPassword.status) {
      boxWarningPassword?.classList.add('box-warning-active');
    } else {
      boxWarningPassword?.classList.remove('box-warning-active');
    }

    if(!validationEmail.status && !validationPassword.status) {
      let signin = await Api.signin('/o/customer-login/login', email, password);

      if(signin.token) {
        AuthHandler.doLogin(signin.token);
        
        window.location.href = '/';
      } else {
        setRequestStatus({status: true, message: signin.message});
        boxWarningRequest?.classList.add('box-warning-active');
      }
    }

    setEmailStatus(validationEmail);
    setPasswordStatus(validationPassword);
  }

  return (
    <div className="signin-form-content">
      <div className="box-warning">
        <div className="box-warning-email" onClick={()=>document.querySelector('.box-warning-email')?.classList.remove('box-warning-active')}>
          { emailStatus && emailStatus.status &&
            <p className="message">{emailStatus.message}</p>
          }
        </div>

        <div className="box-warning-password" onClick={()=>document.querySelector('.box-warning-password')?.classList.remove('box-warning-active')}>
          { passwordStatus && passwordStatus.status &&
            <p className="message">{passwordStatus.message}</p>
          }
        </div>

        <div className="box-warning-request" onClick={()=>document.querySelector('.box-warning-request')?.classList.remove('box-warning-active')}>
          { requestStatus && requestStatus.status &&
            <p className="message">{requestStatus.message}</p>
          }
        </div>
      </div>
      
      <label className="input-email" >
        <div className="user-icon-signin">
          <FaUser />
        </div>
        <input 
          type="email" 
          placeholder='Usuário' 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          onBlur={onBlurEmail}
        />
      </label>

      <label className="input-password">
        <div className="key-icon-signin">
          <FaKey />
        </div>
        <input 
          type={visiblePassword ? 'text' : 'password'} 
          placeholder="Senha" 
          value={password} onChange={(p)=>setPassword(p.target.value)} 
          onBlur={onBlurPassword}  
        />
        <span className="button-visible-password" onClick={()=>setVisiblePassword(!visiblePassword)}>
          { visiblePassword ?
            <FaEyeSlash />
            :
            <FaEye />
          }
        </span>
      </label>

      <Link to='forgot-password' className="redirect-forgot-password">Esqueceu a senha?</Link>

      <button className="button-to-enter" onClick={heandleGoHome}>Entrar</button>

      <p className="redirect-signup">Não tem uma conta? <Link to='/signup'>Cadastre-se</Link></p>

      <div className="divider-shapes-to-enter">
        <div className="line-1"></div>
        <div className="text">ou</div>
        <div className="line-2"></div>
      </div>

      <div className="button-google">
        <img src="../../assets/google-icon.png" alt="" />
        Entrar com Google
      </div>

      <div className="button-facebook">
        <FaFacebookF />
        Entrar com Facebook
      </div>
    </div>
  )
}

export default SigninForm;