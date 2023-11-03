import React, { useState } from "react";
import Input from "./Input";
import Step from "./Step";
import ArcadeImg from "../assets/icon-arcade.svg";
import AdvancedImg from "../assets/icon-advanced.svg";
import ProImg from "../assets/icon-pro.svg";
import Thank from "../assets/icon-thank-you.svg";

function Form() {
    const [count, setCount] = useState(0)
    const [input, setInput] = useState({
    name: "",
    eMail: "",
    pNumber: "",
    subs: "0",
    subscription: "Monthly",
    addOns: [],
    plan: ""

   })
   const [valid, setValid] = useState({
    name: {missed: true, correctly: true},
    eMail: {missed: true, correctly: true},
    pNumber: {missed: true, correctly: true},
    plan: true
   })

   const steps = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

   const addOns = [{
    heading: "Online service",
    text: "Access to multiplayer games",
    price: "1"
   } ,
   {
    heading: "Larger storage",
    text: "Extra 1TB of cloud save" ,
    price: "2"
   },
   {
    heading: "Customizable profile",
    text: "Custom theme on your profile",
    price: "2"
   }
  ]

 function nextStep() {

    switch(count) {
        case 0:
        const nameMissed = input.name.length === 0 ? false : true;
        const nameCorrect = nameMissed ? /^[A-z]+(\s[A-z]+)*$/.test(input.name) : true;
        
        const eMailMissed = input.eMail.length === 0 ? false : true;
        const eMailCorrect = eMailMissed ? /^[a-z0-9_]+@[a-z0-9]+.[a-z]+$/.test(input.eMail) : true;
        
        const pNumberMissed = input.pNumber.length === 0 ? false : true;
        const pNumberCorrect = pNumberMissed ?  /^[+]?\d{1}\s?\d{3}\s?\d{3}\s?\d{3}$/.test(input.pNumber): true;
        
        if (nameMissed && nameCorrect &&
            eMailMissed && eMailCorrect &&
            pNumberMissed && pNumberCorrect) {setCount(pre => pre + 1)}

         setValid(pre => {
               
        return {
            ...pre,
            name: {missed: nameMissed , correctly: nameCorrect},
            eMail: {missed: eMailMissed , correctly: eMailCorrect},
            pNumber: {missed: pNumberMissed , correctly: pNumberCorrect}
                }
             })
        
        break;
        case 1:
            const checkPlan = input.plan.length === 0 ? false : true;
            checkPlan && setCount(pre => pre + 1)
            setValid(pre => { 
                return {...pre, plan: checkPlan}})

        break;
        default:

              setCount(pre => pre + 1)

            
        
        
    }
 }

 function totalPrice() {
    const sumAddOns = input.addOns.reduce((total, item) => {
        return total + Number(item[1]);
    }, 0);
    if (input.subscription === "Monthly") {
        return `$${Number(input.plan[1]) + sumAddOns}/mo`;
    } else {
        return `$${Number(input.plan[1]) + sumAddOns + "0"}/yr`;
    }
}


    return <div className="container">
    <div className="step-container">
    {steps.map((item, index, arr) => {
        return  <Step key={index} id={index} count={count} arr={arr} content={item} />
    })}
     
    </div>
    <div className="info">
      {count === 0 &&<div className="step1">
          <h1>Personal info</h1>
          <p>Please provide your name, email adress, and phone number. </p>
          <div>
          <span className="input-name">Name</span>
          {!valid.name.missed && <span className="warning">This field is required</span>}
          {!valid.name.correctly && <span className="warning">This field is not formatted correctly</span>}
          <Input input={input} setInput={setInput} validation={valid} name="name" placeholder="e.g. Stephen King"/>
          </div>
          
          <div>
          <span className="input-name">Email Adress</span>
          {!valid.eMail.missed && <span className="warning">This field is required</span>}
          {!valid.eMail.correctly && <span className="warning">This field is not formatted correctly</span>}
          <Input input={input} setInput={setInput} validation={valid} name="eMail" placeholder="e.g. stephenking@lorem.com" />
          </div>

          <div>
          
          <span className="input-name">Phone Number</span>
          {!valid.pNumber.missed && <span className="warning">This field is required</span>}
          {!valid.pNumber.correctly && <span className="warning">This field is not formatted correctly</span>}
          <Input input={input} setInput={setInput} validation={valid} name="pNumber" placeholder="e.g. +1 234 567 890" />
          </div>
          </div> }

      {count === 1 && <div className="step2">
        <h1>Select your plan</h1>
        <p>You have the option of monthly or yearly billing.</p>
        <div className="plans">
        <Input input={input} setInput={setInput} type="radio" name="plan" value="Arcade" price="9" imgSrc={ArcadeImg} />
        <Input input={input} setInput={setInput} type="radio" name="plan" value="Advanced" price="12" imgSrc={AdvancedImg} />
        <Input input={input} setInput={setInput} type="radio" name="plan" value="Pro" price="15" imgSrc={ProImg} />
        {!valid.plan && <span className="warning" style={{marginTop: "1rem"}}>You have to choose a plan</span>}
        <div className="option-container">
            <span className={"option-text " + (input.subscription === "Monthly" && "color-marine-blue")}>Monthly</span>
            <Input input={input} setInput={setInput} type="range" name="subs" />
            <span className={"option-text " + (input.subscription === "Yearly" && "color-marine-blue")}>Yearly</span>
        </div>
        </div>
      </div>}

      {count === 2 && <div className="step3">
        <h1>Pick add-ons</h1>
        <p>Add-ons help enhance your gaming experience.</p>
        {addOns.map((item, index) => {
            return <Input input={input} setInput={setInput} content={item} key={index} id={index} type="checkbox" name="addOns" price={item.price} value={item.heading} />
        })}
        
      </div>
      }

      {count === 3 && <div className="step4">
      <h1>Finishing up</h1>
      <p>Double-check everything looks OK before comfirming.</p>
      <div className="summary-area">
      <div>
         <div>
         <p>{input.plan[0]} ({input.subscription})</p>
         <a onClick={() => setCount(1)}>Change</a>
         </div>
         <span className="plan-price">{input.subscription === "Monthly" ? `+${input.plan[1]}/mo` : `+${input.plan[1] + "0"}/yr`}</span>
      </div>
      
      <br />
      <hr />

      {input.addOns.map((item, index) => {
        return <div className="addOns-summary" key={index}>
        <span>{item[0]}</span><span>{input.subscription === "Monthly" ? `+$${item[1]}/mo` : `+$${item[1] + "0"}/yr`}</span>
        </div>
      })}
      </div>

      <div className="summary-total">
        <span>Total (per {input.subscription === "Monthly" ? "month" : "year"})</span><span>{totalPrice()}</span>
      </div>

      </div> }

      {count === 4 && <div className="step5">
        <img src={Thank} />
        <h1>Thank you!</h1>
        <p>Thanks for confirming your subscription! We hope you have fun using
        our platform. If you ever  need support, please feel free to email us
        at support@loremgaming.com</p>
      </div>}
      
    </div>

    {count < 4 && <div className="controller">
    <a onClick={nextStep} className={`next-button ${count === 3 && "confirm"}`}>{count === 3 ? "Confirm" : "Next Step"}</a>
    {count > 0 && count < 4 && <a onClick={() => {setCount(pre => pre - 1)}} className="pre-button">Go Back</a>}
    </div>}
      </div>
}



export default Form;