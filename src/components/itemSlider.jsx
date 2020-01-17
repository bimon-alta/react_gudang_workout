import React from "react";

import {withRouter, Link} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

import '../assets/styles/itemSlider.css';
// import '../assets/styles/komponen3.css';

// const slides = [
//   {
//     id: 1,
//     title: "Efren Reyes",
//     desc:
//       'Known as "The Magician", Efren Reyes is well regarded by many professionals as the greatest all around player of all time.',
//     image: "https://i.postimg.cc/RhYnBf5m/er-slider.jpg"
//   },
//   {
//     id: 2,
//     title: `Ronnie O'Sullivan`,
//     desc: `Ronnie O'Sullivan professional snooker player who is widely regarded as one of the greatest players in the history of the discipline.`,
//     image: "https://i.postimg.cc/qBGQNc37/ro-slider.jpg"
//   },
//   {
//     id: 3,
//     title: "Shane Van Boening",
//     desc:
//       'The "South Dakota Kid" is hearing-impaired and uses a hearing aid, but it has not limited his ability.',

//     image: "https://i.postimg.cc/cHdMJQKG/svb-slider.jpg"
//   },
//   {
//     id: 4,
//     title: "Mike Sigel",
//     desc: `Mike Sigel or "Captain Hook" as many like to call him is an American professional pool player with over 108 tournament wins.`,

//     image: "https://i.postimg.cc/C12h7nZn/ms-1.jpg"
//   },
//   {
//     id: 5,
//     title: "Willie Mosconi",
//     desc:
//       'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',

//     image: "https://i.postimg.cc/NfzMDVHP/willie-mosconi-slider.jpg"
//   }
// ];

const ItemSlider = (props) => {
  // console.log("nilai dari productList", props.productList);
  
  
  const slides = props.products.slice(0, 5).map((item,index)=>{
      return { id:item.id, name:item.name, price:item.default_price, image:item.url_img1};
  });

  // console.log("nilai slides", slides);

  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const [slideOrder, setSlideOrder] = React.useState(['s4', 's5', 's1', 's2', 's3']);
  const [slideStyles, setSlideStyles] = React.useState({});

  const rotate = (s1, s2, s3, s4, s5) => {
    setSlideStyles({
      [s1]: { transform: "translateX(-60rem)", opacity: 0 },
      [s2]: { transform: "translateX(-30rem)", opacity: 1 },
      [s3]: { transform: "translateX(0)", opacity: 1 },
      [s4]: { transform: "translateX(30rem)", opacity: 1 },
      [s5]: { transform: "translateX(60rem)", opacity: 0 }
    });
    setSlideOrder([s1, s2, s3, s4, s5]);
  };

  // rotate slides right by n spaces: e.g. 2 spaces - [1, 2, 3, 4, 5] -> [4, 5, 1, 2, 3]
  const rotateRight = (spaces = 1) => {
    const s = [];

    slideOrder.forEach((slide, i) => {
      s[(i + spaces) % slideOrder.length] = slide;
    });

    setSelectedIdx(4 - (4 - selectedIdx + spaces) % 5);
    rotate(s[0], s[1], s[2], s[3], s[4]);
  };

  // rotate slides left by n spaces: e.g. 2 spaces - [1, 2, 3, 4, 5] -> [3, 4, 5, 1, 2]
  const rotateLeft = (spaces = 1) => {
    const s = [];

    slideOrder.forEach((_, i) => {
      s[i] = slideOrder[(i + spaces) % slideOrder.length];
    });

    setSelectedIdx((selectedIdx + spaces) % 5);
    rotate(s[0], s[1], s[2], s[3], s[4]);
  };

  const handleDotClick = idx => {
    if (idx > selectedIdx) {
      rotateLeft(idx - selectedIdx);
    } else if (idx < selectedIdx) {
      rotateRight(selectedIdx - idx);
    }
  };

  return (
    <div className="carousel-wrap">
      <div className="carousel-container">

        <button className="carousel-btn prev-btn" onClick={() => rotateLeft()}>
          <i className="carousel-btn__arrow left" />
        </button>

        <ul className="carousel-slide-list">
          {slides.map((slide, i) => (
            <CarouselSlideItem
              props = {props}
              key={slide.id}
              slide={slide}
              style={slideStyles[`s${slide.id}`]}
              active={selectedIdx === i}
              className={`carousel-slide-item s${slide.id}`}
            />
          ))}
        </ul>

        <button className="carousel-btn next-btn" onClick={() => rotateRight()}>
          <i className="carousel-btn__arrow right" />
        </button>

      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => {
          const className = selectedIdx === i ? "dot active" : "dot";
          return (
            <button
              key={i}
              className={className}
              onClick={() => handleDotClick(i)}
            />
          );
        })}
      </div>
      
    </div>
  );
};

// const handleItemClick = async (productId, productPrice, discountAmount) => {
//   await props.storeSetSelectedProduct(productId, productPrice, discountAmount);
// }

const CarouselSlideItem = ({ props, slide, style, className, active }) => (
  <li className={className} style={style}>
    <Link to={`/product/${slide.id}`} className="carousel-slide-item__img-link" onClick={() => {props.storeSetSelectedProduct(slide.id, slide.price, 0)} }>
      <img 
        src={slide.image}
        className={active ? "active" : ""}
        alt={slide.id}        
      />
    </Link>
    <div className="carousel-slide-item__body">
      <h4>{formatNumberByThousandSep(Number(slide.price))}</h4>
      <p>{slide.name}</p>
    </div>
  </li>
);

// const CarouselSlideItem = ({ slide, style, className, active }) => (
//   <li className={className} style={style}>
//     {/* <div className="carousel-slide-item__img-link"> */}
//       <figure className="snip1584">
//         <img 
//           src={slide.image} 
//           className={active ? "active" : ""}
//           alt={slide.id}
//         />
//         <figcaption>
//           <h4>{slide.name}</h4>
//           <h4>{formatNumberByThousandSep(Number(slide.price))}</h4>
//           <h5>Detail</h5>
//         </figcaption>
//         <Link to={`/product/${slide.id}`}></Link>
        
//       </figure>
//     {/* </div> */}
//   </li>
// );

//function format angka dengan pemisah ribuan
const formatNumberByThousandSep = (numVal) => {
  return numVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}



export default connect("userCredential", actions)(withRouter(ItemSlider));

