import React from 'react';

import {withRouter, Link} from 'react-router-dom'
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store'


import '../assets/styles/header.css';
import logo from '../assets/images/logo.png';

import ProductSearchBox from './productSearchBox';
import LoginBar from './loginBar';


class Header extends React.Component{

  // state = {
  //   isLogin: localStorage.getItem("is_login")
  // }

  // isLogin = null;
  
  componentDidMount = async() =>{
    // this.isLogin = await localStorage.getItem("is_login");
    // console.log("nilai lOCAL STORAGE is_login di HEADER", this.isLogin);
  }

  handleLogout = async() => {
    // console.log("MASUK LOGOUTT ");

    await this.props.storeHandleLogout();
    localStorage.removeItem("is_login");
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  // handleCartBtnClick = async() => {
  //   alert("Sedang dalam perbaikan")
  // }

  compSatu = null;
  compDua = null;
  

	render() {      
    
    
    // const login = this.state.isLogin;
    // console.warn('this.login', login);
    
    

    if (this.props.userCredential.isLogin){
      this.compSatu = (
        <div className="col-md-6">
          <div className="header-register">
            <Link to={`/user/${this.props.userCredential.userId}`}>Profile</Link>
            <Link to="/cart" >Keranjang Belanja</Link>
            
            <Link to="#" onClick={this.handleLogout}>Logout</Link>
                        
          </div>
        </div>
      );

      if (this.props.userCredential.isMerchant){
        this.compDua = ( 
          <div className="col-md-6">
            <div className="header-register">
              <Link to="/new-product">Tambah Product</Link>
            </div>
          </div>
        );

    
      }else{
        this.compDua = ( 
          <div className="col-md-6">
            <div className="header-register">
              <Link to="/new-merchant">Mulai Jualan</Link>
            </div>   
          </div>
        );
      }
      
      // console.log("ubah Header BAR setelah login ", isLogin);
      
    }else{
      
      this.compSatu = <LoginBar />;
      this.compDua = (
        <div className="col-md-6">
          <div className="header-register">Belum punya akun? <Link to="/register"> Register </Link></div>   
        </div>
      );

      // console.log("ubah Header BAR setelah logout ", isLogin);
      
    }


		return (
			<header> 
			  {/* TOP HEADER */}
				<div id="top-header">
					<div className="container">
						<div className="col-md-3">
							<div className="header-logo">
								<a href="#" className="logo">
									<img src={logo} alt="" />
								</a>
							</div>
						</div>

						<div className="col-md-9">
							<div className="welcome-banner">
                <h4 id="banner">Selamat Datang di Gudang Workout</h4>
							</div>
						</div>
					</div>
				</div>

				{/* MAIN HEADER */}
				<div id="header">
					<div className="container">
						<div className="row">
                {/* SEARCH BOX */}
                <ProductSearchBox />
                <div className="col-md-8">
                  <div className="row">
                    { this.compSatu }
                    { this.compDua }  
                  </div>
                </div>
                
                
						</div>
					</div>
        </div>
			</header> 
	  );
	}
}

export default connect("userCredential", actions)(withRouter(Header));
 

