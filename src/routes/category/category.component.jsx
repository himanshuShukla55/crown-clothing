import { Fragment, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ShopContext } from '../../contexts/shop.context';

import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { shopData } = useContext(ShopContext);

  useEffect(() => {
    setProducts(shopData[category]);
  }, [category, shopData]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='shop-category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
