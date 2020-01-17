import React from 'react';

import {withRouter, Link} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';


import '../assets/styles/productSearchBox.css';

class ProductSearchBox extends React.Component{
  render() {
    let selectedCategoryId = 0;
    let searchKeyWord = '';

    const categories = this.props.productCategoryList.map( (item, index) => <option key={index} value={item.id} >{item.name}</option>);

    
    const handleCategoryChange = val =>{
      selectedCategoryId = val;
    }

    const handleSearchBoxChange = val =>{
      searchKeyWord = val.target.value;
    }

    const handleSearch = async () =>{
      // console.log("NILAI selectedCategoryId ", selectedCategoryId);
      // console.log("nilai dari searchKeyWord ", searchKeyWord);
      await this.props.history.push('/product');
      this.props.storeHandleSearch(selectedCategoryId, searchKeyWord);
    }

    return (
      <div className="col-md-4">
        <div className="header-search">
          <form onSubmit={e => e.preventDefault()} >
            <select className="input-select" onChange={ e => {handleCategoryChange(Number(e.target.value))}}>
              <option value = "0">Semua</option>
              {categories}
            </select>
            <input className="input" placeholder="Cari disini" onChange={e =>{handleSearchBoxChange(e)}}></input>
            <button className="search-btn" onClick={handleSearch}>Cari</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect("productCategoryList", actions)(withRouter(ProductSearchBox));

