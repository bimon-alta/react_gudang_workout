import React from 'react'
import Header from '../components/header';
import NavigationBar from '../components/navigationBar';


import {withRouter, Link} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

import BankAccInfo from '../components/bankAccInfo';
import '../assets/styles/confirmPayment.css';

class ConfirmPayment extends React.Component{
  
  
  

  componentDidMount = async() => {
    if(this.props.userCredential.isLogin){
      await this.props.storeAPIReqGetBankAccountList() ;
      

    }else{
      // this.props.history.push("/login");
      alert("Silahkan login terlebih dahulu");
    }
  };

    
    
    
  render(){
    
    const formatNumberByThousandSep = (numVal) => {
      return numVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    

    const bankAccounts = this.props.bankAccountList.map( (item, index) => <option key={index} value={item.id} >{item.bank_name}</option>);

    let urlPaymentImgConf = '';

    const setUrlPaymentImgConf = (urlImg) => {
      urlPaymentImgConf = urlImg;
    } 

    const handlePaymentConfirmation = async () => {
      if(urlPaymentImgConf!=='' && urlPaymentImgConf!==null && urlPaymentImgConf!==undefined){
        await this.props.storeHandlePaymentConfirmation(urlPaymentImgConf);
        this.props.history.push("/");
      }else{
        alert('Silahkan isi kolom link foto bukti pembayaran anda')
      }
    }
    

    return (
      <div>
        <Header />
        <div className="container">
          <h1>Pembayaran</h1>
          <select className="select" onClick={ e => {this.props.storeHandleSelectedBankAccChange(Number(e.target.value))}}>
            {bankAccounts}
          </select>

          <BankAccInfo />

          <input type="text" className="form-control url_img1" name="url_img1" 
                  placeholder="Link Bukti Pembayaran" onChange={e => setUrlPaymentImgConf(e.target.value)} required/>
          
          <button type="button" className="btn btn-primary" onClick={handlePaymentConfirmation}>Konfirmasi Pembayaran</button>

          <Link to="/cart" ><button type="button" className="btn btn-primary btn-cancel" >Batal</button></Link>

        </div>

      </div>

      
    );
  }
}

export default connect("userCredential, saleSummary, bankAccountList", actions)(withRouter(ConfirmPayment));