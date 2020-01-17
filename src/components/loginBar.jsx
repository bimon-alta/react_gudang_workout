import React from 'react';
import '../assets/styles/loginBar.css';

import {withRouter} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

class LoginBar extends React.Component{

  state = {
    usernameInput: '',
      passwordInput: ''
  }

  handleLogin = async () => {
        
    await this.props.storeHandleLogin(this.state.usernameInput, this.state.passwordInput);
    // console.log("Nilai UserCredential", this.props.userCredential);
    // this.props.storeHandleLogin("Penjual05", "Asdf1234");

    // localStorage.setItem("is_login", true);
    // localStorage.setItem("token", this.props.userCredential.token);



    // console.log("this.props.userCredential.token ", this.props.userCredential.token);
    // localStorage.setItem("is_login", true);
    // localStorage.setItem("token", this.props.userCredential.token);
    
  }

  setUserNameVal = (value) => {
    this.setState({usernameInput: value});
  }
  setPasswordVal = (value) => {
    this.setState({passwordInput: value});
  }

    render() {
      

      return (
          <div className="col-md-6">
              <div className="header-login">
                  <form onSubmit={e => e.preventDefault()}>
                      <input className="input" placeholder="Username or email" 
                        onChange={e => {this.setUserNameVal(e.target.value)}} />
                      <input type="password" className="password" placeholder="password" 
                        onChange={e => {this.setPasswordVal(e.target.value)}} />
                      <button className="login-btn" onClick={this.handleLogin}>Login</button>
                  </form>
              </div>
          </div>
      );
    }
}

export default connect("userCredential", actions)(withRouter(LoginBar));
