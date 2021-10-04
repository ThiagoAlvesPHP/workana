import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// SERVICE
import Api from '../../config/services/Api';

import './style.scss'

const MyAccountForm = () => {

  const [ name, setName ] = useState<string>('');
  const [ nameEdition, setNameEdition ] = useState<boolean>(true);
  const [ email, setEmail ] = useState<string>('');
  const [ emailEdition, setEmailEdition ] = useState<boolean>(true);
  const [ birthDate, setBirthDate ] = useState<string>('');
  const [ cpf, setCpf ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ passwordEdition, setPasswordEdition ] = useState<boolean>(true);

  useEffect(()=>{
    requestUser();
  }, [])

  /**
   * Get the information from the logged in user
   */
  async function requestUser() {
    if(Cookies.get('token')) {
      let token: string = String(Cookies.get('token'));

      let dataUser = await Api.infoUser('/p/customer', token);

      let birthdayDivider = dataUser.birthday.split('-');
      let birthDateLite = `${birthdayDivider[2]}/${birthdayDivider[1]}/${birthdayDivider[0]}`;

      setName(dataUser.fullName);
      setEmail(dataUser.email);
      setBirthDate(birthDateLite);
      setCpf(dataUser.cpfCnpj.substring(0, 3)+'********');
    }
  }

  return (
    <div className="my-account-form-area">
      <h2 className="title">Meu cadastro</h2>

      <label className="input">
        <p>Nome completo</p>
        <input type="text" className="input-disabled" disabled={nameEdition} placeholder='Nome e Sobrenome' value={name} onChange={(n)=>setName(n.target.value)} />
        <span onClick={()=>setNameEdition(false)}>Alterar</span>
      </label>
      
      <label className="input">
        <p>E-mail</p>
        <input type="email" className="input-disabled" disabled={emailEdition} placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <span onClick={()=>setEmailEdition(false)}>Alterar</span>
      </label>

      <label className="input">
        <p>Data de nascimento</p>
        <input type="text" disabled value={birthDate} onChange={(b)=>setBirthDate(b.target.value)} />
      </label>

      <label className="input">
        <p>CPF</p>
        <input type="text" disabled value={cpf} onChange={(c)=>setCpf(c.target.value)} />
      </label>

      <label className="input">
        <p>Senha</p>
        <input type="password" className="input-disabled" disabled={passwordEdition} placeholder='Senha do Usuario' value={password} onChange={(p)=>setPassword(p.target.value)} />
        <span onClick={()=>setPasswordEdition(false)}>Alterar</span>
      </label>

      <button className="button-save-editions">
        Salvar alterações
      </button>
    </div>
  )
}

export default MyAccountForm;