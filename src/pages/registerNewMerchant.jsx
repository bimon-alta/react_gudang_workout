import React from 'react'
import Header from '../components/header';


import {withRouter} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

import '../assets/styles/registerNewMerchant.css';

class RegisterNewMerchant extends React.Component{
  
  render(){

    let storeName = '';
    let storeAddress = '';
    let storeDistrict = '';
    let storeCity = '';
    let storeProvince = '';
    let storePostalCode = '';
    let storeBankName = '';
    let storeBankAcc = '';
    let storeBankAccNo = '';

    const setStoreName = val =>{
      if(val !== null && val !== undefined){ storeName = val}else{ storeName = ""};
    }
    const setStoreAddress = val =>{
      if(val !== null && val !== undefined){ storeAddress = val}else{ storeAddress = ""};
    }
    const setStoreDistrict = val =>{
      if(val !== null && val !== undefined){ storeDistrict = val}else{ storeDistrict = ""};

    }
    const setStoreCity = val =>{
      if(val !== null && val !== undefined){ storeCity = val}else{ storeCity = ""};
    }
    const setStoreProvince = val =>{
      if(val !== null && val !== undefined){ storeProvince = val}else{ storeProvince = ""};
    }
    const setStorePostalCode = val =>{
      if(val !== null && val !== undefined){ storePostalCode = val}else{ storePostalCode = ""};
    }
    const setStoreBankName = val =>{
      if(val !== null && val !== undefined){ storeBankName = val}else{ storeBankName = ""};
    }
    const setStoreBankAcc = val =>{
      if(val !== null && val !== undefined){ storeBankAcc = val}else{ storeBankAcc = ""};
    }
    const setStoreBankAccNo = val =>{

      if(val !== null && val !== undefined){ storeBankAccNo = val}else{ storeBankAccNo = ""};
    }

    const handleRegisterNewMerchant = async () => {
      if (this.props.userCredential.token!=='' || 
      this.props.userCredential.token!== null || 
      this.props.userCredential.token !== undefined)
      { 

        const merchantProfileData = {
          store_name : storeName,
          address : storeAddress,
          district : storeDistrict,
          city : storeCity,
          province : storeProvince,
          postal_code : storePostalCode,
          bank_name : storeBankName,
          bank_account_name : storeBankAcc,
          bank_account_no :storeBankAccNo
        }
        // console.log("Isi obj userProfileData ", merchantProfileData);  

        await this.props.storeHandleRegisterNewMerchant(merchantProfileData);
        this.props.history.replace('/new-product');

      }else{
        alert('Silahkan login terlebih dahulu')
      }
    }

    let toRender = null;
    // console.log("USER TOKEN ", this.props.userCredential.token)
    if (this.props.userCredential.token!=='' && 
      this.props.userCredential.token!== null && 
      this.props.userCredential.token !== undefined)
    {
      toRender = (
          <React.Fragment>
            <Header />
            <div className="wrapper">
              <form style={{height:"1000px"}}className="form-control" onSubmit={e => e.preventDefault()} >       
                <h2>Daftar Mitra Baru</h2>
                
                <input type="text" className="form-control store_name" name="store_name" 
                  placeholder="Nama Toko" required autoFocus="" onChange={e => setStoreName(e.target.value)} />
                

                <input type="text" className="form-control store_address" name="store_address" 
                  placeholder="Alamat Toko" autoFocus="" onChange={e => setStoreAddress(e.target.value)} />
                
                <input type="text" className="form-control store_district" name="store_district" 
                  placeholder="Kecamatan" required onChange={e => setStoreDistrict(e.target.value)} />  

                <input type="text" className="form-control store_city" name="store_city" 
                  placeholder="Kota" required onChange={e => setStoreCity(e.target.value)} />   

                <input type="text" className="form-control store_province" name="store_province" 
                  placeholder="Propinsi" onChange={e => setStoreProvince(e.target.value)} />  

                <input type="text" className="form-control store_postal_code" name="store_postal_code" 
                  placeholder="Kode Pos" onChange={e => setStorePostalCode(e.target.value)} />

                <input type="text" className="form-control store_bank_name" name="store_bank_name" 
                  placeholder="Nama Bank" onChange={e => setStoreBankName(e.target.value)} />

                <input type="text" className="form-control store_bank_account" name="store_bank_account" 
                  placeholder="Nama Pemilik Rekening" onChange={e => setStoreBankAcc(e.target.value)} />

                <input type="text" className="form-control store_acc_no" name="store_acc_no" 
                  placeholder="Nomor Rekening" onChange={e => setStoreBankAccNo(e.target.value)} />
                
                <button className="btn btn-lg btn-primary btn-block" onClick={handleRegisterNewMerchant} > Submit </button>   
              </form>
            </div>
          </React.Fragment>
      );
    }else{
      alert('Silahkan login terlebih dahulu');
      console.log(this.props);
      this.props.history.replace('/');
    }

    return (
      <div>
        {toRender}
      </div>
    );
  }
}

export default connect("userCredential", actions)(withRouter(RegisterNewMerchant));