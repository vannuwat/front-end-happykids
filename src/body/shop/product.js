import React, {useState, useEffect}  from 'react';
import { Grid, Paper, Container, Collapse } from '@material-ui/core';
import { PopupItemDetail } from '../../components/popupItem';
import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core";
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import './product.css'; 


function CheckboxList ({setCheckbox}) {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const handleCheckboxChange = (event) => {
    const selectedSize = event.target.name;
    setSelectedSizes((prevSelectedSizes) =>
      prevSelectedSizes.includes(selectedSize)
        ? prevSelectedSizes.filter((size) => size !== selectedSize)
        : [...prevSelectedSizes, selectedSize]
    ); 
}

  const checkboxes = [
    { name: "0-3+months", label: "0-3 months" },
    { name: "3-6+months", label: "3-6 months" },
    { name: "6-12+months", label: "6-12 months" },
    { name: "12-18+months", label: "12-18 months" },
    { name: "18-24+months", label: "18-24 months" },
    { name: "2+years", label: "2 years" },
    { name: "3+years", label: "3 years" },
  ];

  const myCheckboxes = Object.values(checkboxes);
  const concatenatedString = selectedSizes.join("%2C");
  setCheckbox(concatenatedString);

  return (
    <FormControl component="fieldset">
      {myCheckboxes.map((size) => (
      <FormControlLabel
        key={size.name}
        control={
          <Checkbox
            checked={selectedSizes.includes(size.name)}
            onChange={handleCheckboxChange}
            name={size.name}
            color="black"
          />
        }
        label={size.label}
      />
    ))}
    </FormControl>
  );
}

function CheckboxColors ({setColor}) {
  const [selectedColor, setSelectedColor] = useState([]);
  const handleColorChange = (event) => {
    const selectedColor = event.target.name;
    setSelectedColor((prevSelectedColor) =>
      prevSelectedColor.includes(selectedColor)
        ? prevSelectedColor.filter((color) => color !== selectedColor)
        : [...prevSelectedColor, selectedColor]
    ); 
}

  const checkboxesColor = [
    { name: "Blue", label: "#45458F" },
    { name: "Cream", label: "#F1E0D6" },
    { name: "Green", label: "#86AD91" },
    { name: "Light+Pink", label: "#FFE5E9" },
    { name: "Peach", label: "#F9BB9C" },
    { name: "Terracota", label: "#CD7551" },
    { name: "White", label: "#FFFFFF" },
  ];

  const myColor = Object.values(checkboxesColor);
  const concatenatedString = selectedColor.join("%2C");
  setColor(concatenatedString);

  return (
    <FormControl component="fieldset" style={{}}>
      {myColor.map((color) => (
      <FormControlLabel
        key={color.name}
        control={
          <Checkbox
            checked={selectedColor.includes(color.name)}
            onChange={handleColorChange}
            name={color.name}
            style={{ color: color.label !== "#FFFFFF" ? color.label : "Grey" }}
          />    
        }
        label={color.name}
      />
    ))}
    </FormControl>
  );
}

