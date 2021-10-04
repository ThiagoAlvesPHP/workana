import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// COMPONENTs
import RouteHandler from '../../components/RouteHandler';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// VIEWs
import Home from '../../views/Home';
import SignIn from '../../views/SignIn';
import SignUp from '../../views/SignUp';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <RouteHandler exact path='/' privateRouter={true}>
          <Home />
        </RouteHandler>

        <RouteHandler exact path='/signin' privateRouter={false}>
          <SignIn />
        </RouteHandler>

        <RouteHandler exact path='/signup' privateRouter={false}>
          <SignUp />
        </RouteHandler>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default Routes;