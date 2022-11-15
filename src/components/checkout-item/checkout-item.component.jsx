import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckOutItem = ({ item }) => {
  const { name, quantity, price, imageUrl } = item;
  const { updateItemsInCart } = useContext(CartContext);

  const handleDelete = () => {
    updateItemsInCart(item, -1, true);
  };

  const handleIncrease = () => {
    updateItemsInCart(item);
  };

  const handleDecrease = () => {
    updateItemsInCart(item, -1);
  };

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        {quantity > 1 && (
          <div className='arrow' onClick={handleDecrease}>
            &#10094;
          </div>
        )}

        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={handleIncrease}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={handleDelete}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckOutItem;
