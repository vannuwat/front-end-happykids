import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import SliderProduct from "../../components/sliderProduct";
import axios from 'axios';
import './displayArrival.css';

export default function DisplayProduct() {
  // localStorage.clear();
  // const dataArray = Object.values(data); // convert object to array
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const url = "https://skillkamp-api.com/v1/api/products/new_arrivals";

  useEffect(() => {

      axios.get(url)
      .then(response => {
          const list = response.data.detail.data.catalog.category.productsWithMetaData.list;
          setList(list);
          setLoading(false);
      })
      .catch(error => {
          console.log(error);
      });
  }, []);

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
  return (
      <div className = "ProductHome">
        <h1>New Arrivals</h1>
        <Container maxWidth="lg"  >
          <SliderProduct slideData={list}/>
        </Container>
        <Link to="/shop" style={{textDecoration: 'none'}}>
        <button 
          className='App-default-button'
          style={{margin: '5%'}}
        >
          Shop All
        </button>
        </Link>
      </div>
  );
}
