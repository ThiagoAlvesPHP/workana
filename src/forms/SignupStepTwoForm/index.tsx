import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

// COMPONENT
import ModalRegisterSuccess from '../../components/ModalRegisterSuccess';

// SEVICEs
import ValidationForms from '../../config/services/ValidationForms';
import Api from '../../config/services/Api';

import './style.scss'

interface Props {
  data: {
    name: string,
    email: string,
    birthDate: string,
    cpf: string
  }
}

interface validation {
  status: boolean,
  message: string
}

const SignupStepTwoForm = ({data}: Props) => {

  const history = useHistory();

  const [ username, setUsername ] = useState<string>('');
  const [ usernameStatus, setUsernameStatus ] = useState<validation>();
  const [ password, setPassword ] = useState<string>('');
  const [ passwordStatus, setPasswordStatus ] = useState<validation>();
  const [ visiblePassword, setVisiblePassword ] = useState<boolean>(false);
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const [ confirmPasswordStatus, setConfirmPasswordStatus ] = useState<validation>();
  const [ requestStatus, setRequestStatus ] = useState<validation>();
  const [ statusModalSuccess, setStatusModalSuccess ] = useState<boolean>(false);
  const [ visibleConfirmPassword, setVisibleConfirmPassword ] = useState<boolean>(false);

  /**
   * Setting acceptable characters in the username field
   */
  function onChangeUsername(v: string) {
    var valueLite = v.replace(/[^0-9a-zA-Z_]/g, '');

    setUsername(valueLite);
  }

  /**
   * Validation of the username field and activation of the warning box
   */
  function onBlurUsername() {
    let boxWarning = document.querySelector('.box-warning-username');
    let validation = ValidationForms.validateName(username);
    
    if(validation.status) {
      boxWarning?.classList.add('box-warning-active');
    } else {
      boxWarning?.classList.remove('box-warning-active');
    }

    setUsernameStatus(validation);
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
   * Validation of the confirm password field and activation of the warning box
   */
  function onBlurConfirmPassword() {
    let boxWarning = document.querySelector('.box-warning-confirm-password');
    let validation = ValidationForms.validateConfirmPassword(password, confirmPassword);
    
    if(validation.status) {
      boxWarning?.classList.add('box-warning-active');
    } else {
      boxWarning?.classList.remove('box-warning-active');
    }

    setConfirmPasswordStatus(validation);
  }

  /**
   * Validation of all fields and register user
   */
  async function handleRegister() {
    let boxWarningUsername = document.querySelector('.box-warning-username');
    let boxWarningPassword = document.querySelector('.box-warning-password');
    let boxWarningConfirmPassword = document.querySelector('.box-warning-confirm-password');
    let validationUsername = ValidationForms.validateName(username);
    let validationPassword = ValidationForms.validadePassword(password);
    let validationConfirmPassword = ValidationForms.validateConfirmPassword(password, confirmPassword);
    
    if(validationUsername.status) {
      boxWarningUsername?.classList.add('box-warning-active');
    } else {
      boxWarningUsername?.classList.remove('box-warning-active');
    }

    
    if(validationPassword.status) {
      boxWarningPassword?.classList.add('box-warning-active');
    } else {
      boxWarningPassword?.classList.remove('box-warning-active');
    }

    
    if(validationConfirmPassword.status) {
      boxWarningConfirmPassword?.classList.add('box-warning-active');
    } else {
      boxWarningConfirmPassword?.classList.remove('box-warning-active');
    }

    if(!validationUsername.status && !validationPassword.status && !validationConfirmPassword.status) {
      const { name, email, birthDate, cpf } = data;
      let account = {
        id: email,
        pass: password,
        checkPass: confirmPassword
      }

      let signup = await Api.signup('/o/customer', name, email, username, birthDate, cpf, account);

      if(signup.httpStatusCode === 201) {
        setStatusModalSuccess(true);
      } else {
        document.querySelector('.box-warning-request')?.classList.add('box-warning-active');
        setRequestStatus({status: true, message: signup.message});
      }
    }

    setUsernameStatus(validationUsername);
    setPasswordStatus(validationPassword);
    setConfirmPasswordStatus(validationConfirmPassword);
  }

  return (
    <div className="signup-step-two-form-content">
      { statusModalSuccess &&
        <ModalRegisterSuccess />
      }

      <div className="box-warning">
        <div className="box-warning-username" onClick={()=>document.querySelector('.box-warning-username')?.classList.remove('box-warning-active')}>
          { usernameStatus && usernameStatus.status &&
            <p className="message">{usernameStatus.message}</p>
          }
        </div>

        <div className="box-warning-password" onClick={()=>document.querySelector('.box-warning-password')?.classList.remove('box-warning-active')}>
          { passwordStatus && passwordStatus.status &&
            <p className="message">{passwordStatus.message}</p>
          }
        </div>

        <div className="box-warning-confirm-password" onClick={()=>document.querySelector('.box-warning-confirm-password')?.classList.remove('box-warning-active')}>
          { confirmPasswordStatus && confirmPasswordStatus.status &&
            <p className="message">{confirmPasswordStatus.message}</p>
          }
        </div>

        <div className="box-warning-request" onClick={()=>document.querySelector('.box-warning-request')?.classList.remove('box-warning-active')}>
          { requestStatus && requestStatus.status &&
            <p className="message">{requestStatus.message}</p>
          }
        </div>
      </div>

      <input 
        type="email" 
        placeholder='Nome de usuário' 
        className="input-username" 
        value={username}
        onChange={(u)=>onChangeUsername(u.target.value)}
        onBlur={onBlurUsername}
      />
      
      <p className="warning-username">Use letras ou números, mas evite pontos e espaços</p>

      <div className="group-inputs">
        <label>
          <input 
            type={visiblePassword ? 'text' : 'password'} 
            placeholder='Senha' 
            value={password}
            onChange={(p)=>setPassword(p.target.value)}
            onBlur={onBlurPassword}
          />

          <span onClick={()=>setVisiblePassword(!visiblePassword)}>
            { visiblePassword ?
              <FaEyeSlash />
              :
              <FaEye />
            }
          </span>
        </label>

        <label>
          <input 
            type={visibleConfirmPassword ? 'text' : 'password'} 
            placeholder='Confirmar Senha' 
            value={confirmPassword}
            onChange={(c)=>setConfirmPassword(c.target.value)}
            onBlur={onBlurConfirmPassword}
          />

          <span onClick={()=>setVisibleConfirmPassword(!visibleConfirmPassword)}>
            { visibleConfirmPassword ?
              <FaEyeSlash />
              :
              <FaEye />
            }
          </span>
        </label>
      </div>

      <p className="terms-of-use">Eu concordo com os <a href="">termos e condições de uso</a></p>

      <button className="button-to-enter" onClick={handleRegister}>Concluir</button>

      <p className="redirect-sigin">Já tem cadastro? Faça <Link to='/signin'>login aqui</Link></p>
    </div>
  )
}

export default SignupStepTwoForm;