import React, {useState, useEffect}  from 'react';
import { useContext } from 'react';
import { MyContext } from '../../context';
import { Typography, Container  } from '@mui/material';
import { Select, MenuItem, FormControl, TextField } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import DisplayProduct from "../../components/sliderProduct";
import "./itemDetail.css";
import axios from 'axios';



function ItemDetailPage ({sku}) {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [image, setImage] = useState('');
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [numberValue, setNumberValue] = useState(1);
    const [info, setInfo] = useState([]);
    const {cart, handleChange } = useContext(MyContext);

    const [colorSelected, setColorselected] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [checkAlert, setCheckAlert] = useState(false);
    const [arrival, setArrival] = useState([]);

    useEffect(() => {
      axios.get(`https://skillkamp-api.com/v1/api/products/details/${sku}`) 
      .then(response => {
          const list = response.data.detail.data.catalog.product;
          setList(list);
          setImage(list.media[0].fullUrl);
          setColor(list.options[0].selections);
          setSize(list.options[1].selections);
          setLoading(false);
          setInfo([list.additionalInfo[0].description, list.additionalInfo[1].description]);
      })
      .catch(error => {
          console.log(error);
      });

      axios.get("https://skillkamp-api.com/v1/api/products/new_arrivals")
        .then(response => {
            const arrival = response.data.detail.data.catalog.category.productsWithMetaData.list;
            setArrival(arrival);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        });
  }, [sku]);


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


  const addToCart = (product, image, color, size, quantity) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      alert('This item is already in your cart');
    } else{
      handleChange([...cart, {product: product, image: image, color: color, size: size, quantity: quantity}]);  
      window.location.reload();
    }
  };



  return(
    <>
     {loading ? (
        <div className="loading-page">
            <ClipLoader
            size={80}
            color={"#36D7B7"}
            loading={loading}
            />
            <div className="loading-text">Loading...</div>
        </div>
    ) : (  
    <div className="item-detail-responsive"> 
        <div className='item-image-responsive'>
            <img 
                src= {image} 
                alt="description"
                style={{ maxWidth: '100%'}}
            />
            <Container>
                <h1>Arrivals</h1>
                <DisplayProduct slideData={arrival}/>
            </Container>
        </div>
        <div className='item-detail-selections'>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <Typography  variant="h5">{list.name}</Typography>
            <br/>
            {list.ribbon === "SALE" ? (
                <div style={{display: 'flex'}}>
                <h3 style={{marginRight: '5%'}}><del>{list.price}$</del></h3>
                <h2>{list.discountedPrice}$</h2>
                </div>
            ) : (
                <div style={{display: 'flex'}}>
                <h3>{list.price}$</h3>
                </div>
            )
            }
            <br/>
            <Typography variant="body1">sku: {list.sku}</Typography>
            <br/>
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
            <br></br>
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
            <br></br>
            <Typography variant="body1">Quantity: </Typography>
            <div>
                <TextField
                    type="number"
                    value={numberValue}
                    onChange={handleNumberChange}
                    InputProps={{ inputProps: { min: 1, max: 100 } }}
                />
            </div>
            <br></br>
            <button 
                className="App-default-button"
                style={{width: "100%",  marginBottom: "5%"}}
                onClick={() => {
                if (colorSelected !== "" && selectedOption !== null) {
                    addToCart(list, image, colorSelected[1], selectedOption, numberValue);
                } else {
                    setCheckAlert(true);
                }
                }}     
            >
                Add to Cart
            </button>

            </div>
            <div style={{marginTop: '5%', paddingBottom: '5%', borderBottom: '2px solid black'}}>
                <h1>Product Info</h1>
                <p>
                {info[0]}
                </p>
            </div>
            <div style={{marginTop: '5%', paddingBottom: '5%', borderBottom: '2px solid black'}}>
                <h1>Refund Policy</h1>
                <p>{info[1]}</p>
            </div>
        </div>
    </div>
    )}
    </>
  )
}

export default ItemDetailPage