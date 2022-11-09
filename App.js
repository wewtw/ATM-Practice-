import "./App.css";
import React from "react";
import Form from 'react-bootstrap/Form';

function App(){
const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input
        id="number-input"
        type="number"
        width="200"
        onChange={onChange}
      ></input>
      <input
        type="submit"
        disabled={!isValid}
        width="200"
        value="Submit"
        id="submit-input"
      ></input>
    </label>
    
  );
};



const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(777);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  //const [logTotal]= React.useState([`${status}`]);
  ////////////////////////////////////////////
  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (atmMode === "Cash Back" && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };




  /////////////////////////////////////////
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);

    event.preventDefault();
  };
  


  ///////////////////////////////////////////
  const handleModeSelect = (event) => {
    console.log(event.target.value);
    //how change in selection.
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if (event.target.value === "Deposit") {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };


  ////////////////////////////////////////////////////////////
  //const activityLogHandle = (e, logTotal)=>{
    //let log = [`${totalState}`]
    // for(i=0; i < log.length; i++){
    //   log = logTotal;
    // }
    //return
  //}



 

  return (
    <Form id="form" onSubmit={handleSubmit}>
      <>
        <h2 id="total">{status}</h2>
        <label className="dlable">Chose to deposit or cashback</label>
        
        <select
          onChange={(e) => handleModeSelect(e)} //this hadle onChange event shows us when the selecter has benn swiched
          name="mode"
          id="mode-select"
        >
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        
        {/* <Alert>${validAlert()}</Alert> */}
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}

          ></ATMDeposit>
        )}
        <p></p>
        <p id="logStore"> Log:{activityLogHandle}</p>
      </>
    </Form>
  );
};
}
export default App;
