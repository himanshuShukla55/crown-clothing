import { createContext, useState, useEffect } from 'react';

import { getCollectionsAndDocuments } from '../utils/firebase/firebase.utils';

export const ShopContext = createContext({
  shopData: {},
  setShopData: () => null,
});

const ShopProvider = ({ children }) => {
  const [shopData, setShopData] = useState({});
  const value = { shopData, setShopData };

  useEffect(() => {
    (async () => {
      const categoriesMap = await getCollectionsAndDocuments();
      setShopData(categoriesMap);
    })();
  }, []);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopProvider;
