import React, { useState, useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./components.css";

const images = [
  "https://skillkamp-api.com/static/54d6b9_eb6b50374a2e4a88839d77d165fc9f59_mv2.png",
  "https://skillkamp-api.com/static/54d6b9_1a533d5056dc4a77a0b0176b36ea9106_mv2.png",
  "https://skillkamp-api.com/static/54d6b9_594a0ac4e0af4753be00b5e6b236a156_mv2.png"
];

const settings = {
  arrows: false,
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Slide = () => (
  <Slider {...settings}>
    <div>
      <img src={images[0]} alt='random' style={{width: '100%' , height: 'auto'}}/>
    </div>
    <div>
      <img src={images[1]} alt='random' style={{ width: '100%' , height: 'auto'}}/>
    </div>
    <div>
      <img src={images[2]} alt='random' style={{ width: '100%' , height: 'auto'}}/>
    </div>
  </Slider>
);

export default function App() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={loaded ? 'loaded' : 'loading'} style={{ width: '100%', paddingTop: '7.2rem'}}>
      <Slide />
    </div>
  );
}