import React from 'react';
import Slider from "react-slick";
import { PopupItemDetail } from "./popupItem";


function SliderComponent ({ slideData }) {

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const Slide = ({ image }) => {
    return <img src={image} alt="slide" style={{ width: '100%', height: 'auto'}}/>;
  };

  return (
    <Slider {...settings}>
      {slideData.map((product) => (
        <>
          <Slide image={product.media[0].url} />
          <h5 style={{marginBottom: '5px', marginTop: '0'}}>{product.name}</h5>
          {product.ribbon === "SALE" ? (
            <div style={{display: 'flex', margin: 'auto', justifyContent: 'center'}}>
              <h4 style={{marginRight: '5%'}}><del>{product.price}$</del></h4>
              <h3>{product.discountedPrice}$</h3>
            </div>
          ) : (
            <div style={{display: 'flex', margin: 'auto', justifyContent: 'center'}}>
              <h3>{product.price}$</h3>
            </div>
          )
          }
          <PopupItemDetail sku={product.sku} />
        </>
      ))}
    </Slider>
  );
};

export default SliderComponent;