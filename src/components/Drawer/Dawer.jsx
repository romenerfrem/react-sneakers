import React from 'react';
import Info from '../info';
import axios from 'axios';
import {useCart} from '../../hooks/useCart';
import styles from './Drawer.module.scss';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Dawer = ({onClose, onRemove, items=[], opened}) => {
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
 
  
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://620e05f3585fbc3359d41fe5.mockapi.io/orders', {items: cartItems});
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      /*Проблема mockAPI*/
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://620e05f3585fbc3359d41fe5.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Не удалось создать заказ');
    }
    setIsLoading(false);
  }



  
  return (

            <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
              <div className={styles.drawer}>
                 <h2 className="d-flex justify-between mb-30 ">
                    Корзина <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove" />
                    </h2> 

                        {
                          items.length > 0 ? 
                          <div className="d-flex flex-column flex">
                            <div className="items">
                                {items.map((obj) => (
                                  <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg "> </div>
                                    <div className="mr-20 flex">
                                      <p className="mb-5">{obj.name}</p>
                                      <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={()=>onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                                  </div>
                                ))}
                            </div> 
                            <div className="cartTotalBlock">
                            <ul>
                                <li>
                                  <span>Итого:</span>
                                  <div></div>
                                  <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                  <span>Налог 5%:</span>
                                  <div></div>
                                  <b>{totalPrice * 0.05} руб.</b>
                                </li>
                            </ul>
                            <button disabled = {isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ</button>
                          </div>
                          </div>
                      : 
                      <Info
                        title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
                        description={
                          isOrderComplete
                            ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                            : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                        }
                        image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
                      />
                      
                      }  
          </div>
        </div>               
        

    );
};

export default Dawer;