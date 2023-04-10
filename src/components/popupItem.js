import React, {useState, useEffect}  from 'react';
import { useContext } from 'react';
import { MyContext } from '../context';
import { Button,  Dialog, DialogContent, DialogContentText, DialogActions, Typography, Select, MenuItem, FormControl, TextField } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./components.css";
import axios from 'axios';


export function PopupItemDetail ({sku}){
  
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>  
      <button 
          onClick={()=> handleOpen()}
          style={{marginBottom: '5%'}}
          className="App-default-button"        >
          Add to Cart
      </button>
      {open && <ProductDetail open={open} handleClose={handleClose} sku={sku}/>}
      </div>
    );
  }

function ProductDetail ({open, handleClose, sku}) {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [image, setImage] = useState('');
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [numberValue, setNumberValue] = useState(1);
    const {cart, handleChange } = useContext(MyContext);
    const skuData = sku;
    const [colorSelected, setColorselected] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [checkAlert, setCheckAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      axios.get(`https://skillkamp-api.com/v1/api/products/details/${skuData}`)
      .then(response => {
          const list = response.data.detail.data.catalog.product;
          setList(list);
          setImage(list.media[0].fullUrl);
          setColor(list.options[0].selections);
          setSize(list.options[1].selections);
          setLoading(false);
      })
      .catch(error => {
          console.log(error);
      });
  }, [skuData]);

  const handleNumberChange = (event) => {
    setNumberValue(event.target.value);
  };

  const handleImageChange = (color) => {
    const colorUrl = color.linkedMediaItems[0].fullUrl;
    const colorSelected = [color.value, color.description];
    setColorselected(colorSelected);
    setImage(colorUrl);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleClick = (skuData) => {
    navigate(`/itemDetail?sku=${skuData}`);
    window.location.reload();
  }

  const addToCart = (product, image, color, size, quantity) => {

    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      alert('This item is already in your cart');
    } else{
      handleChange([...cart, {product: product, image: image, color: color, size: size, quantity: quantity}]);  
    }
    handleClose();
  };

  return(
  <Dialog maxWidth="md" fullWidth={true} open={open} onClose={handleClose}>
    <DialogContent>

        {loading ? 
            <div className="loading-page">
              <ClipLoader
              size={80}
              color={"#36D7B7"}
              loading={loading}
              />
            <div className="loading-text">Loading...</div>
        </div>
         : <div className='popup-element'>
        <img 
          src= {image} 
          alt="description"
          style={{ width: '100%'}}
        />
         
        <DialogContentText className = "popup-element-content">
          <Typography  variant="h5">{list.name}</Typography>
         
          {list.ribbon === "SALE" ? (
                <div style={{display: 'flex'}}>
                <h3 style={{marginRight: '1em'}}><del>{list.price}$</del></h3>
                <h2>{list.discountedPrice}$</h2>
                </div>
            ) : (
                <div style={{display: 'flex'}}>
                <h3>{list.price}$</h3>
                </div>
            )}
         
          <Typography variant="body1">sku: {sku}</Typography>
          <Typography variant="body1">Color: {colorSelected[1]}</Typography>
          {checkAlert && colorSelected === "" && <p style={{color: 'red'}}>Please select a color</p>}
          <ul style={{listStyleType: 'none', display: "flex", padding: "0"}}>
            {color.map((color, index) => (
              <li key={color.id}>
                <button class="circle-button-components" onClick={() => {handleImageChange(color)}}
                  style={{backgroundColor: color.value, border: "1px solid rgba(128, 124, 124, 0.812)"}}>
                </button>
              </li>
            ))}
          </ul>
          <Typography variant="body1">Size: </Typography>
          <FormControl style={{width: '100%'}}>
          <Select value={selectedOption} onChange={handleOptionChange}>
              {size.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
            {checkAlert && selectedOption === null && <p style={{color: 'red'}}>Please select a value</p>}
          </FormControl>
          <div style={{marginTop: '1em', marginBottom: '1em'}}>
            <Typography variant="body1">Quantity: </Typography>
            <div>
              <TextField
                  type="number"
                  value={numberValue}
                  onChange={handleNumberChange}
                  InputProps={{ inputProps: { min: 1, max: 100 } }}
              />
            </div>
          </div>
          <Link onClick={() => handleClick(skuData)} className='menu-item-popup'>
            View More details
          </Link>     
          <br></br>
          <button 
            className="App-default-button"
            style={{width: "100%", marginTop: '1em'}}
            onClick={() => {
              if (colorSelected !== "" && selectedOption !== null) {
                addToCart(list, image, colorSelected[1], selectedOption, numberValue);
                handleClose();
              } else {
                setCheckAlert(true);
              }
            }}     
          >
            Add to Cart
          </button>
     
        </DialogContentText>
        </div>
    }
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClose()} color="primary">
        Close
      </Button>
    </DialogActions>  
  </Dialog>
  )
}