import { useState, Fragment } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { IoIosHeartEmpty, IoIosShuffle } from "react-icons/io";
import Swiper from "react-id-swiper";
import CustomScroll from "react-custom-scroll";
import { getProductCartQuantity } from "utilities/product";
import { ProductRating } from "../Product";

import orderStore from "stores/ordersStore"
import wishlistStore from "stores/wishListStore";
import compareStore from "stores/compareStore"

import {observer} from "mobx-react-lite";

const ProductModal = observer((props) => {
  const {
    product,
    discountedPrice,
    productPrice,
    cartItems,
    wishlistItem,
    compareItem,
  } = props;

  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const gallerySwiperParams = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      className="product-quickview"
      centered
    >
      <Modal.Body>
        <Modal.Header closeButton></Modal.Header>
        <div className="product-quickview__image-wrapper">
          <Swiper {...gallerySwiperParams}>
            {product.image &&
              product.image.map((single, key) => {
                return (
                  <div key={key}>
                    <div className="single-image">
                      <img
                        src={process.env.PUBLIC_URL + single}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
          </Swiper>
        </div>
        <Row>
          <Col md={7} sm={12} className="ml-auto">
            <CustomScroll allowOuterScroll={true}>
              <div className="product-quickview__content">
                <h2 className="product-quickview__title space-mb--20">
                  {product.name}
                </h2>
                <div className="product-quickview__price space-mb--20">
                  {product.discount > 0 ? (
                    <Fragment>
                      <span className="main-price discounted">
                        ${productPrice}
                      </span>
                      <span className="main-price">${discountedPrice}</span>
                    </Fragment>
                  ) : (
                    <span className="main-price">${productPrice} </span>
                  )}
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className="product-quickview__rating-wrap space-mb--20">
                    <div className="product-quickview__rating">
                      <ProductRating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="product-quickview__description space-mb--30">
                  <p>{product.shortDescription}</p>
                </div>

                {product.variation ? (
                  <div className="product-quickview__size-color">
                    <div className="product-quickview__size space-mb--20">
                      <div className="product-quickview__size__title">Size</div>
                      <div className="product-quickview__size__content">
                        {product.variation &&
                          product.variation.map((single) => {
                            return single.color === selectedProductColor
                              ? single.size.map((singleSize, i) => {
                                  return (
                                    <Fragment key={i}>
                                      <input
                                        type="radio"
                                        value={singleSize.name}
                                        checked={
                                          singleSize.name ===
                                          selectedProductSize
                                            ? "checked"
                                            : ""
                                        }
                                        id={singleSize.name}
                                        onChange={() => {
                                          setSelectedProductSize(
                                            singleSize.name
                                          );
                                          setProductStock(singleSize.stock);
                                          setQuantityCount(1);
                                        }}
                                      />
                                      <label htmlFor={singleSize.name}>
                                        {singleSize.name}
                                      </label>
                                    </Fragment>
                                  );
                                })
                              : "";
                          })}
                      </div>
                    </div>
                    <div className="product-quickview__color space-mb--20">
                      <div className="product-quickview__color__title">
                        Color
                      </div>
                      <div className="product-quickview__color__content">
                        {product.variation.map((single, i) => {
                          return (
                            <Fragment key={i}>
                              <input
                                type="radio"
                                value={single.color}
                                name="product-color"
                                id={single.color}
                                checked={
                                  single.color === selectedProductColor
                                    ? "checked"
                                    : ""
                                }
                                onChange={() => {
                                  setSelectedProductColor(single.color);
                                  setSelectedProductSize(single.size[0].name);
                                  setProductStock(single.size[0].stock);
                                  setQuantityCount(1);
                                }}
                              />
                              <label
                                htmlFor={single.color}
                                style={{ backgroundColor: single.colorCode }}
                              />
                            </Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {product.affiliateLink ? (
                  <div className="product-quickview__quality">
                    <div className="product-quickview__cart btn-hover">
                      <a
                        href={product.affiliateLink}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="lezada-button lezada-button--medium"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                ) : (
                  <Fragment>
                    <div className="product-quickview__quantity space-mb--20">
                      <div className="product-quickview__quantity__title">
                        Quantity
                      </div>
                      <div className="cart-plus-minus">
                        <button
                          onClick={() =>
                            setQuantityCount(
                              quantityCount > 1 ? quantityCount - 1 : 1
                            )
                          }
                          className="qtybutton"
                        >
                          -
                        </button>
                        <input
                          className="cart-plus-minus-box"
                          type="text"
                          value={quantityCount}
                          readOnly
                        />
                        <button
                          onClick={() =>
                            setQuantityCount(
                              quantityCount < productStock - productCartQty
                                ? quantityCount + 1
                                : quantityCount
                            )
                          }
                          className="qtybutton"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="product-quickview__button-wrapper d-flex align-items-center">
                      {productStock && productStock > 0 ? (
                        <button
                          onClick={() =>
                            orderStore.addCart(product)
                          }
                          disabled={productCartQty >= productStock}
                          className="lezada-button lezada-button--medium product-quickview__cart space-mr--10"
                        >
                          Add To Cart
                        </button>
                      ) : (
                        <button
                          className="lezada-button lezada-button--medium product-quickview__ofs space-mr--10"
                          disabled
                        >
                          Out of Stock
                        </button>
                      )}

                      <button
                        className={`product-quickview__wishlist space-mr--10 ${
                          wishlistItem !== undefined ? "active" : ""
                        }`}
                        title={
                          wishlistItem !== undefined
                            ? "Added to wishlist"
                            : "Add to wishlist"
                        }
                        onClick={
                          wishlistItem !== undefined
                            ? () => wishlistStore.deleteWishList(product)
                            : () => wishlistStore.acceptWishList(product)
                        }
                      >
                        <IoIosHeartEmpty />
                      </button>

                      <button
                        className={`product-quickview__compare space-mr--10 ${
                          compareItem !== undefined ? "active" : ""
                        }`}
                        title={
                          compareItem !== undefined
                            ? "Added to compare"
                            : "Add to compare"
                        }
                        onClick={
                          compareItem !== undefined
                            ? () => compareStore.deleteCompareStore(product)
                            : () => compareStore.acceptCompareStore(product)
                        }
                      >
                        <IoIosShuffle />
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            </CustomScroll>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
})

export default ProductModal;
