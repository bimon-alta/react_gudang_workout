import React from 'react'
import Header from '../components/header';
import NavigationBar from '../components/navigationBar';
import SectionTitle from '../components/sectionTitle';
// import ProductSlider from '../components/productSlider';
// import ProductCard from '../components/productCard';
// import DaftarProduk from '../components/daftarProduk';
// import News from '../components/komponen2';
// import Carousel from '../components/backup/komponen3';
// import ImageList from '../components/komponen4';
// import ItemSlider from '../components/itemSlider';
import ProductGrid from '../components/productGrid';


import {withRouter, Link} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

class Home extends React.Component{

  componentDidMount = async() => {
      // Request ke API utk dapatkan daftar kategori produk
      this.props.storeReqAPIProductCategories();
      this.props.storeReqAPIProductList();
      this.props.storeReqAPIProductListBySale(1, 20);

      // Request ke API utk dapatkan daftar produk Terbaru dan Terlaris
      // Request ke API utk dapatkan daftar kategori produk
      
      // this.props.setAsNewsPage(true);

      //SEHARUSNYA TAK PERLU AWAIT, AGAR KOMPONEN LAIN TIDAK PERLU NUNGGU REQUEST API
      // this.props.getTopTenNewsList();
      // await getNewsListByCategory(this.props.category);
      

  };

  // componentDidUpdate = () => {
  //   console.log('ini token dari global state', this.props.userCredential.token)

  //   localStorage.setItem("is_login", true);
  //   localStorage.setItem("token", this.props.userCredential.token);
  //   const iniToken = localStorage.getItem("randid")
  //   console.warn('iniTokrn', iniToken);
    
  //   console.log("NILAI TOKEN SAAT INI DI HOME ", localStorage.getItem("token"));
  // }
  
  render(){
    
    return (
      <div>
        <Header />
        <NavigationBar />
        {/* <News data={cards} /> */}
        {/* <Carousel /> */}

        <SectionTitle title="Produk Baru"/>
        <ProductGrid products={this.props.productList}/>
        {/* <ItemSlider products={this.props.productList} /> */}

        <SectionTitle title="Produk Terlaris"/>
        <ProductGrid products={this.props.productListBySale}/>
        {/* <ItemSlider products={this.props.productListBySale} /> */}



        {/* <div style={{backgroundColor: "#13111182"}} className="container">
          <SectionTitle title="Produk Baru"/>
          <News data={cards} />
          <ProductSlider />

          <SectionTitle title="Terlaris"/>
          <ProductSlider />
        </div> */}
        
        {/* <ImageList /> */}
        {/* <Carousel /> */}
        {/* <DaftarProduk /> */}
      </div>
    );
  }
}

export default connect("userCredential, productList, productListBySale", actions)(withRouter(Home));