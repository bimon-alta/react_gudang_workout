
import React from 'react';
// import Slider from 'react-slick';
import ItemsCarousel from 'react-items-carousel';
// import InfiniteCarousel from 'react-leaf-carousel';


import {withRouter} from 'react-router-dom'
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store'

import '../assets/styles/productSlider.css';


import ProductCard from './productCard';

import product1 from '../assets/img/product01.png';
import product2 from '../assets/img/product02.png';
import product3 from '../assets/img/product03.png';
import product4 from '../assets/img/product04.png';
import product5 from '../assets/img/product05.png';



class ProductSlider extends React.Component{
  
  render() {

    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 100,
    //   slidesToShow: 3,
    //   slidesToScroll: 3,
            
    // }

    

    

  //       {/* <InfiniteCarousel
  //         breakpoints={[
  //           {
  //             breakpoint: 500,
  //             settings: {
  //               slidesToShow: 4,
  //               slidesToScroll: 4,
  //             },
  //           },
  //           {
  //             breakpoint: 768,
  //             settings: {
  //               slidesToShow: 3,
  //               slidesToScroll: 3,
  //             },
  //           },
  //         ]}
  //         dots={true}
  //         showSides={true}
  //         sidesOpacity={.5}
  //         sideSize={.1}
  //         slidesToScroll={4}
  //         slidesToShow={4}
  //         scrollOnDevice={true}
  //       >
  //         <ProductCard name="Laptop ABCDE" price="5.000.000" />
  //         <ProductCard name="iPhone XPro" price="20.000.000" />
  //         <ProductCard name="Jubah Betmen" price="15.000.000" />
  //         <ProductCard name="Sarung Superman" price="25.000.000" />
            
  //       </InfiniteCarousel> */}
    return (
      <div className="container-slider">
      
        <ItemsCarousel
          // Placeholder configurations
          enablePlaceholder
          numberOfPlaceholderItems={5}
          minimumPlaceholderTime={1000}
          placeholderItem={<div style={{ height: 200, background: '#900' }}>Placeholder</div>}

          // Carousel configurations
          numberOfCards={5}
          gutter={12}
          showSlither={true}
          firstAndLastGutter={true}
          freeScrolling={false}

          // Active item configurations
          // requestToChangeActive={this.changeActiveItem}
          // activeItemIndex={activeItemIndex}
          activePosition={'center'}

          chevronWidth={24}
          rightChevron={'>'}
          leftChevron={'<'}
          outsideChevron={true}
        >
          <ProductCard name="Laptop ABCDE" price="5.000.000" />
          <ProductCard name="iPhone XPro" price="20.000.000" />
          <ProductCard name="Jubah Betmen" price="15.000.000" />
          <ProductCard name="Sarung Superman" price="25.000.000" />

          <ProductCard name="Laptop XYZS" price="5.000.000" />
          <ProductCard name="Samsung" price="20.000.000" />
          <ProductCard name="Bantal" price="15.000.000" />
          <ProductCard name="Guling" price="25.000.000" />

        </ItemsCarousel> 

        {/* <Slider {...settings}>
          {this.state.sliders}
        </Slider>  */}
      </div>

       
        
        
      
      
    );
  }
}

export default connect("", actions)(withRouter(ProductSlider));








