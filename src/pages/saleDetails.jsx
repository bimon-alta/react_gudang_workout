import React from 'react'
import Header from '../components/header';
import NavigationBar from '../components/navigationBar';


import {withRouter, Link} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';


import '../assets/styles/saleDetails.css';

class SaleDetails extends React.Component{
  
  // state = {
  //   saleDetailId: 0
  // }

  componentDidMount = async() => {
    if(this.props.userCredential.isLogin){
      await this.props.storeAPIReqGetSaleDetails() ;
    }else{
      // this.props.history.push("/login");
      alert("Silahkan login terlebih dahulu");
    }
  };

    
  handleBtnHitungOngkir = async (saleDetailId, destCity) =>{
    // console.log("nilai Sale Detail Id ", saleDetailId);
    if(destCity===''){
      alert('Silahkan diisi dulu kota tujuan');
    }else{
      await this.props.storeAddShippingFee(saleDetailId, destCity);
      this.props.storeAPIReqGetSaleDetails();
    }
  }  
    
  render(){
    // console.log("panjang array ", this.props.saleSummary.saleDetails.length);

    // console.log("nilai salesummary", this.props.saleSummary.saleDetails)
    let destCity = '';

    const formatNumberByThousandSep = (numVal) => {
      return numVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    

    const handleChangeDestCity = (val) =>{
      destCity = val.trim();
    };

    let saleDetails = (
      <div>
        <h3>Keranjang Belanja Anda Masih Kosong</h3>
        <Link to="/" >
          <button type="button" className="btn btn-primary" >Beranda</button>
        </Link>
      </div>
    );

    let saleInfo = null;

    if (this.props.saleSummary.saleDetails.length > 0){
      saleInfo = (
        <div>
          {/* <h3>User ID: {this.props.userCredential.userId}</h3> */}
          <h3>Total Belanja: {formatNumberByThousandSep(this.props.saleSummary.total_bill)}</h3>
          
          <Link to="/confirm-payment" >
            <button type="button" className="btn btn-primary" >Bayar</button>
          </Link>
        </div>
      );

      saleDetails = this.props.saleSummary.saleDetails.map( (item, index) => {
        return(
          <div className="row sale-detail-row" data-id={item.item_sale.id} key={item.item_sale.id}>
            <div className="col-md-4">
              <div className="sale-detail-img-container">
                <img src={item.item_info.url_img1} alt=""/>
              </div>
            </div>
            <div className="col-md-8">
              <div>
                <h4>Nama: {item.item_info.name}</h4> 
                <h4>Harga: {formatNumberByThousandSep(item.item_sale.price_on_sale)}</h4> 
                <h4>Qty: {item.item_sale.qty}</h4> 
                <h4>Ongkir: {formatNumberByThousandSep(item.item_sale.total_shipping_fee)}</h4> 
                <h4>Total: {formatNumberByThousandSep(item.item_sale.total)}</h4> 
                  
              </div>
              <div>
                <h4>Masukkan nama kota/kabupaten tujuan pengiriman</h4>
                <input type="text" onChange={(e) => {handleChangeDestCity(e.target.value)}}/>
                <button type="button" className="btn btn-primary" onClick={() => {this.handleBtnHitungOngkir(item.item_sale.id, destCity)}} >Hitung Biaya Kirim</button>
              </div>
            </div>
          </div>
        );
      });
    }
    

    return (
      <div>
        <Header />
        <div className="container">
          {saleInfo}
          {saleDetails}
        </div>

      </div>

      
    );
  }
}

export default connect("userCredential, saleSummary", actions)(withRouter(SaleDetails));