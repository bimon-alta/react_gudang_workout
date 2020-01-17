import createStore from "unistore";
import axios from 'axios';

const allState = {
  APIDomainRoot: 'http://localhost:5000',
  userCredential: {
    isLoginBtnClicked: false,
    userId: 0,
    userName: '',
    email: '',
    password: '',
    isLogin: false,
    isRemembered: false,
    isAdmin: false,
    isMerchant: false,
    token:'',
    
  },
  isSuccessfulCreateNewUser: false,
  productCategoryList:[],
  reqParamsReqProducts: {
    p:1, 
    rp:20, 
    orderby: 'created_at', 
    sort: 'desc'
  },
  productList:[],
  productListBySale:[],
  productById: [],
  selectedProduct:{
    productId:0,
    qty:1,
    priceOnSale:0,
    discountAmount:0
  },
  saleSummary:{
    saleId: 0,
    total_bill: 0,
    is_paid: false,
    saleDetails:[]
  },
  bankAccountList:[],
  selectedBankAcc:{
    id:0,
    bankName:'',
    accName:'',
    accNo:''
  },
  payment:{
    id: 0,
    saleId: 0,
    bankId: 0,
    totalToTransfer: 0,
    expiredTime: 0,
    urlProofImg: '',
    isPaid: false
  }

};

export const store = createStore(allState);

