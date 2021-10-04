interface validation {
  status: boolean,
  message: string
}

export default {
  /**
   * validation of email fields
   * 
   * @param email 
   * @returns 
   */
  validadeEmail: (email: string): validation => {
    let validation: validation = {status: false, message: ''};

    if(email === '') {
      validation.status = true;
      validation.message = 'Preencha o campo de email!';
    } else {
      if(email.indexOf('@') < 0) {
        validation.status = true;
        validation.message = 'Campo e-mail invalido!';
      } else {
        let divider = email.split('@');

        if(divider[1].indexOf('.') < 0) {
          validation.status = true;
          validation.message = 'E-mail invalido!';
        } else {
          divider = divider[1].split('.');

          if(divider[1].length != 3) {
            validation.status = true;
            validation.message = 'E-mail invalido!';
          } else {
            validation.status = false;
            validation.message = '';
          }
        }
      }
    }

    return validation;
  },

  /**
   * validation of password fields
   * 
   * @param password 
   * @returns 
   */
  validadePassword: (password: string): validation => {
    let validation: validation = {status: false, message: ''};
    
    if(password === '') {
      validation.status = true;
      validation.message = 'Preencha o campo de senha!';
    } else {
      if(password.length < 5) {
        validation.status = true;
        validation.message = 'Campo de senha tem que ter mais de 5 caracteres!';
      } else {
        validation.status = false;
        validation.message = '';
      }
    }

    return validation;
  },
  
  /**
   * validation of name fields
   * 
   * @param name 
   * @returns 
   */
  validateName: (name: string): validation => {
    let validation: validation = {status: false, message: ''};
    
    if(name === '') {
      validation.status = true;
      validation.message = 'Preencha o campo de nome!';
    } else {
      if(name.length < 4) {
        validation.status = true;
        validation.message = 'Campo de nome tem que ter mais de 4 caracteres!';
      } else {
        validation.status = false;
        validation.message = '';
      }
    }

    return validation;
  },

  /**
   * validation of date fields
   * 
   * @param date 
   * @returns 
   */
  validateDate: (date: string): validation => {
    let validation: validation = {status: false, message: ''};
    
    if(date === '' || date === '__/__/____') {
      validation.status = true;
      validation.message = 'Preencha o campo de data!';
    } else {
      if(date.substr(date.length - 1, 1) === '_') {
        validation.status = true;
        validation.message = 'Campo de data invalido!';
      } else {
        validation.status = false;
        validation.message = '';
      }
    }

    return validation;
  },

  /**
   * validation of cpf fields
   * 
   * @param cpf 
   * @returns 
   */
  validateCpf: (cpf: string): validation => {
    let validation: validation = {status: false, message: ''};
    
    cpf = cpf.replace(/[^\d]+/g, '');
    // Eliminates known invalid CPFs    
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"){
        
        validation.status = true;
        validation.message = 'Preencha o campo de CPF corretamente!';
        return validation;
    }
    // Validate 1st digit
    var add = 0;
    var i;
    var rev;
    for (i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(9))){
      validation.status = true;
      validation.message = 'CPF Invalido!';
      return validation;
    }
    // Validate 2st digit
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10))){
      validation.status = true;
      validation.message = 'CPF Invalido!';
      return validation;
    }

    validation.status = false;
    validation.message = '';

    return validation;
  },

  /**
   * validation of cpf fields
   * 
   * @param password 
   * @param confirmPassword 
   * @returns 
   */
  validateConfirmPassword: (password: string, confirmPassword: string): validation => {
    let validation: validation = {status: false, message: ''};

    if(confirmPassword === '') {
      validation.status = true;
      validation.message = 'Preencha o campo de confirmar senha';
    } else {
      if(confirmPassword != password) {
        validation.status = true;
        validation.message = 'Campo de confirmar senha está diferente do de senha!';
      } else {
        validation.status = false;
        validation.message = '';
      }
    }

    return validation
  }
}