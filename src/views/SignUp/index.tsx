import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

// FORMs
import SignupStepOneForm from '../../forms/SignupStepOneForm';
import SignupStepTwoForm from '../../forms/SignupStepTwoForm';

import './style.scss';

interface data {
  name: string,
  email: string,
  birthDate: string,
  cpf: string
}

const SignUp = () => {

  const [ step, setStep ] = useState<number>(1);
  const [ data, setData ] = useState<data>({name: '', email: '', birthDate: '', cpf: ''});

  useEffect(()=>{
    if(step === 1) {
      document.getElementById('step-1')?.classList.add('step-active');
      document.getElementById('step-2')?.classList.remove('step-active');
    } else {
      document.getElementById('step-1')?.classList.remove('step-active');
      document.getElementById('step-2')?.classList.add('step-active');
    }
  }, [step])

  return (
    <React.Fragment>
      <section id="breadcrumbs-signup">
        <div className="container">
          <p>Pagina inicial <FaChevronRight /> Cadastre-se <span><FaChevronRight /> Dados Pessoais</span></p>
        </div>
      </section>

      <section id="signup-area">
        <div className="container">
          <div className="steps-signup">
            <div id="step-1" className="step" onClick={()=>setStep(1)}>1</div>
            <div className="line"></div>
            <div id="step-2" className="step">2</div>
          </div>
          
          { step === 1 ?
            <h1>Preencha os campos para<br /> prosseguir com o cadastro</h1>
            :
            <h1>Pra terminar, defina um nome<br /> de usuario e uma senha</h1>
          }

          { step === 1 ?
            <SignupStepOneForm setStepForm={setStep} setDataUser={setData} />
            :
            <SignupStepTwoForm data={data} />
          }
        </div>
      </section>
    </React.Fragment>
  )
}

export default SignUp;