import React from 'react'
import Header from '../components/header';
import NavigationBar from '../components/navigationBar';
import ProductGrid from '../components/productGrid';


import {withRouter} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';


import '../assets/styles/productDetail.css';

class ProductDetail extends React.Component{
  
  //function format angka dengan pemisah ribuan
  formatNumberByThousandSep = (numVal) => {
    return numVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  componentDidMount = async() => {
    
    // console.log("Nilai props ",this.props.match.params.id);
      
    await this.props.storeReqAPIProductById(this.props.match.params.id) ;
    // console.log("PRODUCT BY ID ON COMP ", this.props.productById);

  };


  
  render(){
    const handleAddToCart = () => {

      if(this.props.userCredential.isLogin){
        this.props.storeAPIReqAddToCart();
      }else{
        // this.props.history.push("/login");
        alert("Silahkan login terlebih dahulu");
      }
    }
    
    const handleBackBtn = () => {
      this.props.history.push('/product');
    }

    let product = {};
    if (this.props.productById.length > 0){
      product = this.props.productById[0];
    }

    return (
      <div>
        <Header />
        <NavigationBar />

        <div className="container product-detail">
          <div className="row">
            <div className="col-md-6">
              <div className="detail-product-img-container">
                <img src={product.url_img1} alt=""/>
              </div>
            </div>
            <div className="col-md-6">
              <h1>{product.name}</h1>
              <h4>{product.short_description}</h4>
              
              <h2>{this.formatNumberByThousandSep(Number(product.default_price))}</h2>
              <div>
              <button type="button" className="btn btn-danger" onClick={handleAddToCart}>Tambah Keranjang</button>
              <button type="button" className="btn btn-primary" onClick={handleBackBtn}>Back</button>

              </div>
            </div>
          </div>
        </div>
          
        
      </div>

      
    );
  }
}

export default connect("productById, userCredential", actions)(withRouter(ProductDetail));