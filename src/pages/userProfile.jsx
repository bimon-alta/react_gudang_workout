import React from 'react'
import Header from '../components/header';


import {withRouter} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

import '../assets/styles/userProfile.css';

class UserProfile extends React.Component{
  
  render(){
    let fullNameInput = '';
    let sexInput = '';
    let birthPlaceInput = '';
    let birthDateInput = '';
    let phoneNoInput = '';
    let addressInput = '';
    let cityInput = '';
    let provinceInput = '';
    let bioInput = '';
    let urlImageInput = '';

    const setFullNameVal = val =>{
      if(val !== null && val !== undefined){ fullNameInput = val}else{ fullNameInput = ""};
    }
    const setSexVal = val =>{
      if(val !== null && val !== undefined){ sexInput = val}else{ sexInput = ""};
    }
    const setBirthPlaceVal = val =>{
      if(val !== null && val !== undefined){ birthPlaceInput = val}else{ birthPlaceInput = ""};
    }
    const setBirthDateVal = val =>{
      //typeof(val) = string, auto berformat 'yyyy-mm-dd' 
      if(val !== null && val !== undefined){ birthDateInput = val}else{ birthDateInput = ""};

    }
    const setPhoneNoVal = val =>{
      if(val !== null && val !== undefined){ phoneNoInput = val}else{ phoneNoInput = ""};
    }
    const setAddressVal = val =>{
      if(val !== null && val !== undefined){ addressInput = val}else{ addressInput = ""};
    }
    const setCityVal = val =>{
      if(val !== null && val !== undefined){ cityInput = val}else{ cityInput = ""};
    }
    const setProvinceVal = val =>{
      if(val !== null && val !== undefined){ provinceInput = val}else{ provinceInput = ""};
    }
    const setBioVal = val =>{
      if(val !== null && val !== undefined){ bioInput = val}else{ bioInput = ""};
    }
    const setURLImgVal = val =>{

      if(val !== null && val !== undefined){ urlImageInput = val}else{ urlImageInput = ""};
    }

    const handleUpdateUserProfile = () => {
      if (this.props.userCredential.token!=='' || 
      this.props.userCredential.token!== null || 
      this.props.userCredential.token !== undefined)
      { 
        // console.log("password:",passwordInput," konfirm password:",confirmPasswordInput );
        // console.log("Nilai props router", this.props);

        const userProfileData = {
          full_name: fullNameInput,
          sex: sexInput,
          birth_place: birthPlaceInput,
          birth_date: birthDateInput,
          phone_no: phoneNoInput,
          address: addressInput,
          city: cityInput,
          province: provinceInput,
          bio: bioInput,
          url_img: urlImageInput,
          password_changed: false,
          new_password:""
        }
        // console.log("Isi obj userProfileData ", userProfileData);  

        this.props.storeHandleUpdateUserProfile(userProfileData);
        

      }else{
        alert('Silahkan terlebih dahulu')
        this.props.history.replace('/');
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
                <h2>Profil User</h2>
                
                <input type="text" className="form-control full_name" name="full_name" 
                  placeholder="Nama lengkap" required autoFocus="" onChange={e => setFullNameVal(e.target.value)} />
                
                <div>
                  <label><input className="radio" type="radio" name="rad_sex" onClick={e => setSexVal('male')} defaultChecked/>Laki-laki</label>
                  <label><input className="radio" type="radio" name="rad_sex" onClick={e => setSexVal('female')} />Perempuan</label>
                  
                </div>

                <input type="text" className="form-control birth_place" name="birth_place" 
                  placeholder="Kota kelahiran" autoFocus="" onChange={e => setBirthPlaceVal(e.target.value)} />
                
                <input type="date" className="form-control birth_date" name="birth_date" 
                  placeholder="Tanggal Lahir" required onChange={e => setBirthDateVal(e.target.value)} />  

                <input type="text" className="form-control phone_no" name="phone_no" 
                  placeholder="Nomor telepon" required onChange={e => setPhoneNoVal(e.target.value)} />   

                <input type="text" className="form-control address" name="address" 
                  placeholder="Alamat" onChange={e => setAddressVal(e.target.value)} />  

                <input type="text" className="form-control city" name="city" 
                  placeholder="Kota" onChange={e => setCityVal(e.target.value)} />

                <input type="text" className="form-control province" name="province" 
                  placeholder="Provinsi" onChange={e => setProvinceVal(e.target.value)} />

                <input type="text" className="form-control bio" name="bio" 
                  placeholder="Bio" onChange={e => setBioVal(e.target.value)} />

                <input type="text" className="form-control url_img" name="url_img" 
                  placeholder="URL Foto Diri" onChange={e => setURLImgVal(e.target.value)} />
                
                <button className="btn btn-lg btn-primary btn-block" onClick={handleUpdateUserProfile} > Submit </button>   
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

export default connect("userCredential", actions)(withRouter(UserProfile));