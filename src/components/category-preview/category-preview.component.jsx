import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

const getPreviewProducts = (products) => {
  return products.filter((_, idx) => idx < 4);
};

const CategoryPreview = ({ title, products }) => {
  const previewProducts = getPreviewProducts(products);

  return (
    <div className='category-preview-container'>
      <h2>
        <Link to={title} className='title'>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className='preview'>
        {previewProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
