import { Fragment } from "react";

import { observer } from "mobx-react-lite";
import { getDiscountPrice } from "utilities/product";
import orderStore from "stores/ordersStore"
import productStore from "stores/productsStore"

import ProductWidget from "./ProductWidget";

const ProductWidgetWrapper = observer(({
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
          const cartItem = orderStore.cart.filter(
            (cartItem) => cartItem.id === product.id
          )[0];

          return (
            <ProductWidget
              key={product.id}
              product={product}
              discountedPrice={discountedPrice}
              productPrice={productPrice}
              cartItem={cartItem}
              bottomSpace={bottomSpace}
              addToCart={orderStore.addCart}
              sliderClass={sliderClass}
            />
          );
        })}
    </Fragment>
  );
})

export default ProductWidgetWrapper;
