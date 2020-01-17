import React from "react";

import {withRouter, Link} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

// import '../assets/styles/productContainer.css';

import ProductItem from './productItem';



class ProductGrid extends React.Component {
  // state ={
  //   items : [
  //     {
  //       id: 1,
  //       name: "Produk 1",
  //       price: 50000,
  //       image: "https://s4.bukalapak.com/img/9985303742/w-1000/barbel_pasir_5_kg___dumbel_pasir_5_kg.jpg"
  //     },
  //     {
  //       id: 2,
  //       name: "Produk 2",
  //       image: "https://gd.image-gmkt.com/SEPATU-RUNNING-ADIDAS-DURAMO/li/730/297/1172297730.g_400-w_g.jpg"
  //       // image: "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/9/38176241/38176241_1f7c2e7c-568f-4ae0-bfeb-b5f2075f4f5c_1000_1000.jpg"
  //     },
  //     {
  //       id: 3,
  //       name: "Produk 3",
  //       price: 500000,
  //       image: "https://id-test-11.slatic.net/shop/c55f65bff741111e7eb046c262221521.jpeg"
  //     },
  //     {
  //       id: 4,
  //       name: "Produk 4",
  //       price: 555000,
  //       image: "https://www.bigw.com.au/medias/sys_master/images/images/h64/h76/12251158282270.jpg"
  //     },
  //     {
  //       id: 5,
  //       name: "Produk 5",
  //       image: "https://ritelbox.com/image/cache/wkseller/42/TRIJEE/WhatsApp%20Image%202019-06-26%20at%2015.09.16-550x550w.jpeg"
  //     }
  //   ],
  // }

  render(){
    

    // const itemComponent = this.props.productList.map((item, index) =>{
    const itemComponent = this.props.products.map((item, index) =>{
    
      return(
        <ProductItem
          key={index}
          id={item.id}
          name= {item.name}
          image= {item.url_img1} 
          price= {item.default_price}
        />
      );
    })

    // =========== bootstrap ===========
    // const products = [];
    // for(let i=0;i<30;i++){
    //   products.push(<ProductContainer />);
    // }
    

    return (
      <div className="container product-grid">
        <div className="row">
          {itemComponent}
        </div>
      </div>
    );
  };
};





export default connect("", actions)(withRouter(ProductGrid));

