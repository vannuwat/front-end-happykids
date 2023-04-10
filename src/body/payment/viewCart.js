import React, { useState, useEffect} from 'react';
import { AddCircleOutline, RemoveCircleOutline, Clear } from '@mui/icons-material';
import { IconButton, Typography} from '@mui/material';
import { useContext } from 'react';
import { MyContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import "./viewCart.css";

function ViewCartPayment(){

    const { cart , handleChange} = useContext(MyContext);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
  
    useEffect(() => {
      const newTotalPrice = cart.reduce((acc, item) => acc + (item.product.discountedPrice * item.quantity), 0);
      const totalPrice = newTotalPrice.toFixed(2);
      setTotal(totalPrice);
    }, [cart]);
  
    
  
    const handleDecreaseQuantity = (product) => {
      const existingIndex = cart.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex !== -1) {
        const updatedCart = [...cart];
        if (updatedCart[existingIndex].quantity > 1){
          updatedCart[existingIndex].quantity--;
          handleChange(updatedCart);
        }
      } else {
        // setCart([...cart, {product: product, quantity: 1}]);
        console.log("Error find cart index");
      } 
    };
    
  
    const handleIncreaseQuantity = (product) => {
  
      const existingIndex = cart.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingIndex].quantity++;
        handleChange(updatedCart);
      } else {
        // setCart([...cart, {product: product, quantity: 1}]);
        console.log("Error to increase");
      } 
    };
  
    const handleDelete = (product) => {
      const updatedCart = cart.filter(item => item.product.id !== product.id);
      handleChange(updatedCart);
    }
  
    const handlePaymentPage = () => {
      navigate('/payment');
    //   window.location.reload();
    }
  
    
    return(
      <div className="cart-view">
        <div className='show-cart'>
            <div style={{borderBottom: '3px solid black'}}>
                <h1>My Cart</h1>
            </div>
            <ul style={{listStyleType: 'none'}}>
                {cart.map((item) => (
                <div>
                <li key={item.product.id} className="my-element" >
                    <div>
                        <IconButton onClick={() => {handleDelete(item.product)}}>
                            <Clear />
                        </IconButton>
                    </div>
                    <div style={{minWidth: '150px', marginTop: '10px'}}>
                        <img
                            src={item.image}
                            alt="description"
                            style={{ width: '70%', height: '100%'}}
                        />
                    </div>
                    <div style={{width: '100%', marginTop: '10px', display: 'flex',flexDirection: 'column'}}>
                        <Typography variant="h6" style={{marginBottom: '10px'}}>{item.product.name}</Typography>                       
                        <Typography variant="h8" >{item.color}</Typography>
                        <Typography variant="h8" >{item.size}</Typography>
                        <Typography variant="h6" style={{marginTop: '10px'}} >{item.product.discountedPrice}$</Typography>
                    </div> 
                    <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
                        <div>
                            <IconButton onClick={() => handleDecreaseQuantity(item.product)}>
                                <RemoveCircleOutline />
                            </IconButton>
                        </div>                       
                        <div>
                            <Typography variant="h6" align="center">{item.quantity}</Typography>
                        </div>
                        <div>
                            <IconButton onClick={() => handleIncreaseQuantity(item.product)}>
                                <AddCircleOutline />
                            </IconButton>    
                        </div>                
                    </div>                      
                </li>
                </div>
                ))}
            </ul>
        </div>
        <div className='order-summary'>
            <div style={{borderBottom: '3px solid black'}}>
                <h1>Order Summary</h1>
            </div>
            <div style={{borderBottom: '1px solid black'}}>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <Typography variant="h8" align="left" style={{marginTop: '5%'}}>Subtotal</Typography>
                        <Typography variant="h8" align="left" style={{marginTop: '5%'}}>Shipping</Typography>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <Typography variant="h6" align="right" style={{marginTop: '5%'}}>{total}₺</Typography>
                        <Typography variant="h6" align="right" style={{marginTop: '5%'}}>Free</Typography>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <Typography variant="h6" align="left" style={{marginTop: '5%'}}>Total</Typography>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <Typography variant="h6" align="right" style={{marginTop: '5%'}}>{total}₺</Typography>
                </div>
            </div>  
            <button 
                style={{width: '100%', marginTop: '5%'}}
                className="App-default-button"
                onClick={()=> handlePaymentPage()}
                >
              
                Checkout
            </button>
           
        </div>  
      </div>
    )
  
  }

export default ViewCartPayment