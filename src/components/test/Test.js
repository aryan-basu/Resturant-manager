import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase";
import Adddishes from "../Add item/Adddishes";


import './test.css';
const Test =(props) =>{

    const [items, setItems] = useState([]);
    const [books, setBooks] = useState(null);
    const [searchTerm,setsearchTerm]=useState("");
    const fullnameRef=useRef(null);
    const phonenumberRef=useRef(null);
    const seatnumberRef=useRef(null);
    const [payment,Setpayment]=useState("Cash");
    

    //const [data,setData]= useState({});
    

    var today = new Date();
    var year = today.getFullYear();
    var mes = today.getMonth()+1;
    var dia = today.getDate();
    var fecha =dia+"-"+mes+"-"+year;
    const maindata2=[];
    const timeInputRef = useRef(0);
const abc = poke =>{
  setsearchTerm(poke);
  //console.log('abc');

}

const submitdish =()=>{
//console.log(items);
let sum = 0;

for (let num of items) {

   sum = sum + num.cost
}
//console.log(sum);


//console.log(price);
const data={
  Name:fullnameRef.current.value,
  Phone:'0'+phonenumberRef.current.value,
  SeatNumber:seatnumberRef.current.value,
  Payement:payment,
  Totalprice:sum
 

  } 
 // console.log(data);
  //console.log(data);
  //items.push(data);
  //console.log(data);
  //console.log(items);
 // data.push(items);
 // items.push(data);
  //maindata.push(items);
 // const obj={};
  //console.log(maindata);
  const infoRef=firebase.database().ref(`coustmers/${fecha}/${data.Phone}/genralinfo`);
  infoRef.set(data);
  const foodref=firebase.database().ref(`coustmers/${fecha}/${data.Phone}/food`);
  const tempgref=firebase.database().ref('temp/generalinfo');
tempgref.set(data);
  
  infoRef.on('value', (snapshot) => {
   
  //console.log(p);
  });
 //console.log(maindata);
  const tempfref=firebase.database().ref('temp/foodinfo');
  //tempfref.push(items);
 tempfref.set(items);
  foodref.set(items);

  
 
  //console.log(xdata);
}
    const Adddish=()=>{
   // console.log('abc');
   const quantity=timeInputRef.current.value;
   const billwrapper=document.createElement('div');
   const quantitylist=document.createElement('li');
billwrapper.innerHTML="";
   const dish=searchTerm;
 
   quantitylist.innerHTML=quantity;
   firebase.firestore().collection("dishes").where("dish", "==", dish)
   .get()
   .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots
           var cost=doc.data().price;
           var perunitprice=doc.data().price;
           setsearchTerm('');
          cost=cost*quantity;
           const newItem = {
            Dish: dish,
            quantity: quantity,
            perunitprice:perunitprice,
            cost:cost
          };
        
          const newItems = [...items, newItem]
          setItems(newItems);
          
          // price=price+cost;
           //console.log(cost);
           //console.log(price);
       });
   })


   const dishlist =document.createElement('li');
   dishlist.innerHTML=dish;
   billwrapper.appendChild(dishlist);
   billwrapper.appendChild(quantitylist); 
   let container = document.querySelector("#container");
        container.appendChild(billwrapper);  


       
      
        
        //setInputValue('');
    }
    const incrementHandler = () => {
      const value = timeInputRef.current.value;
      timeInputRef.current.value = Number(value) + 1;
    };
    const decrementHandler = () => {
      const value = timeInputRef.current.value;
  
      //Guard Clause to avoid negative input
      if (+value === 0) return;
  
      timeInputRef.current.value = Number(value) - 1;
    };
 
 

    useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      
       await firebase.firestore().collection('dishes').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
              //  console.log(doc.data);
               maindata2.push({dish:doc.data().dish,Price:doc.data().price,});
                //console.log(doc.id, " => ", doc.data().firstName);
            });
           // console.log(maindata);
           // <CSVDownload data={maindata} target="_blank" />
          });

      // store the data into our books variable
      //console.log(maindata);
     setBooks(maindata2) ;
    
    }
  }, []); // <- you may need to put the setBooks function in this array
//console.log(books);
  
return (

    <div className="container">
     

     <h2>Place Order</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first">FuLL Name</label>
                <input type="text" ref={fullnameRef}className="form-control"  
                                 />
              </div>
            </div>
            {/*  col-md-6   */}
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="last">Phone Number</label>
                <input type="number" ref={phonenumberRef} className="form-control" />
              </div>
            </div>
            {/*  col-md-6   */}
          </div>
          <div className="row">
            
            {/*  col-md-6   */}
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="phone">Seat Number</label>
                <input type="number" className="form-control"  placeholder="Seat Number"ref={seatnumberRef} />
              </div>
            </div>
            {/*  col-md-6   */}
          </div>
          {/*  row   */}
          {/*  row   */}
          <label htmlFor="contact-preference">Mode of Payment</label>
          <div className="radio">
            <label>
              <input type="radio" name="contact-preference" id="contact-preference" onClick={() => {Setpayment("Card")} }  defaultChecked />Debit/Credit Card
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="contact-preference" id="contact-preference" onClick={() => {Setpayment("Cash")} } defaultChecked />Cash
            </label>
          </div>
      <h1 className="mt-2">Dishes</h1>
      <div className="time--input--container">
      <input type="text"placeholder="search .."value={searchTerm}onChange={(event)=>{
setsearchTerm(event.target.value);
        }} />

        <button
            className="time--input--icons "
            onClick={decrementHandler}
          >-
        </button>

        <input
          ref={timeInputRef}
          className="time--input"
          type="number"
          step="1"
          min="0"
          max="999"
        />
        <button
            className="time--input--icons"
            onClick={incrementHandler}
          > +
        </button>

        <button onClick={Adddish}>Add dish</button>
        <button onClick={submitdish}>submitdish</button>
        
        <a href="https://resturant-mangement-backend.herokuapp.com/downloadinvoice">Download invoice</a>
        <a href="https://resturant-mangement-backend.herokuapp.com/downloadxlx">Download sales report</a>
      </div>
    

      {/* display books from the API */}
      {books && ( 
        <div className="books">
  
  {books.filter((val)=>{if(searchTerm===""){
              return val
          }else if(val.dish.toLowerCase().includes(searchTerm.toLowerCase())){
        return val
          }
        }).map((book , index) => index<5&&(
            <div key={index}>
              <button onClick={()=>abc(book.dish)}>{book.dish}</button>
            </div>
          ))}
  
        </div>
      )}

<div id="container"></div>
    </div>
  )
  
}
       
  

export default Test;