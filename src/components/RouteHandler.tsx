import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import AuthHandler from '../config/services/AuthHandler';

interface Props {
  children: any,
  path: string,
  exact: boolean,
  privateRouter: boolean
}

const RouteHandler = ({ children, path, exact = true, privateRouter = false }: Props) => {

  const history = useHistory();

  useEffect(()=>{
    isPrivate();
  }, [])

  /**
   * Makes the route private, verifying if the user is logged in through the token stored in the cookie
   */
  function isPrivate() {
    if(privateRouter) {
      let logged = AuthHandler.isLogged();
      if(!logged) {
        history.replace('/signin');
      }
    }
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  )
}

export default RouteHandler;