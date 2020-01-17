import React from 'react';
import Slider from 'react-slick';
// import Carousel  from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../assets/styles/komponen2.css';

import {withRouter} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

import Article from './komponen1';


class News extends React.Component {
  

  render(){

    const data = this.props.data;
    let newsTemplate = [];
    let Test = [];
		// const settings = {
    // 	dots: true,
		// 	infinite: true,
  	// 	slidesToShow: 3,
  	// 	slidesToScroll: 1,
    // }

		if (data.length > 0) {
      // console.log('masuk sini bos');
			newsTemplate = data.map(function(item, index) {
				return (
            // <div className="Test"><p>Halo Robot {index}}</p></div>
            // <Slider >
              <div key={index}>
                <Article data={item} />
              </div>
            // </Slider>
				)
			})
		} else {
			newsTemplate = <p>Please add some cards</p>
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    }
    
		return (
        <div style={{backgroundColor: "black"}}className='news'>
          <Slider {...settings}>{newsTemplate}</Slider>
          <strong className={'news__count ' + (data.length > 0 ? '':'none') }>
            Total cards: {data.length}
          </strong>
          
        </div>

          
        
          // <div>
          //   <Slider {...settings}>{newsTemplate}</Slider>
          //   <h2> Multiple items </h2>
          //   <Slider {...settings}>
          //     <div>
          //       <h3>1</h3>
          //     </div>
          //     <div>
          //       <h3>2</h3>
          //     </div>
          //     <div>
          //       <h3>3</h3>
          //     </div>
          //     <div>
          //       <h3>4</h3>
          //     </div>
          //     <div>
          //       <h3>5</h3>
          //     </div>
          //     <div>
          //       <h3>6</h3>
          //     </div>
          //     <div>
          //       <h3>7</h3>
          //     </div>
          //     <div>
          //       <h3>8</h3>
          //     </div>
          //     <div>
          //       <h3>9</h3>
          //     </div>
          //   </Slider>
          // </div>
        
		);
  }
}

export default connect("", actions)(withRouter(News));
