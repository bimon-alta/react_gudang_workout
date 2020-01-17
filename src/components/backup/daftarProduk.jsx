
import React from 'react';

import {withRouter} from 'react-router-dom'
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';
// import Slider from 'react-slick';

import product1 from '../assets/img/product01.png';
import product2 from '../assets/img/product02.png';
import product3 from '../assets/img/product03.png';
import product4 from '../assets/img/product04.png';
import product5 from '../assets/img/product05.png';
import product6 from '../assets/img/product06.png';
import product7 from '../assets/img/product07.png';
import product8 from '../assets/img/product08.png';
import product9 from '../assets/img/product09.png';

import '../assets/styles/productSlider.css';

class DaftarProduk extends React.Component{
  render() {
    return (

      <div className="products-slick" data-nav="#slick-nav-1">
        <img style={{height:"300px", width: "300px"}} src={product1} alt=""/>
        <img style={{height:"300px", width: "300px"}} src={product2} alt=""/>
        <img style={{height:"300px", width: "300px"}} src={product3} alt=""/>
        <img style={{height:"300px", width: "300px"}} src={product4} alt=""/>
        <img style={{height:"300px", width: "300px"}} src={product5} alt=""/>
        <img style={{height:"300px", width: "300px"}} src={product6} alt=""/>
        <img style={{height:"300px", width: "300px"}} src={product7} alt=""/>
        <img style={{height:"300px", width: "300px"}} src={product8} alt=""/>
        <img style={{height:"300px", width: "300px"}} src={product9} alt=""/>
      </div>
      
    );
  }
}

export default connect("", actions)(withRouter(DaftarProduk));








