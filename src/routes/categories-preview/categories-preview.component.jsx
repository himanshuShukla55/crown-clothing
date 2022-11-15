import { useContext, Fragment } from 'react';

import { ShopContext } from '../../contexts/shop.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const { shopData } = useContext(ShopContext);
  return (
    <Fragment>
      {Object.keys(shopData).map((title) => {
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={shopData[title]}
          />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