export function ShowAllProduct() {
 
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    const [openCategory, setOpenCategory] = useState(true);
    const [openColor, setOpenColor] = useState(false);
    const [openSize, setOpenSize] = useState(false);

    const [type, setType] = useState("all");
    const [sale, setSale] = useState([]);
    const [special, setSpecial] = useState("");

    useEffect(() => {
    const filters = {
        CATEGORY: category,
        OPTION_COLOR: color,
        OPTION_LIST: size
    };

    const queryString = Object.entries(filters)
        .filter(([key, value]) => value !== '') // exclude filters with empty values
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    axios.get(`https://skillkamp-api.com/v1/api/products/?${queryString}`)
        .then(response => {
        const product = response.data.detail.data.catalog.category.productsWithMetaData.list;
        const saleProducts = product.filter(product => product.ribbon === "SALE");
        setSale(saleProducts);
        setList(product);
        setLoading(false);
        console.log(saleProducts);
        })
        .catch(error => {
        console.error(error);
        });
    }, [category, color, size]);

    if (loading) {
        return ( 
            <div className="loading-page">
                <ClipLoader
                size={80}
                color={"#36D7B7"}
                loading={loading}
                />
                <div className="loading-text">Loading...</div>
            </div>
        );
      }
    const myList = Object.values(list); 
    const mySale = Object.values(sale); 
    return (
        <div className = "product">
            <div className = "filter-product" >
                <h3 style={{paddingBottom: '5%', borderBottom: '1px solid grey'}}>Filter by</h3>
                <div style={{ paddingBottom: '5%'}}>
                  <button className={special ? "category-selected-btn" : "category-btn"} onClick={() => setSpecial(!special)}>
                    {special ? 'Special' : 'Special'}
                  </button>
                </div>
                <div style={{ paddingBottom: '5%', marginTop: '10%'}}>
                  <button className="App-default-button" onClick={() => setOpenCategory(!openCategory)}>
                    {openCategory ? 'Collapse' : 'Category'}
                  </button>
                  <Collapse in={openCategory}>
                    <div style={{marginTop: '10%'}}>
                        <button className={(type === "all" ? "category-selected-btn" : "category-btn")} style={{marginRight: '5%'}} onClick={() => {setCategory(''); setColor(''); setType("all");}}>
                            All
                        </button>
                        <button className={(type === "T-shirt" ? "category-selected-btn" : "category-btn")} style={{marginRight: '5%'}} onClick={() => {setCategory('T%20shirts'); setType("T-shirt");}}>
                            Tshirts
                        </button>
                        <button className={(type === "Bodysuits" ? "category-selected-btn" : "category-btn")} onClick={() => {setCategory('Bodysuits'); setType("Bodysuits");}}>
                            Bodysuits
                        </button>
                    </div>               
                  </Collapse>
                </div>
                <div style={{ paddingBottom: '5%', marginTop: '10%'}}>
                  <button className="App-default-button" onClick={() => setOpenColor(!openColor)}>
                    {openColor ? 'Collapse' : 'Color'}
                  </button>
                  <Collapse in={openColor}>
                    <CheckboxColors setColor={setColor}/>
                  </Collapse>
                </div>

                <div style={{ paddingBottom: '5%', marginTop: '10%'}}>
                  <button className="App-default-button" onClick={() => setOpenSize(!openSize)}>
                    {openSize ? 'Collapse' : 'Size'}
                  </button>
                  <Collapse in={openSize}>
                    <CheckboxList setCheckbox={setSize}/>
                  </Collapse>
                </div>
           
          </div>
            <div className = "product-show">
              {type === "all" ? <h1>Shop Collection</h1> :  <h1>Shop Collection: {type}</h1>}
                
                <Container maxWidth="xl">
                <Grid container spacing={2} >
                {special ? (
                  mySale.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}> 
                      <Paper variant="outlined" style={{ position: 'relative', height: 'auto', width: 'auto', border: 'none' }}>
                        { item.ribbon !== "" &&
                          <div className="ribbon-style">
                            <h5 style={{ marginTop: '4%' }}>{item.ribbon}</h5>
                          </div>
                        }
                        <img src={item.media[0].url} alt="description" style={{ width: '80%', height: 'auto' }} />
                        <h5 style={{ marginBottom: '5px', marginTop: '0' }}>{item.name}</h5>
                        {item.ribbon === "SALE" ? (
                          <div style={{ display: 'flex', margin: 'auto', justifyContent: 'center' }}>
                            <h3 style={{ marginRight: '5%' }}><del>{item.price}$</del></h3>
                            <h3>{item.discountedPrice}$</h3>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', margin: 'auto', justifyContent: 'center' }}>
                            <h3>{item.price}$</h3>
                          </div>
                        )}
                        <PopupItemDetail sku={item.sku} />
                      </Paper>
                    </Grid>
                  ))
                  ) : (
                    myList.map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} key={item.id}> 
                        <Paper variant="outlined" style={{ position: 'relative', height: 'auto', width: 'auto', border: 'none' }}>
                          { item.ribbon !== "" &&
                            <div className="ribbon-style">
                              <h5 style={{ marginTop: '4%' }}>{item.ribbon}</h5>
                            </div>
                          }
                          <img src={item.media[0].url} alt="description" style={{ width: '80%', height: 'auto' }} />
                          <h5 style={{ marginBottom: '5px', marginTop: '0' }}>{item.name}</h5>
                          {item.ribbon === "SALE" ? (
                            <div style={{ display: 'flex', margin: 'auto', justifyContent: 'center' }}>
                              <h3 style={{ marginRight: '5%' }}><del>{item.price}$</del></h3>
                              <h3>{item.discountedPrice}$</h3>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', margin: 'auto', justifyContent: 'center' }}>
                              <h3>{item.price}$</h3>
                            </div>
                          )}
                          <PopupItemDetail sku={item.sku} />
                        </Paper>
                      </Grid>
                    ))
                  )}               
                </Grid>
                </Container>
            </div>
        </div>   
    );
  }