import React, { useState } from 'react';
import Header from './components/Header';
import Card from './components/Card/Card';
import Dawer from './components/Dawer';

const arr = [
  {name: 'Мужские кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: '/img/sneakers/1.jpg' },  
  {name: 'Мужские кроссовки Nike Air Max 270', price: 15600, imageUrl: '/img/sneakers/2.jpg' },
  {name: 'Мужские кроссовки Nike Mid Suede', price: 14999, imageUrl: '/img/sneakers/3.jpg' },
  {name: 'Мужские кроссовки Nike Air Max 280', price: 15800, imageUrl: '/img/sneakers/4.jpg' }
]


function App() {

  const [cartOpened, setCartOpened] = useState(false);

  return (
    <div className="wrapper clear">
      {cartOpened ?  <Dawer onClose={() => setCartOpened(false)}/> : null}
    
    <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40 ">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex">
          {arr.map((obj)=>(
            <Card
              title = {obj.name}
              price = {obj.price}
              imageUrl = {obj.imageUrl}
              onFavorite = {() => console.log('Дабавили взакладки')}
              onPlus = {() => console.log('Нажали плюс')}
            
            /> 
           ))}
          
        </div> 
       </div>


    </div>
  );
}

export default App;
