let BASE_URL = 'http://travelingbetapi-env.eba-2riiwc2y.us-east-1.elasticbeanstalk.com/api';

export default {
  /**
   * Login request
   * 
   * @param endpoint 
   * @param email 
   * @param password 
   * @returns 
   */
  signin: async (endpoint: string, email: string, password: string) => {
    let obj = {
      id: email,
      password: password
    }

    let req = await fetch(BASE_URL+endpoint, {
      method: 'POST',
      body: JSON.stringify(obj)
    });

    let json = await req.json();

    return json;
  },

  /**
   * Register new user
   * 
   * @param endpoint 
   * @param fullName 
   * @param email 
   * @param nickname 
   * @param birthday 
   * @param cpfCnpj 
   * @param account 
   * @returns 
   */
  signup: async (endpoint: string, fullName: string, email: string, nickname: string, birthday: string, cpfCnpj: string, account: {id: string, pass: string, checkPass: string}) => {
    let obj = {
      fullName,
      email,
      nickname,
      birthday,
      cpfCnpj,
      account
    }
    
    let req = await fetch(BASE_URL+endpoint, {
      method: 'POST',
      body: JSON.stringify(obj)
    });

    let json = await req.json();

    return json;
  },

  /**
   * Get data from logged in user
   * 
   * @param endpoint 
   * @param token 
   * @returns 
   */
  infoUser: async (endpoint: string, token: string) => {
    let req = await fetch(BASE_URL+endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    let json = await req.json();

    return json;
  }
}