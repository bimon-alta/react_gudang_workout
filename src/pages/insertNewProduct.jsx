import React from 'react'
import Header from '../components/header';


import {withRouter, Link} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';

import '../assets/styles/insertNewProduct.css';

class InsertNewProduct extends React.Component{
  componentDidMount = async() => {
    console.log("NILAI TOKEN SAAT INI DI NEW PRODUCT ", localStorage.getItem("token"));
  };

  render(){

    
    let productName = '';
    let categoryId = 0;
    let defaultPrice = 0;
    let brandName = 0;
    let countryOfOri = '';
    let urlImg1  = '';
    let urlImg2  = '';
    let urlImg3  = '';
    let productCondition = '';
    let weightGram = 0;
    let shortDescription = '';
    let detailProduct = '';
    let isAvailable = true;

    const setProductName = val =>{
      if(val !== null && val !== undefined){ productName = val}else{ productName = ""};
    }
    const setCategoryId = val =>{
      if(val !== null && val !== undefined && val>0){ categoryId = val}else{ alert('Invalid Kategori')};
    }


    const setDefaultPrice = val =>{
      if(val !== null && val !== undefined){ defaultPrice = val}else{ defaultPrice = 0};
    }
    const setBrandName = val =>{
      if(val !== null && val !== undefined){ brandName = val}else{ brandName = ""};
    }
    const setCountryOfOri = val =>{
      if(val !== null && val !== undefined){ countryOfOri = val}else{ countryOfOri = ""};
    }
    const setUrlImg1 = val =>{
      if(val !== null && val !== undefined){ urlImg1 = val}else{ urlImg1 = ""};
    }
    const setUrlImg2 = val =>{
      if(val !== null && val !== undefined){ urlImg2 = val}else{ urlImg2 = ""};
    }

    const setUrlImg3 = val =>{
      if(val !== null && val !== undefined){ urlImg3 = val}else{ urlImg3 = ""};
    }
    
    const setProductCondition = val =>{
      if(val !== null && val !== undefined){ productCondition = val}else{ productCondition = ""};
    }
    const setWeightGram = val =>{
      if(val !== null && val !== undefined){ weightGram = val}else{ weightGram = 0};
    }
    const setShortDescription = val =>{
      if(val !== null && val !== undefined){ shortDescription = val}else{ shortDescription = ""};
    }
    const setDetailProduct = val =>{
      if(val !== null && val !== undefined){ detailProduct = val}else{ detailProduct = ""};
    }
    const setAvailability = () =>{
      // console.log(this.refs.is_available.checked);
      isAvailable = this.refs.is_available.checked;
    };


    const handleInsertNewProduct = async () => {
      if (this.props.userCredential.token!=='' || 
      this.props.userCredential.token!== null || 
      this.props.userCredential.token !== undefined)
      { 

        const productData = {
          name : productName,
          merchant_id : this.props.userCredential.userId,
          category_id : Number(categoryId),
          default_price : Number(defaultPrice),
          brand_name : brandName,
          country_of_origin: countryOfOri,
          url_img1 : urlImg1,
          url_img2 : urlImg2,
          url_img3 : urlImg3,
          condition : productCondition,
          weight_gram : Number(weightGram),
          short_description : shortDescription,
          detail_product : detailProduct,
          is_available : isAvailable
        }
        console.log("Isi obj userProfileData ", productData);  

        await this.props.storeHandleInsertNewProduct(productData);
        clearChildren(this.refs.new_product_form);

      }else{
        alert('Silahkan login terlebih dahulu')
      }
    }

    function clearChildren(element) {
      for (var i = 0; i < element.childNodes.length; i++) {
         var e = element.childNodes[i];
         if (e.tagName) switch (e.tagName.toLowerCase()) {
            case 'input':
               switch (e.type) {
                  case "text": e.value ='';break;
                  case "radio":
                  case "checkbox": e.checked = false; break;
                  case "button":
                  case "submit":
                  case "image": break;
                  default: e.value = ''; break;
               }
               break;
            case 'select': e.selectedIndex = 0; break;
            case 'textarea': e.innerHTML = ''; break;
            default: clearChildren(e);
         }
      }
    }

    const categories = this.props.productCategoryList.map( (item, index) => <option key={index} value={item.id} >{item.name}</option>);
    

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
              <form style={{height:"1000px"}} className="form-control" onSubmit={e => e.preventDefault()} ref="new_product_form">       
                <h2>Input Produk/Item</h2>
                
                <input type="text" className="form-control product_name" name="product_name" 
                  placeholder="Product name" required autoFocus="" onChange={e => setProductName(e.target.value)} />
                

                <select className="select" onClick={ e => {setCategoryId(Number(e.target.value))}}>
                  {categories}
                </select>

                <input type="text" className="form-control product_price" name="product_price" 
                  placeholder="Harga Jual" required onChange={e => setDefaultPrice(e.target.value)} />  

                <input type="text" className="form-control brand_name" name="brand_name" 
                  placeholder="Merk Produk" required onChange={e => setBrandName(e.target.value)} />   

                <input type="text" className="form-control country_oo" name="country_oo" 
                  placeholder="Negara Asal" onChange={e => setCountryOfOri(e.target.value)} />  

                <input type="text" className="form-control url_img1" name="url_img1" 
                  placeholder="Gambar Produk 1" onChange={e => setUrlImg1(e.target.value)} />

                <input type="text" className="form-control url_img2" name="url_img2" 
                  placeholder="Gambar Produk 2" onChange={e => setUrlImg2(e.target.value)} />

                <input type="text" className="form-control url_img3" name="url_img3" 
                  placeholder="Gambar Produk 3" onChange={e => setUrlImg3(e.target.value)} />

                <input type="text" className="form-control product_condition" name="product_condition" 
                  placeholder="Kondisi Produk" onChange={e => setProductCondition(e.target.value)} />

                <input type="text" className="form-control weight_gram" name="weight_gram" 
                  placeholder="Berat Produk (Gram)" onChange={e => setWeightGram(e.target.value)} />
                
                <input type="text" className="form-control short_desc" name="short_desc" 
                  placeholder="Deskripsi singkat" onChange={e => setShortDescription(e.target.value)} />

                <input type="text" className="form-control product_detail" name="product_detail" 
                  placeholder="Detil Produk" onChange={e => setDetailProduct(e.target.value)} />

                <label>
                <input type="checkbox" className="form-control product_availability" name="product_availability" 
                  placeholder="Siap Dijual" onClick={setAvailability} ref="is_available" defaultChecked />
                Tersedia</label>
                

                <button className="btn btn-lg btn-primary btn-block" onClick={handleInsertNewProduct} > Submit </button>   
                
                <Link to="/" style={{margin:"50px 0 0 0"}}> <button className="btn btn-lg btn-primary btn-block" >Beranda</button></Link>   
                {/* <div><Link to="/"> Beranda </Link></div>  */}
              </form>
            </div>
          </React.Fragment>
      );
    }else{
      alert('Silahkan login terlebih dahulu');
      console.log(this.props);
      this.props.history.replace('/');
    }

    // console.log("NILAI TOKEN SAAT INI DI FORM NEW PRODUCT ", localStorage.getItem("token"));

    return (
      <div>
        {toRender}
      </div>
    );
  }
}

export default connect("userCredential, productCategoryList", actions)(withRouter(InsertNewProduct));