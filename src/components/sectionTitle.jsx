
import React from 'react';

import {withRouter} from 'react-router-dom'
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store'

import '../assets/styles/sectionTitle.css';

const SectionTitle = (props) =>{

  return (
    <div className="col-md-12">
      <div className="section-title">
        <h3 className="title">{props.title}</h3>
        {/* <div className="section-nav">
          <ul className="section-tab-nav tab-nav">
            <li className="active"><a data-toggle="tab" href="#tab1">Laptops</a></li>
            <li><a data-toggle="tab" href="#tab1">Smartphones</a></li>
            <li><a data-toggle="tab" href="#tab1">Cameras</a></li>
            <li><a data-toggle="tab" href="#tab1">Accessories</a></li>
          </ul>
        </div> */}
      </div>
    </div>
  );
  
}

export default connect("", actions)(withRouter(SectionTitle));






