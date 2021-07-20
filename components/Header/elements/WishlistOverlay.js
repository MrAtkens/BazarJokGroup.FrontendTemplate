import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import CustomScroll from "react-custom-scroll";
import { observer } from "mobx-react-lite"

import { getDiscountPrice } from "utilities/product";
import wishListStore from "stores/wishListStore"

const WishlistOverlay = observer(({
  activeStatus,
  getActiveStatus,
}) => {
  return (
    <div className={`wishlist-overlay ${activeStatus ? "active" : ""}`}>
      <div
        className="wishlist-overlay__close"
        onClick={() => {
          getActiveStatus(false);
          document.querySelector("body").classList.remove("overflow-hidden");
        }}
      />
      <div className="wishlist-overlay__content">
        {/*=======  close icon  =======*/}
        <button
          className="wishlist-overlay__close-icon"
          onClick={() => {
            getActiveStatus(false);
            document.querySelector("body").classList.remove("overflow-hidden");
          }}
        >
          <IoIosClose />
        </button>
        {/*=======  offcanvas wishlist content container  =======*/}
        <div className="wishlist-overlay__content-container">
          <h3 className="wishlist-title">Wishlist</h3>
          {wishListStore.wishList.length >= 1 ? (
            <div className="wishlist-product-wrapper">
              <div className="wishlist-product-container">
                <CustomScroll allowOuterScroll={true}>
                  {wishListStore.map((product, i) => {
                    const discountedPrice = getDiscountPrice(
                      product.price,
                      product.discount
                    ).toFixed(2);
                    return (
                      <div className="single-wishlist-product" key={i}>
                        <span className="wishlist-close-icon">
                          <button
                            onClick={() =>
                                wishListStore.deleteWishList(product)
                            }
                          >
                            <IoIosClose />
                          </button>
                        </span>
                        <div className="image">
                          <Link
                            href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                            as={`${process.env.PUBLIC_URL}/shop/product-basic/${product.slug}`}
                          >
                            <a>
                              <img
                                src={
                                  process.env.PUBLIC_URL + product.thumbImage[0]
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
                              href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                              as={`${process.env.PUBLIC_URL}/shop/product-basic/${product.slug}`}
                            >
                              <a>{product.name}</a>
                            </Link>
                          </h5>
                          <p>
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
              {/*=======  wishlist buttons  =======*/}
              <div className="wishlist-buttons">
                <Link
                  href="/other/wishlist"
                  as={process.env.PUBLIC_URL + "/other/wishlist"}
                >
                  <a>view wishlist</a>
                </Link>
              </div>
            </div>
          ) : (
            "No items found in wishlist"
          )}
        </div>
      </div>
    </div>
  );
})


export default WishlistOverlay;