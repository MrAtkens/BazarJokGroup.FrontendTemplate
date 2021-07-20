import { Fragment } from "react";
import { observer } from "mobx-react-lite"

import { getDiscountPrice } from "utilities/product";
import ordersStore from "stores/ordersStore"
import wishListStore from "stores/wishListStore"
import compareStore from "stores/compareStore"
import productStore from "stores/productsStore"

import ProductGridFour from "./ProductGridFour";

const ProductGridFourWrapper = observer(({
  bottomSpace,
  sliderClass
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
            <ProductGridFour
              key={product.id}
              product={product}
              discountedPrice={discountedPrice}
              productPrice={productPrice}
              cartItem={cartItem}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              bottomSpace={bottomSpace}
              addToCart={ordersStore.addCart(product)}
              addToWishlist={wishListStore.acceptWishList(product)}
              deleteFromWishlist={wishListStore.deleteWishList(product)}
              addToCompare={compareStore.acceptCompareStore(product)}
              deleteFromCompare={compareStore.deleteCompareStore(product)}
              cartItems={ordersStore.cart}
              sliderClass={sliderClass}
            />
          );
        })}
    </Fragment>
  );
})

export default ProductGridFourWrapper;