export const actions = store => ({

  handleIsRememberState: (state, el) =>{
    store.setState({userCredential: {...store.state, isRemembered: el.target.checked}});
  },

  storeHandleRegisterNewUser: async (state, userName, email, password) => {

    const req = {
      method: "post",
      url: state.APIDomainRoot+"/user",
      headers: {
        "Content-Type":"application/json"
      },
      data: {
        user_name: userName,
        email: email,
        the_password: password
      },
    };
    

    await axios(req)
    .then( async response => {
      await store.setState({userCredential: {
        ...state.userCredential,
        userName: response.data.result.user_name, 
        email: response.data.result.email,
        password: response.data.result.password_digest,
        isSuccessfulCreateNewUser: true
      }});
      
    })
    .catch( (error) => {
      console.log('gagal request ke server ', error);
    });

  },

  storeHandleLogout: async(state) => {
    // console.log("Proses LOGOUT");

    await store.setState({
      userCredential: {
        isLoginBtnClicked: false,
        userId: 0,
        userName: '',
        email: '',
        password: '',
        isLogin: false,
        isRemembered: false,
        isAdmin: false,
        isMerchant: false,
        token:'',
      },
      productById: [],
      selectedProduct:{
        productId:0,
        qty:1,
        priceOnSale:0,
        discountAmount:0
      },
      saleSummary:{
        saleId: 0,
        total_bill: 0,
        is_paid: false,
        saleDetails:[]
      }
    });

    alert('Anda telah logout');

    // console.log("nilai user cred setelah LOG OUT ",store.getState().userCredential);
    // localStorage.clear();
  },

  storeHandleLogin: async (state, userName, password) => {
    const req = {
      method: "post",
      url: state.APIDomainRoot+"/login",
      headers: {
        "Content-Type":"application/json"
      },
      data: {
        user_name : userName,
        the_password : password
      }
    };
    

    await axios(req)
    .then( response => {
       store.setState({userCredential: {
        ...state.userCredential,
        userId: response.data.result.id,
        userName: userName,
        password: password,
        isLogin: true,
        email: response.data.result.email,
        isAdmin: response.data.result.is_admin,
        isMerchant: response.data.result.is_merchant,
        token:  response.data.result.token,
        isLoginBtnClicked: true,
      }});

      // localStorage.setItem("is_login", true);
      // localStorage.setItem("token", store.getState().userCredential.token);

      alert('Selamat anda berhasil login');


    })
    .catch( error => {
      console.log('gagal request ke server ', error);
      alert('Maaf Username atau Password salah');
    });

    

  },

  storeHandleRegisterNewMerchant: async (state, merchantProfileData) => {
    const token = localStorage.getItem("token");
    if (token!=='' || token!== null || token !== undefined){
      const req = {
        method: "post",
        url: state.APIDomainRoot+'/merchant',
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+token
        },
        data: merchantProfileData,
      };
      

      await axios(req)
      .then(async response => {
        
        alert("Pendaftaran Mitra Baru berhasil");

      })
      .catch( (error) => {
        console.log('gagal request ke server ', error);
        alert("Pendaftaran Mitra Baru gagal");
      });
    }

    

  },

  storeHandleInsertNewProduct: async (state, productData) => {
    // console.log("DATA PRODUCT BY USER ",productData);

    // const token = localStorage.getItem("token");
    const token = state.userCredential.token;

    console.log("NILAI TOKEN SAAT INI ", token);

    console.log("NILAI PRODUCT DATA DI STORE ", productData)
    if (token!=='' || token!== null || token !== undefined){
      const req = {
        method: "post",
        url: state.APIDomainRoot+'/merchant/product/new',
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+token
        },
        data: productData,
      };
      

      await axios(req)
      .then(async response => {
        
        alert("Produk berhasil ditambahkan");

      })
      .catch( (error) => {
        console.log('Gagal Insert Produk baru ', error);
      });
    }

    

  },

  storeHandleUpdateUserProfile: async (state, userProfileData) => {
    // const token = localStorage.getItem("token");
    const token = state.userCredential.token;

    if (token!=='' || token!== null || token !== undefined){
      const req = {
        method: "put",
        url: state.APIDomainRoot+`/user/${state.userCredential.userId}`,
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+token
        },
        data: userProfileData,
      };
      

      await axios(req)
      .then(async response => {
        // await store.setState({userCredential: {
        //   ...state.userCredential,
        //   userName: response.data.result.user_name, 
        //   email: response.data.result.email,
        //   password: response.data.result.password_digest,
        // }});
        
        alert("Update profile berhasil");

      })
      .catch( (error) => {
        console.log('gagal request ke server ', error);
        alert("Update profile gagal");
      });
    }

    

  },

  storeReqAPIProductListBySale: async (state, rec_no, rec_page) => {
    
    const req = {
      method: "get",
      url: state.APIDomainRoot+"/product/top-sale",
      params: {r: rec_no, rp: rec_page},
      headers: {   
      },
      data: {
      }
    };

    await axios(req)
    .then(async response => {
      await store.setState({productListBySale: response.data});
      
      // console.log("NILAI PRODUCT LIST TOP SALE ", store.getState().productListBySale);
    })
    .catch( error => {
      // console.log('gagal request ke server ', error);
      alert('Gagal Request Product List By Sale');
    });
  },

  storeReqAPIProductList: async (state) => {
    // console.log("NILAI REQPARAMS ",reqParams);
    // const localParams = {};

    // for (var key in reqParams) {
    //   if (reqParams.hasOwnProperty(key)) {
    //     localParams[key] = reqParams[key];
    //   }
    // }

    // console.log("NILAI LOCAL PARAMS DI STATE", localParams);

    const req = {
      method: "get",
      url: state.APIDomainRoot+"/product",
      params: state.reqParamsReqProducts,
      headers: {   
      },
      data: {
      }
    };
    

    await axios(req)
    .then(async response => {
      await store.setState({productList: response.data});
      
      // console.log("NILAI PRODUCT LIST DI STORE ", store.getState().productList);
    })
    .catch( error => {
      // console.log('gagal request ke server ', error);
      alert('Gagal Request Product List');
    });

    

  },

  storeHandleSearch: async (state, categoryId, keyWord) => {
    let localReqParams = {};
    if(categoryId > 0){
      localReqParams = {
          p:1, 
          rp:20, 
          category_id: categoryId,
          search_keyword: keyWord,
          orderby: 'created_at', 
          sort: 'desc'
      }
    }else{
      localReqParams = {
        p:1, 
        rp:20, 
        search_keyword: keyWord,
        orderby: 'created_at', 
        sort: 'desc'
    }
    }


    console.log("Nilai localReqParams", localReqParams);

    const req = {
      method: "get",
      url: state.APIDomainRoot+"/product",
      params: localReqParams,
      headers: {   
      },
      data: {
      }
    };
    

    await axios(req)
    .then(async response => {
      await store.setState({productList: response.data});
      
      console.log("NILAI PRODUCT LIST DI STORE ", store.getState().productList);
    })
    .catch( error => {
      // console.log('gagal request ke server ', error);
      alert('Gagal Request Product List By Search');
    });

    

  },

  storeReqAPIProductById: async (state, productId) => {

    const req = {
      method: "get",
      url: state.APIDomainRoot+`/product/${productId}`,
      params: {
        
      },
      headers: {   
      },
      data: {
      }
    };
    

    await axios(req)
    .then(async response => {
      await store.setState({productById: response.data});
      
      // console.log("NILAI PRODUCT ID ", store.getState().productById);
    })
    .catch( error => {
      // console.log('gagal request ke server ', error);
      alert('Gagal Request Product By id');
    });

    

  },

  storeReqAPIProductCategories: async (state) => {
    const req = {
      method: "get",
      url: state.APIDomainRoot+`/product-category`,
      params: {
      },
      headers: {   
      },
      data: {
      }
    };
    

    await axios(req)
    .then(async response => {
      await store.setState({productCategoryList: response.data});
      
      // console.log("NILAI PRODUCT CATEGORIES ", store.getState().productCategoryList);
    })
    .catch( error => {
      // console.log('gagal request ke server ', error);
      alert('Gagal Request Product By id');
    });

    

  },

  storeSetStateReqParamsForReqProducts: async (state, reqParams) =>{
    // console.log("NILAI reqParams DI store DARI NAV", reqParams)
    await store.setState({reqParamsReqProducts: reqParams});
    // console.log("NILAI reqParams DI state ", store.getState().reqParamsReqProducts)
  },

  storeAPIReqAddToCart: async (state) => {
    // console.log("nilai token di store sblm cart", token);
    // const token = localStorage.getItem("token");

    const token = state.userCredential.token;

    if (token!==undefined && token!==null && token!==''){

      // console.log("Nilai state.productById ke-0",state.productById[0])

      const req = {
        method: "post",
        url: state.APIDomainRoot+"/cart",
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+token
        },
        data: {
          product_id: state.productById[0].id,
          qty: 1,
          price_on_sale: state.productById[0].default_price,
          discount_amount: 0
        },
      };
      

      await axios(req)
      .then(async response => {
        
        
        alert("Berhasil ditambahkan ke keranjang belanja");

      })
      .catch( (error) => {
        console.log('gagal request ke server ', error);
        alert("Gagal menambahkan ke keranjang belanja");
      });
    
    }else{
      alert("Silahkan login terlebih dahulu untuk berbelanja")
    }
    

  },

  storeSetSelectedProduct: async (state, productId, priceOnSale, discountAmount) => {
    await store.setState(
      {selectedProduct: {
        productId: productId,
        priceOnSale: priceOnSale,
        discountAmount: discountAmount
    }});

    // console.log("Nilai selectedProduct ", store.getState().selectedProduct)
  },

  storeAPIReqGetSaleDetails: async (state) =>{

    // const token = localStorage.getItem("token");
    const token = state.userCredential.token;

    if (token!==undefined && token!==null && token!==''){
      const req = {
        method: "get",
        url: state.APIDomainRoot+"/cart",
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+token
        },
        params: {

        },
        data: {
        },
      };
      

      await axios(req)
      .then(async response => {
        await store.setState({
          saleSummary:{
            saleId: response.data.sale[0].id,
            total_bill: response.data.sale[0].total_bill,
            is_paid: response.data.sale[0].is_paid,
            saleDetails: response.data.sale_detail
          }
        });

        // console.log("Nilai data Sale Details", store.getState().saleSummary.saleDetails);
        

      })
      .catch( (error) => {
        console.log('Gagal request data penjualan detail ke server ', error);
      });
    
    }else{
      alert("Silahkan login terlebih dahulu untuk berbelanja")
    }
    

  },

  storeAPIReqGetBankAccountList: async (state) =>{

    // const token = localStorage.getItem("token");
    const token = state.userCredential.token;

    if (token!==undefined && token!==null && token!==''){
      const req = {
        method: "get",
        url: state.APIDomainRoot+"/bank-accounts",
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+token
        },
        params: {

        },
        data: {
        },
      };
      

      await axios(req)
      .then(async response => {
        await store.setState(
          {
            bankAccountList: response.data,
            selectedBankAcc:{
              id: response.data[0].id,
              bankName: response.data[0].bank_name,
              accName: response.data[0].account_name,
              accNo: response.data[0].account_no
            }
          }
        );

        // console.log("nilai data bank account pertama", store.getState().selectedBankAcc)
        // console.log("Nilai data bank account list", store.getState().bankAccountList);
        

      })
      .catch( (error) => {
        console.log('Gagal request data bank account list ke server ', error);
      });
    
    }else{
      alert("Silahkan login terlebih dahulu untuk berbelanja")
    }
    

  },

  storeHandleSelectedBankAccChange: async (state, bankId) =>{
    // console.log("nilai bank Id ", bankId);

    let bankById = 0;
    for (let i=0;i<state.bankAccountList.length;i++){
      if(state.bankAccountList[i].id === bankId){
        bankById = state.bankAccountList[i];
        break;
      }
    }
    // console.log("nilai bankById ==== ", bankById);

    await store.setState(
      {
        selectedBankAcc:{
          id: bankById.id,
          bankName: bankById.bank_name,
          accName: bankById.account_name,
          accNo: bankById.account_no
        }
      }
    );

    // console.log("Nilai data selected bank account setelah diubah", store.getState().selectedBankAcc)
    

  },

  storeHandlePaymentConfirmation: async (state, urlPaymentImgConf) =>{
    // const token = localStorage.getItem("token");
    const token = state.userCredential.token;

    if (token!==undefined && token!==null && token!==''){

      //proses
      const req1 = {
        method: "post",
        url: state.APIDomainRoot+`/payment/${state.saleSummary.saleId}`,
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+token
        },
        params: {
        },
        data: {
          bank_account_id: state.selectedBankAcc.id
        },
      };
      
      // console.log("URL IMAGE", urlPaymentImgConf);
      // console.log("BANK ID ", state.selectedBankAcc.id);
      // console.log("NILAI REQ1", req1)

      await axios(req1)
      .then(async response => {
        // console.log("RESPONSE DATA ", response.data);
        await store.setState(
          {
            payment:{
              id: response.data.id,
              saleId: response.data.sale_id,
              bankId: response.data.bank_account_id,
              totalToTransfer: response.data.total_to_transfer,
              expiredTime: response.data.expired_time,
              urlProofImg: response.data.urlProofImg,
              isPaid: false
            }
          }
        );

      })
      .catch( (error) => {
        console.log('Gagal request POST insert new record ke table payment di server ', error);
      });

      const req2 = {
        method: "put",
        url: state.APIDomainRoot+`/payment/${state.saleSummary.saleId}`,
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+token
        },
        params: {
        },
        data: {
          url_proof_img: urlPaymentImgConf
        },
      };
      
      // console.log("URL IMAGE", urlPaymentImgConf);
      // console.log("BANK ID ", state.selectedBankAcc.id);
      // console.log("NILAI REQ1", req1)

      await axios(req2)
      .then(async response => {
        console.log("RESPONSE DATA UPDATE STATUS PEMBAYARAN", response.data);
        await store.setState(
          {
            saleSummary:{
              saleId: 0,
              total_bill: 0,
              is_paid: false,
              saleDetails:[]
            },
            bankAccountList:[],
            selectedBankAcc:{
              id:0,
              bankName:'',
              accName:'',
              accNo:''
            },
            payment:{
              id: 0,
              saleId: 0,
              bankId: 0,
              totalToTransfer: 0,
              expiredTime: 0,
              urlProofImg: '',
              isPaid: false
            }
          }
        );
        alert("Terima kasih atas konfirmasi pembayaran Anda. Pesanan akan segera kami proses.")

      })
      .catch( (error) => {
        console.log('Gagal request POST insert update status lunas table sales di server ', error);
      });


    
    }else{
      alert("Silahkan login terlebih dahulu untuk berbelanja")
    }
    

  },

  storeAddShippingFee: async (state, saleDetailId, destCity) =>{

    // const token = localStorage.getItem("token");
    const token = state.userCredential.token;

    if (token!==undefined && token!==null && token!==''){

      const req = {
        method: "post",
        url: state.APIDomainRoot+`/shipping-address/${saleDetailId}`,
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+token
        },
        params: {
        },
        data: {
          address: "",
          district: "",
          city: destCity,
          province: "",
          postal_code: 0
        },
      };
      
      
      await axios(req)
      .then(async response => {
        console.log("RESPONSE DATA ", response.data);
        
        // await store.setState(
        //   {
        //     payment:{
        //       id: response.data.id,
        //       saleId: response.data.sale_id,
        //       bankId: response.data.bank_account_id,
        //       totalToTransfer: response.data.total_to_transfer,
        //       expiredTime: response.data.expired_time,
        //       urlProofImg: response.data.urlProofImg,
        //       isPaid: false
        //     }
        //   }
        // );

      })
      .catch( (error) => {
        console.log('Gagal request POST insert new record ke table payment di server ', error);
      });


    
    }else{
      alert("Silahkan login terlebih dahulu untuk berbelanja")
    }
    

  },


});




