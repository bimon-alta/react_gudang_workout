import React from "react";

import {withRouter, Link} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

import '../assets/styles/productItem.css';



class ProductItem extends React.Component {
  
  //function format angka dengan pemisah ribuan
  formatNumberByThousandSep = (numVal) => {
    return numVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  componentDidMount = async() => {
    await this.props.storeSetSelectedProduct(this.props.id,this.props.price,0);
  };

  handleItemClick = async (productId, productPrice, discountAmount) => {
    await this.props.storeSetSelectedProduct(productId, productPrice, discountAmount);
  }

  render() {

    // Item id: {this.props.id}

    return (
      <div className="col-md-3">
        <div className="card" style={{width: "18rem"}}>
          <figure className="snip1584">
            <img 
              src={this.props.image} 
              alt={this.props.id}
            />
            <figcaption>
              <h3>{this.props.name}</h3>
              <h3>{this.formatNumberByThousandSep(Number(this.props.price))}</h3>
              <h5>Detail</h5>
            </figcaption>
            <Link to={`/product/${this.props.id}`} onClick={() => {this.handleItemClick(this.props.id, this.props.price, 0)} }></Link>
            
          </figure>
        </div>
      </div>
    );
  }
};



export default connect("userCredential", actions)(withRouter(ProductItem));

