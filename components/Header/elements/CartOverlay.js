import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import CustomScroll from "react-custom-scroll";
import {observer} from "mobx-react-lite";

import { getDiscountPrice } from "utilities/product";
import ordersStore from "stores/ordersStore"

const CartOverlay = observer(({
  activeStatus,
  getActiveStatus,
}) => {
  let cartTotalPrice = 0;
  return (
    <div className={`cart-overlay ${activeStatus ? "active" : ""}`}>
      <div
        className="cart-overlay__close"
        onClick={() => {
          getActiveStatus(false);
          document.querySelector("body").classList.remove("overflow-hidden");
        }}
      />
      <div className="cart-overlay__content">
        {/*=======  close icon  =======*/}
        <button
          className="cart-overlay__close-icon"
          onClick={() => {
            getActiveStatus(false);
            document.querySelector("body").classList.remove("overflow-hidden");
          }}
        >
          <IoIosClose />
        </button>
        {/*=======  offcanvas cart content container  =======*/}
        <div className="cart-overlay__content-container">
          <h3 className="cart-title">Cart</h3>
          {ordersStore.cart.length >= 1 ? (
            <div className="cart-product-wrapper">
              <div className="cart-product-container">
                <CustomScroll allowOuterScroll={true}>
                  {ordersStore.cart.map((item, i) => {
                    const discountedPrice = getDiscountPrice(
                        item.product.price,
                        item.product.discount)

                    cartTotalPrice += discountedPrice * item.quantity;

                    return (
                      <div className="single-cart-product" key={i}>
                        <span className="cart-close-icon">
                          <button
                            onClick={() => ordersStore.decreaseQuantity(item.product)}
                          >
                            <IoIosClose />
                          </button>
                        </span>
                        <div className="image">
                          <Link
                            href={`/shop/product-basic/[slug]?slug=${item.product.slug}`}
                            as={`${process.env.PUBLIC_URL}/shop/product-basic/${item.product.slug}`}
                          >
                            <a>
                              <img
                                src={
                                  process.env.PUBLIC_URL + item.product.thumbImage[0]
                                }
                                className="img-fluid"
                                alt=""
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="content">
                          <h5>
                            <Link
                              href={`/shop/product-basic/[slug]?slug=${item.product.slug}`}
                              as={`${process.env.PUBLIC_URL}/shop/product-basic/${item.product.slug}`}
                            >
                              <a>{item.product.name}</a>
                            </Link>
                          </h5>
                          {item.product.selectedProductColor &&
                          item.product.selectedProductSize ? (
                            <div className="cart-item-variation">
                              <span>Color: {item.product.selectedProductColor}</span>
                              <span>Size: {item.product.selectedProductSize}</span>
                            </div>
                          ) : (
                            ""
                          )}
                          <p>
                            <span className="cart-count">
                              {item.quantity} x{" "}
                            </span>{" "}
                            <span className="discounted-price">
                              ${discountedPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CustomScroll>
              </div>
              {/*=======  subtotal calculation  =======*/}
              <p className="cart-subtotal">
                <span className="subtotal-title">Subtotal:</span>
                <span className="subtotal-amount">
                  ${cartTotalPrice.toFixed(2)}
                </span>
              </p>
              {/*=======  cart buttons  =======*/}
              <div className="cart-buttons">
                <Link
                  href="/other/cart"
                  as={process.env.PUBLIC_URL + "/other/cart"}
                >
                  <a>view cart</a>
                </Link>
                <Link
                  href="/other/checkout"
                  as={process.env.PUBLIC_URL + "/other/checkout"}
                >
                  <a>checkout</a>
                </Link>
              </div>
              {/*=======  free shipping text  =======*/}
              <p className="free-shipping-text">
                Free Shipping on All Orders Over $100!
              </p>
            </div>
          ) : (
            "No items found in cart"
          )}
        </div>
      </div>
    </div>
  );
})


export default CartOverlay;
