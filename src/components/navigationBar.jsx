
import React from 'react';

import {withRouter, Link} from 'react-router-dom'
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store'

import '../assets/styles/navigationBar.css';

class NavigationBar extends React.Component{
  handleNavClick = async(categoryId) =>{

    // console.log("NILAI categoryId DI COMP dari NAV", categoryId)

    if (categoryId > 0){
      const reqParams = {
        p:1, 
        rp:20, 
        category_id: categoryId,
        orderby: 'created_at', 
        sort: 'desc'
      }

      await this.props.storeSetStateReqParamsForReqProducts(reqParams);
      await this.props.storeReqAPIProductList() ;
      this.props.history.push('/product');

    }else{
      const reqParams = {
        p:1, 
        rp:20, 
        orderby: 'created_at', 
        sort: 'desc'
      }

      await this.props.storeSetStateReqParamsForReqProducts(reqParams);
      await this.props.storeReqAPIProductList() ;
      this.props.history.push('/product');
      
    }


  }
  
  render() {
    
    // console.log("NILAI productCategoryList DI COMP ", this.props.productCategoryList)

    

    let hasil = this.props.productCategoryList.map((item,index)=>{
      return (
        <li key={index}><a  href="#" onClick={ () =>{ this.handleNavClick(Number(item.id))}}>{item.name}</a></li>
      );
    });

    return (
      <nav id="navigation">
        <div className="container">
          <div id="responsive-nav">
            <ul className="main-nav nav navbar-nav">
              {hasil}
              <li><a href="#" onClick={ () =>{ this.handleNavClick(0)}}>Semua</a></li>
              {/* <li><a href="#">Promo</a></li>
              <li><a href="#">Perlengkapan</a></li>
              <li><a href="#">Suplemen/Nutrisi</a></li>
              <li><a href="#">Pakaian</a></li>
              <li><a href="#">Peralatan</a></li>
              <li><a href="#">Lain-lain</a></li> */}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

// export default NavigationBar;
export default connect("productCategoryList", actions)(withRouter(NavigationBar));



