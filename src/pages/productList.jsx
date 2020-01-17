import React from 'react'
import Header from '../components/header';
import NavigationBar from '../components/navigationBar';
import ProductGrid from '../components/productGrid';


import {withRouter} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';


import '../assets/styles/productList.css';

class ProductList extends React.Component{
  
  //default request params , adalah urutkan produk terbaru
  //per halaman 20 product, tampilkan halaman pertama
  

  componentDidMount = async() => {

      // Request ke API utk dapatkan daftar produk Terbaru dan Terlaris
      // Request ke API utk dapatkan daftar kategori produk
      
      await this.props.storeReqAPIProductList() ;

      // this.props.getTopTenNewsList();
      // await getNewsListByCategory(this.props.category);
      // console.log("NILAI TOKEN SAAT INI DI PRODUCT LIST ", localStorage.getItem("token"));

    };

    
    
    
  render(){
    
    // console.log("nilai reqParamsReqProducts", this.props.reqParamsReqProducts);
    
    const handleBackBtn = () => {
      this.props.history.push('/');
    }

    return (
      <div>
        <Header />
        <NavigationBar />
        <ProductGrid products={this.props.productList}/>
        <div >
          <button type="button" className="btn btn-primary" onClick={handleBackBtn}>Beranda</button>
        </div>

        
      </div>

      
    );
  }
}

export default connect("productList, reqParamsReqProducts", actions)(withRouter(ProductList));