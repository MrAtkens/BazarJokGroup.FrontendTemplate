import { Fragment } from "react";

import { observer } from "mobx-react-lite"

import { getDiscountPrice } from "utilities/product";
import ordersStore from "stores/ordersStore"
import wishListStore from "stores/wishListStore"
import compareStore from "stores/compareStore"
import productStore from "stores/productsStore"

import ProductGridTwo from "./ProductGridTwo";

const ProductGridTwoWrapper = observer(({
  bottomSpace,
}) => {
  return (
    <Fragment>
      {productStore.popularProducts &&
        productStore.popularProducts.map((product) => {
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
            <ProductGridTwo
              key={product.id}
              product={product}
              discountedPrice={discountedPrice}
              productPrice={productPrice}
              cartItem={cartItem}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              bottomSpace={bottomSpace}
              addToCart={ordersStore.addCart}
              addToWishlist={wishListStore.acceptWishList}
              deleteFromWishlist={wishListStore.deleteWishList}
              addToCompare={compareStore.acceptCompareStore}
              deleteFromCompare={compareStore.deleteCompareStore}
              cartItems={ordersStore.cart}
            />
          );
        })}
    </Fragment>
  );
});

export default ProductGridTwoWrapper;
