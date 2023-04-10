import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./transaction.css"

function PaymentForm () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const [open, setOpen] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();


  const handleClick = () => {
    setOpen(false);
    localStorage.clear();
    navigate('/shop');
  }

  const handleBack = () => {
    navigate('/viewCart');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name === '' || email === '' || address === '' || city === '' || state === '' || zip === ''){
      alert("Please fill in the form");
    }
    
    if (!stripe || !elements) {
      return;
    }

    const billingDetails = {
      name: name,
      email: email,
      address: {
        line1: address,
        city: city,
        state: state,
        postal_code: zip,
        country: 'US',
      },
    };

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

    if (error) {
      console.log(error);
    } else {
      console.log(paymentMethod);
      setOpen(true);
    }
  };

  return (
    <>
        {open &&
        <div className="popup-bg">
            <div className="popup-thank">
                <h2>Thank you for your purchase</h2>
                <button className="App-default-button" onClick={()=>handleClick()} >Close</button>
            </div> 
        </div> 
        }
     <div className="payment-view">
        <div className="payment-method"> 
            <button className="App-default-button" onClick={()=>handleBack()}>
                  Go back
            </button>  
            <h1>Payment Method</h1>
            <div className="payment-box">
                <form onSubmit={handleSubmit}>
                    <div className="CardElementContainer">
                    <label htmlFor="card">Card Details</label>
                    <CardElement className="CardElement" id="card" options={{}} />
                    </div>
                </form>
            </div>
            <h1>Billing Information</h1>
            <div className="payment-box" style={{ display: 'flex'}}>
                <div style={{margin: 'auto'}}>
                    <form onSubmit={handleSubmit}>
                        <div className="payment-form">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="payment-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="payment-form">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>  
                    </form>
                </div>
                <div style={{margin: 'auto'}}>
                    <form onSubmit={handleSubmit}>
                    <div className="payment-form">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="payment-form">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="payment-form">
                    <label htmlFor="zip">Zip Code</label>
                    <input type="text" id="zip" value={zip} onChange={(e) => setZip(e.target.value)} />
                    </div>
                </form>
                </div>       
            </div>  
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', width: '80%'}}>
            <form onSubmit={handleSubmit}>
                <button className="App-default-button" type="submit" disabled={!stripe}>
                    Submit Payment
                </button>     
            </form>    
            </div>
        </div>
      <div className="tip-description"> 
        <div>
            <h2>Payment Methods</h2>
        </div>
        <div className="payment-box">
            <p>We accept the following secure payment methods:</p>
            <img 
                src={"/images/visa.svg"}
                alt="credit"
            />
            <img 
                src={"/images/mastercard.svg"}
                alt="credit"
            />
            <p>When you submit your payment 
                information your data is protected 
                by Secure Socket Layer (SSL) technology certified by a digital certificate.</p>
        </div>
      </div>
    </div>
    </>
  );
};


export default function App() {
  const stripePromise = loadStripe("pk_test_51MueXzC3AsrCrrha4jzZrq57fG7JyzrYRW6YdtG9qsG86G7G3B3LKmmQ77eWpudnDdlRJIzrycd4XWljFfzagVV200Qs7fRYDH");

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
