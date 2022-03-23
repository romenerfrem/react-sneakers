import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Card from './components/Card/Card';
import Dawer from './components/Dawer';




function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);


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
  
  
  return (
    <div className="wrapper clear">
      {cartOpened ?  <Dawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}
    
    <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40 ">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки' }</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && <img onClick={()=>setSearchValue('')} className='clear cu-p' src="/img/btn-remove.svg" alt="Close" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
          //.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index)=>(
            <Card
              key = {index}
              title = {item.name}
              price = {item.price}
              imageUrl = {item.imageUrl}
              onFavorite = {() => console.log('Дабавили в закладки')}
              onPlus = {(obj) => onAddToCart(obj)}
            
            /> 
           ))}
          
        </div> 
       </div>


    </div>
  );
}

export default App;
