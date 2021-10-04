import Cookies from "js-cookie";

export default {
  /**
   *  Check if the user is logged in
   */
  isLogged: (): boolean => {
    let token = Cookies.get('token');
    return (token) ? true : false;
  },

  /**
   * Set the user's token in the cookie
   * 
   * @param token 
   */
  doLogin: (token: string) => {
    Cookies.set('token', token);
  },

  /**
   * Remove user's token from cookie
   */
  doLogout: () => {
    Cookies.remove('token');
  }
}