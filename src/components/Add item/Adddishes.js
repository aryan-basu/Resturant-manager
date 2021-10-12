import React from "react";
import './adddishes.css'
import { useRef } from 'react';
import firebase from "firebase";
import {v4 as uuid} from "uuid"; 
const Adddishes = () => {
    const dishref= React.createRef();
    const priceref= React.createRef();
  const handleSubmit=() =>{
console.log('here');
 const newinput ={
     dish:dishref.current.value,
     price:priceref.current.value
 }
 console.log(newinput);
 const roomRef=firebase.firestore().collection('dishes').doc(`${uuid()}`);
 roomRef.set(newinput);
// dishref.current.value='';
 //priceref.current.value='';
  }

    return (
        <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card box">
           
                <h1>Add dish</h1> 
                <p className="text-muted"> Please enter your Dishname and price!</p> <input type="text" name placeholder="Dish-Name" ref={dishref} /> <input type="number" name placeholder="Price" ref={priceref} />
                 <button  className="btn btn-primary btn-lg" onClick={handleSubmit} >submit</button>
                <div className="col-md-12">
                  <ul className="social-network social-circle">
                    <li><a href="#" className="icoFacebook" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
                    <li><a href="#" className="icoTwitter" title="Twitter"><i className="fab fa-twitter" /></a></li>
                    <li><a href="#" className="icoGoogle" title="Google +"><i className="fab fa-google-plus" /></a></li>
                  </ul>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    );

}
export default Adddishes;