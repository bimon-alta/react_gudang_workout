import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {Provider} from 'unistore/react';
import {store, actions} from '../globalState/store';

import Home from '../pages/home';
// import Belajar from '../pages/belajar';
import RegisterNewUser from '../pages/registerNewUser';
import UserProfile from '../pages/userProfile';
import RegisterNewMerchant from '../pages/registerNewMerchant';
import InsertNewProduct from '../pages/insertNewProduct';
import ProductList from '../pages/productList';
import ProductDetail from '../pages/productDetail';
import SaleDetails from '../pages/saleDetails';
import ConfirmPayment from '../pages/confirmPayment';

import NotFound from '../pages/notFound';

const MainRoute = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={RegisterNewUser} />
          <Route path='/user/:id' component={UserProfile} />
          <Route exact path='/new-merchant' component={RegisterNewMerchant} />
          <Route exact path='/new-product' component={InsertNewProduct} />
          <Route exact path='/product' component={ProductList} />
          <Route path='/product/:id' component={ProductDetail} />
          <Route exact path='/cart' component={SaleDetails} />
          <Route exact path='/confirm-payment' component={ConfirmPayment} />



          {/* <Route exact path='/profile' component={Profile} />]}
            <Route exact path='/login' component={Login} /> 
            <Route exact path='/info' component={infoPage} /> 
          */}

          <Route component={NotFound} /> 
      </Switch>
    </BrowserRouter>
    </Provider>
  )
}

export default MainRoute