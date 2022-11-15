import { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context';

import './cart-icon.styles.scss';

const CartIcon = ({ quantity }) => {
  const { visible, setVisible } = useContext(CartContext);

  const handleToggle = (event) => {
    setVisible(!visible);
  };

  return (
    <div className='cart-icon-container' onClick={handleToggle}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{quantity}</span>
    </div>
  );
};

export default CartIcon;
