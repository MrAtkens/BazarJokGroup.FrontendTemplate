import { Fragment } from "react";

import { observer } from "mobx-react-lite"

import { getDiscountPrice } from "utilities/product";
import ordersStore from "stores/ordersStore"
import wishListStore from "stores/wishListStore"
import compareStore from "stores/compareStore"
import productStore from "stores/productsStore"

import ProductGrid from "./ProductGrid";

const ProductGridWrapper = observer(({
  bottomSpace,
  column
}) => {
  return (
    <Fragment>
      {productStore.newProducts &&
        productStore.newProducts.map((product) => {
          const discountedPrice = getDiscountPrice(
            product.price,
            product.discount
          ).toFixed(2);
          const productPrice = product.price.toFixed(2);
          const cartItem = ordersStore.cart.filter(
            (cartItem) => cartItem.id === product.id
          )[0];
          const wishlistItem = wishListStore.wishList.filter(
            (wishlistItem) => wishlistItem.id === product.id
          )[0];
          const compareItem = compareStore.compare.filter(
            (compareItem) => compareItem.id === product.id
          )[0];

          return (
            <ProductGrid
              key={product.id}
              product={product}
              discountedPrice={discountedPrice}
              productPrice={productPrice}
              cartItem={cartItem}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              bottomSpace={bottomSpace}
              cartItems={ordersStore.cart}
              column={column}
            />
          );
        })}
    </Fragment>
  );
})


export default ProductGridWrapper;
