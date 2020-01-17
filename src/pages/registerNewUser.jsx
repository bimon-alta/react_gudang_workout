import React from 'react'
import Header from '../components/header';


import {withRouter} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

import '../assets/styles/registerNewUser.css';

class RegisterNewUser extends React.Component{
  
  render(){
    let usernameInput = '';
    let emailInput = '';
    let passwordInput = '';
    let confirmPasswordInput = '';

    const setUserNameVal = (value) => {
      usernameInput = value;
    }
    const setEmailVal = (value) => {
      emailInput = value;
    }
    const setPasswordVal = (value) => {
      passwordInput = value;
    }
    const setConfirmPasswordVal = (value) => {
      confirmPasswordInput = value;

    }

    const handleSubmitNewUser = async () => {
     
      // console.log("password:",passwordInput," konfirm password:",confirmPasswordInput );
      // console.log("Nilai props router", this.props);

      if(passwordInput===confirmPasswordInput){
        await this.props.storeHandleRegisterNewUser(usernameInput, emailInput, passwordInput);
        if (this.props.userCredential.isSuccessfulCreateNewUser){
          await this.props.storeHandleLogin(usernameInput, passwordInput);
          alert('Selamat proses registrasi user baru Berhasil');
        }else{  
          alert('Gagal login setelah user dibuat');
        }
      }else{
        alert("Nilai password dan konfirmasi password tidak sama");
      }
      
    }

    return (
        <div>
          <Header />
            <div className="wrapper">
              <form className="form-register-user" onSubmit={e => e.preventDefault()}>       
                <h2 className="form-register-user-heading">New User</h2>
                
                <input type="text" className="form-control" name="username" 
                  placeholder="Username" required="" autoFocus="" onChange={e => setUserNameVal(e.target.value)} />
                
                <input type="email" className="form-control" name="email" 
                  placeholder="Email" required="" autoFocus="" onChange={e => setEmailVal(e.target.value)} />
                
                <input type="password" className="form-control" name="password" 
                  placeholder="Password" required="" onChange={e => setPasswordVal(e.target.value)} />  

                <input type="password" className="form-control" id="confirm-password" name="confirm-password" 
                  placeholder="Konfirmasi Password" required="" onChange={e => setConfirmPasswordVal(e.target.value)} />   

                
                <button className="btn btn-lg btn-primary btn-block" onClick={handleSubmitNewUser} > Login </button>   
              </form>
            </div>
        </div>
    );
  }
}

export default connect("userCredential", actions)(withRouter(RegisterNewUser));