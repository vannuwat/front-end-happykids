import React from 'react';
import Home from "./pages/home";
import Story from "./pages/story";
import Shop from "./pages/shop";
import { Routes, Route} from 'react-router-dom';
import ItemsPage from "./pages/item";
import ViewCart from "./pages/viewCart";
import Payment from "./pages/payment";
import Login from "./pages/login";
import "./font.css";
import "./App.css"

function App() {
  return (
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/itemDetail" element={<ItemsPage />} />
          <Route path="/viewCart" element={<ViewCart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/story" element={<Story />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
  );
}

export default App;
