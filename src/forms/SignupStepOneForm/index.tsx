import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';

// SERVICE
import ValidationForms from '../../config/services/ValidationForms';

import './style.scss'

interface data {
  name: string,
  email: string,
  birthDate: string,
  cpf: string
}

interface Props {
  setStepForm: React.Dispatch<React.SetStateAction<number>>
  setDataUser: React.Dispatch<React.SetStateAction<data>>
}

interface validation {
  status: boolean,
  message: string
}

const SignupStepOneForm = ({setStepForm, setDataUser}: Props) => {

  const [ name, setName ] = useState<string>('');
  const [ nameStatus, setNameStatus ] = useState<validation>();
  const [ email, setEmail ] = useState<string>('');
  const [ emailStatus, setEmailStatus ] = useState<validation>();
  const [ birthDate, setBirthDate ] = useState<string>('');
  const [ birthDateStatus, setBirthDateStatus ] = useState<validation>();
  const [ cpf, setCpf ] = useState<string>('');
  const [ cpfStatus, setCpfStatus ] = useState<validation>();

  /**
   * Validation of the name field and activation of the warning box
   */
  function onBlurName() {
    let boxWarning = document.querySelector('.box-warning-name');
    let validation = ValidationForms.validateName(name);
    
    if(validation.status) {
      boxWarning?.classList.add('box-warning-active');
    } else {
      boxWarning?.classList.remove('box-warning-active');
    }

    setNameStatus(validation);
  }

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
   * Validation of the birth date field and activation of the warning box
   */
  function onBlurBirthDate() {
    let boxWarning = document.querySelector('.box-warning-birth-date');
    let validation = ValidationForms.validateDate(birthDate);
    
    if(validation.status) {
      boxWarning?.classList.add('box-warning-active');
    } else {
      boxWarning?.classList.remove('box-warning-active');
    }

    setBirthDateStatus(validation);
  }

  /**
   * Validation of the cpf field and activation of the warning box
   */
  function onBlurCpf() {
    let boxWarning = document.querySelector('.box-warning-cpf');
    let validation = ValidationForms.validateCpf(cpf);
    
    if(validation.status) {
      boxWarning?.classList.add('box-warning-active');
    } else {
      boxWarning?.classList.remove('box-warning-active');
    }

    setCpfStatus(validation);
  }

  /**
   * Validation of all fields and go to step 2
   */
  function handleGoToStepTwo() {
    let boxWarningName = document.querySelector('.box-warning-name');
    let boxWarningEmail = document.querySelector('.box-warning-email');
    let boxWarningBirthDate = document.querySelector('.box-warning-birth-date');
    let boxWarningCpf = document.querySelector('.box-warning-cpf');
    let validationName = ValidationForms.validateName(name);
    let validationEmail = ValidationForms.validadeEmail(email);
    let validationBirthDate = ValidationForms.validateDate(birthDate);
    let validationCpf = ValidationForms.validateCpf(cpf);
    
    if(validationName.status) {
      boxWarningName?.classList.add('box-warning-active');
    } else {
      boxWarningName?.classList.remove('box-warning-active');
    }
    
    if(validationEmail.status) {
      boxWarningEmail?.classList.add('box-warning-active');
    } else {
      boxWarningEmail?.classList.remove('box-warning-active');
    }
    
    if(validationBirthDate.status) {
      boxWarningBirthDate?.classList.add('box-warning-active');
    } else {
      boxWarningBirthDate?.classList.remove('box-warning-active');
    }
    
    if(validationCpf.status) {
      boxWarningCpf?.classList.add('box-warning-active');
    } else {
      boxWarningCpf?.classList.remove('box-warning-active');
    }

    if(
      !validationName.status && 
      !validationEmail.status && 
      !validationBirthDate.status && 
      !validationCpf.status
    ) {
      let dividerBirthDate = birthDate.split('/');

      let cpfLite = cpf.replace(/[^\d]+/g, '');
      let birthDateLite = `${dividerBirthDate[2]}-${dividerBirthDate[1]}-${dividerBirthDate[0]}`;

      let data: data = {
        name: name,
        email: email,
        birthDate: birthDateLite,
        cpf: cpfLite
      }

      setDataUser(data);
      setStepForm(2);
    }

    setNameStatus(validationName);
    setEmailStatus(validationEmail);
    setBirthDateStatus(validationBirthDate);
    setCpfStatus(validationCpf);
  }

  return (
    <div className="signup-step-one-form-content">
      <div className="box-warning">
        <div className="box-warning-name" onClick={()=>document.querySelector('.box-warning-name')?.classList.remove('box-warning-active')}>
          { nameStatus && nameStatus.status &&
            <p className="message">{nameStatus.message}</p>
          }
        </div>

        <div className="box-warning-email" onClick={()=>document.querySelector('.box-warning-email')?.classList.remove('box-warning-active')}>
          { emailStatus && emailStatus.status &&
            <p className="message">{emailStatus.message}</p>
          }
        </div>

        <div className="box-warning-birth-date" onClick={()=>document.querySelector('.box-warning-birth-date')?.classList.remove('box-warning-active')}>
          { birthDateStatus && birthDateStatus.status &&
            <p className="message">{birthDateStatus.message}</p>
          }
        </div>

        <div className="box-warning-cpf" onClick={()=>document.querySelector('.box-warning-cpf')?.classList.remove('box-warning-active')}>
          { cpfStatus && cpfStatus.status &&
            <p className="message">{cpfStatus.message}</p>
          }
        </div>
      </div>

      <div className="group-inputs-1">
        <input 
          type="email" 
          placeholder='Nome completo' 
          value={name} 
          onChange={(n)=>setName(n.target.value)} 
          onBlur={onBlurName}
        />

        <input 
          type="email" 
          placeholder='E-mail' 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          onBlur={onBlurEmail}
        />
      </div>

      <div className="group-inputs-2">
        <InputMask 
          mask='99/99/9999' 
          placeholder='Data de nascimento' 
          value={birthDate} 
          onChange={(b)=>setBirthDate(b.target.value)} 
          onBlur={onBlurBirthDate}  
        />

        <InputMask 
          mask='999.999.999-99' 
          placeholder='CPF' 
          value={cpf} 
          onChange={(c)=>setCpf(c.target.value)} 
          onBlur={onBlurCpf}
        />
      </div>

      <button className="button-to-enter" onClick={handleGoToStepTwo}>Proximo</button>

      <p className="redirect-sigin">Já tem cadastro? Faça <Link to='/signin'>login aqui</Link></p>
    </div>
  )
}

export default SignupStepOneForm;