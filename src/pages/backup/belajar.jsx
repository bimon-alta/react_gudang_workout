import React from 'react'
import Slider from 'react-slick';
// import News from '../components/komponen2';

import ProductCard from '../components/productCard';


import {withRouter} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

class Belajar extends React.Component{
  render(){
    const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024, // width to change options
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        }
      ]
    }

    return (
      <div style={{height:"700px"}}>
        <Slider {...settings}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />

          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Slider>
      </div>
    );
  }
}

export default connect("", actions)(withRouter(Belajar));


