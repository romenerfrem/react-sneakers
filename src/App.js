import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import Dawer from './components/Drawer/Dawer';
import AppContext from './context';


function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
      async function fetchData(){
      try {
        const [cardsResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://620e05f3585fbc3359d41fe5.mockapi.io/cart'),
          axios.get('https://620e05f3585fbc3359d41fe5.mockapi.io/favorites'),
          axios.get('https://620e05f3585fbc3359d41fe5.mockapi.io/items'),
        ]);

         
          setIsLoading(false);
          setCartItems(cardsResponse.data);
          setFavorites(favoritesResponse.data);
          setItems(itemsResponse.data);
        
      } catch (error) {
        alert('Ошибка при запросе данных');
      }
      
    }
      fetchData();
  }, []);





  const onAddToCart = (obj) =>{
    try {
      if(cartItems.find(item => Number(item.id) === Number(obj.id))){
        axios.delete(`https://620e05f3585fbc3359d41fe5.mockapi.io/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else{
        axios.post('https://620e05f3585fbc3359d41fe5.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj])
      }
      
    } catch (error) {
      alert('Ошибка добавления в корзину');
    }

  }
  const onRemoveItem = (id) =>{
    axios.delete(`https://620e05f3585fbc3359d41fe5.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }


  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onAddToFavorite = async (obj) =>{
    try {
      if(favorites.find(favObj => favObj.id === obj.id)){
        axios.delete(`https://620e05f3585fbc3359d41fe5.mockapi.io/favorites/${obj.id}`);
        setFavorites(prev => prev.filter(item => item.id !== obj.id));
      } else{
        const {data} = await axios.post('https://620e05f3585fbc3359d41fe5.mockapi.io/favorites', obj);
      setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в закладки');
    }
    
  }
  
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }


  return (
    <AppContext.Provider value = {{
      items,
      cartItems, 
      favorites, 
      isItemAdded, 
      setCartOpened, 
      setCartItems,
      onAddToFavorite,
      onAddToCart
      }}>
    <div className="wrapper clear">
       
    <Dawer
      items={cartItems}
      onClose={() => setCartOpened(false)}
      onRemove={onRemoveItem}
      opened={cartOpened}
    />
    
    <Header onClickCart={() => setCartOpened(true)} />
     <Routes>
      <Route path="/" exact element = {
        <Home
          items={items}
          cartItems = {cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading ={isLoading}
        />}
      />
      <Route path="/favorites" exact element = {
        <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}
        />
    
     <Route path="/orders" exact element = {
        <Orders/>}
        />
     </Routes>

      


    </div>
    </AppContext.Provider>
  );
}

export default App;
