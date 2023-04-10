import React, { useState, useEffect, useRef } from 'react';
import { AccountCircle, ShoppingCart, AddCircleOutline, RemoveCircleOutline, Clear } from '@mui/icons-material';
import { IconButton, Grid, Typography, Badge} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../context';
import { useNavigate } from 'react-router-dom';
import "./TopBar.css"; 

function AmountItem() {
  const { cart } = useContext(MyContext);

  return(
    <Badge badgeContent={cart.length} color='secondary' overlap="rectangular" style={{marginTop: '-4em'}}/>
    )
}

function ShowItemInCart(){

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
      console.log("Error to increase");
    } 
  };

  const handleDelete = (product) => {
    const updatedCart = cart.filter(item => item.product.id !== product.id);
    handleChange(updatedCart);
  }

  function handlePaymentPage() {
    navigate('/viewCart');
    window.location.reload();
  }

  return(
    <>
      <div className="pop-up-from-right-content">
        <ul className='pop-up-items'>
          {cart.map((item) => (
            <li key={item.product.id} style={{display: 'flex'}}>
              <div>
              <IconButton onClick={() => {handleDelete(item.product)}}>
                <Clear />
              </IconButton>
              </div>
              <img
                  src={item.image}
                  alt="description"
                  style={{ width: '25%', height: 'auto' }}
                />
              <div className='pop-up-sub-items'>
                <p>{item.product.name}</p>
              
                <p>{item.product.discountedPrice}$</p>
              </div>     
              <Grid container alignItems="center" justifyContent="center" spacing={4} style={{ margin: '10px' }}>
                <Grid item xs={1} sm={1}>
                  <IconButton onClick={() => handleDecreaseQuantity(item.product)}>
                    <RemoveCircleOutline />
                  </IconButton>
                </Grid>   
                <Grid item xs={2} sm={2}></Grid>
                <Grid item xs={1} sm={1}>
                  <Typography variant="h6" align="center">{item.quantity}</Typography>
                </Grid>
                <Grid item xs={1} sm={1}>
                  <IconButton onClick={() => handleIncreaseQuantity(item.product)}>
                    <AddCircleOutline />
                  </IconButton>             
                </Grid>
              </Grid>     
            </li>
          ))}
        </ul>
      </div>
      {cart.length !== 0 ? (
        <div className='pop-up-from-right-total'>
          <div>
            <h1>Subtotal</h1>
            <div style={{display: 'flex'}}>
              <h3>{total}$</h3>
              <div style={{marginLeft: '5%', marginTop: '10px'}}>
                <button 
                  className='App-default-button'
                  onClick={handlePaymentPage}   
                  >
                  View Cart
                </button>
              </div>
            </div>         
          </div>       
        </div>
        
        ) : (
          <div className='pop-up-from-right-total'>
          <h1>Cart is empty</h1>
        </div>  
      )}
    </>
  )

}

function PopUpFromRight() {

  const [isVisible, setIsVisible] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);

  };

  return (
    <div>
      <IconButton onClick={toggleVisibility}>
        <ShoppingCart />
      </IconButton>
      <div ref={menuRef} className={`pop-up-from-right ${isVisible ? 'visible' : ''}`}>
        <div className = "pop-up-from-right-header">
          <h1>Cart</h1>
          <button 
            className='App-default-button'
            onClick={toggleVisibility}   >
            Close
          </button>
        </div>
        <ShowItemInCart />
      </div>
    </div>
  );
}

function TopBar() {

  return (
    <div className="navtop">
        <header className="topic-header">
          <h1>Happy kids</h1>
        </header>
        <nav className="top-bar-menu">
          <ul className="menu">
              <li className="menu-item" style={{marginLeft: '1em'}}>
              <NavLink to="/">Home</NavLink>
              </li>
              <li className="menu-item">
              <NavLink to="/shop">Shop Collection</NavLink>
              </li>
              <li className="menu-item">
              <a href="/story">Our Story</a>
              </li>
              <AccountCircle />
              <li className="menu-item">
              <a href="/login">Log In</a>
              </li>
              <ul className='icon-item-cart' style={{marginLeft: '-1.5em'}}> 
                <li >  
                  <PopUpFromRight />      
                  <AmountItem />
                </li>
              </ul>      
          </ul>
        </nav>
    </div>
  );
};

export default TopBar
