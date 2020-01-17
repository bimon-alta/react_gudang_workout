import React from 'react';

import {withRouter} from 'react-router-dom'
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store'


class Article extends React.Component {
  
  render(){
    const image = this.props.data.image;
    const title = this.props.data.title;
    const subtitle = this.props.data.subtitle;
  
    return (
     
      <figure className="snip1584">
        <img src={image} alt=""/>
        <figcaption>
          <h3>{title}</h3>
          <h5>{subtitle}</h5>
        </figcaption><a href="#">link</a>
      </figure>

    )
  }
}


export default connect("", actions)(withRouter(Article));
