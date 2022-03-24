import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import Dawer from './components/Dawer';




function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);


  useEffect(()=>{
      axios.get('https://620e05f3585fbc3359d41fe5.mockapi.io/items').then((res) =>(
        setItems(res.data)
      ));
      axios.get('https://620e05f3585fbc3359d41fe5.mockapi.io/cart').then((res) =>(
        setCartItems(res.data)
      ));
  }, []);





  const onAddToCart = (obj) =>{
    axios.post('https://620e05f3585fbc3359d41fe5.mockapi.io/cart', obj);
    setCartItems(prev => [...prev, obj])
  }
  const onRemoveItem = (id) =>{
    axios.delete(`https://620e05f3585fbc3359d41fe5.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }


  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onAddToFavorite = (obj) =>{
    axios.post('https://620e05f3585fbc3359d41fe5.mockapi.io/favorites', obj);
    setFavorites(prev => [...prev, obj])
  }
  
  
  return (
    <div className="wrapper clear">
      {cartOpened ?  <Dawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}
    
    <Header onClickCart={() => setCartOpened(true)} />
     <Routes>
      <Route path="/" exact element = {
        <Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />}
      />
     </Routes>

      


    </div>
  );
}

export default App;
