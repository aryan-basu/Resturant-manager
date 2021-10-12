import React  from "react";
import firebase from '../firebase/firebaseutils';
import {v4 as uuid} from "uuid"; 

import Test from "./test/Test";

class dashboardform extends React.Component {
  constructor() {
    super();
    this.state = {
        firstName: '',
        lastName:'',
        pcnumber: '',
        starttime: '',
    
    }
}

handleSubmit = async event => {
 
  const maindata=[];
  event.preventDefault();
  var today = new Date();
  var year = today.getFullYear();
  var mes = today.getMonth()+1;
  var dia = today.getDate();
  var fecha =dia+"-"+mes+"-"+year;
  const { firstName, lastName, pcnumber, starttime } = this.state;
  //const db = getFirestore(firebase);
  const data ={
    firstName: firstName,
    lastName:lastName,
    starttime:starttime,
    pcnumber:pcnumber
    
  };
 
 // console.log(data);
const roomRef=firebase.firestore().collection('coustmers').doc('lahurabir').collection(`${fecha}`).doc(`${uuid()}`);
 roomRef.set(data);
 // const res = await db.collection('dashboard-info').doc('abc').set(data);

 firebase.firestore().collection('coustmers').doc('lahurabir').collection(`${fecha}`).get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data);
     maindata.push({PcNumber:doc.data().pcnumber,Starttime:doc.data().starttime,FirstName:doc.data().firstName,LastName:doc.data().lastName,});
      //console.log(doc.id, " => ", doc.data().firstName);
  });
 // console.log(maindata);
 // <CSVDownload data={maindata} target="_blank" />
});
 //console.log(snapshot);
 //console.log(maindata);

};
handleChange = event => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
};
render(){
  const { firstName, lastName, pcnumber, starttime } = this.state;
 
    return (

        <div className="container">
        
        <form onSubmit={this.handleSubmit}>
          <h2>Place Order</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="first">First Name</label>
                <input type="text" className="form-control"    name='firstName'
                                value={firstName}
                                onChange={this.handleChange} />
              </div>
            </div>
            {/*  col-md-6   */}
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="last">Last Name</label>
                <input type="text" className="form-control" placeholder id="last" name="lastName" value={lastName}onChange={this.handleChange}/>
              </div>
            </div>
            {/*  col-md-6   */}
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="inputMDEx1">Choose your time</label>
                <input type="time" id="inputMDEx1" className="form-control" name="starttime"value={starttime}onChange={this.handleChange} />
              </div>
            </div>
            {/*  col-md-6   */}
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="phone">PC Number</label>
                <input type="number" className="form-control" id="phone" placeholder="Pc Number" name="pcnumber"value={pcnumber}onChange={this.handleChange} />
              </div>
            </div>
            {/*  col-md-6   */}
          </div>
          {/*  row   */}
          {/*  row   */}
          <label htmlFor="contact-preference">When is the best time of day to reach you?</label>
          <div className="radio">
            <label>
              <input type="radio" name="contact-preference" id="contact-preference" defaultValue="am" defaultChecked />1 hour
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="contact-preference" id="contact-preference" defaultValue="pm" defaultChecked />2 hour
            </label>
          </div>
          <button type="submit">submit</button>
        </form>
        <Test/>
        <a href="https://backendps16.herokuapp.com/" target="_blank" rel="noopener noreferrer">Download</a>
        </div>
    
    );
    
}
}
export default dashboardform;