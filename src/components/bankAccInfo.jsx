import React from 'react'
// import Header from '../components/header';
// import NavigationBar from '../components/navigationBar';


import {withRouter, Link} from 'react-router-dom';
import { connect } from "unistore/react";
import {store, actions} from '../globalState/store';


import '../assets/styles/bankAccInfo.css';

const BankAccInfo = (props) => {
  // console.log("nilai props.selectedBankAcc", props.selectedBankAcc);
  return (
    <div>
      <h1>Informasi Rekening Bank</h1>
      <h3>{props.selectedBankAcc.accName}</h3>
      <h3>{props.selectedBankAcc.accNo}</h3>
    </div>
    
  );

}

export default connect("selectedBankAcc", actions)(withRouter(BankAccInfo));