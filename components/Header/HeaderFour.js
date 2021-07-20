import { useState, useEffect, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import {observer} from "mobx-react-lite";

import {
  IoIosSearch,
  IoMdPerson,
  IoIosHeartEmpty,
  IoIosCart,
  IoIosMenu
} from "react-icons/io";
import NavigationOverlay from "./elements/NavigationOverlay";
import SearchOverlay from "./elements/SearchOverlay";
import CartOverlay from "./elements/CartOverlay";
import WishlistOverlay from "./elements/WishlistOverlay";
import MobileMenu from "./elements/MobileMenu";

import wishListStore from "../../stores/wishListStore"
import ordersStore from "../../stores/ordersStore"

const HeaderFour = observer(() => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [offCanvasNavigationActive, setOffCanvasNavigationActive] = useState(
    false
  );
  const [offCanvasSearchActive, setOffCanvasSearchActive] = useState(false);
  const [offCanvasCartActive, setOffCanvasCartActive] = useState(false);
  const [offCanvasWishlistActive, setOffCanvasWishlistActive] = useState(false);
  const [offCanvasMobileMenuActive, setOffCanvasMobileMenuActive] = useState(
    false
  );

  useEffect(() => {
    const header = document.querySelector("header");
    setHeaderTop(header.offsetTop);
    setHeaderHeight(header.offsetHeight);
    window.addEventListener("scroll", handleScroll);
    scroll > headerTop
      ? (document.body.style.paddingTop = `${headerHeight}px`)
      : (document.body.style.paddingTop = 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <Fragment>
      <header
        className={`transparent-style white-content ${
          scroll > headerTop ? "is-sticky" : ""
        }`}
      >
        <Container className="wide">
          <Row className="header-content align-items-center space-pt--30 space-pb--30">
            <Col>
              <div className="header-content__logo d-flex align-items-center">
                <button
                  onClick={() => {
                    setOffCanvasNavigationActive(true);
                  }}
                  className="d-none d-lg-block"
                >
                  <IoIosMenu />
                </button>
                <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                  <a>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                      className="img-fluid dark-logo"
                      alt=""
                    />
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/logo-alt.png"
                      }
                      className="img-fluid white-logo"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </Col>

            <Col>
              {/* icons */}
              <div className="header-content__icons text-right">
                <ul className="d-none d-lg-block">
                  <li>
                    <button
                      onClick={() => {
                        setOffCanvasSearchActive(true);
                        document
                          .querySelector("body")
                          .classList.add("overflow-hidden");
                      }}
                    >
                      <IoIosSearch />
                    </button>
                  </li>
                  <li>
                    <Link
                      href="/other/login-register"
                      as={process.env.PUBLIC_URL + "/other/login-register"}
                    >
                      <a>
                        <IoMdPerson />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setOffCanvasWishlistActive(true);
                        document
                          .querySelector("body")
                          .classList.add("overflow-hidden");
                      }}
                    >
                      <IoIosHeartEmpty />
                      {wishListStore.wishList.length >= 1 ? (
                        <span className="count">
                          {wishListStore.wishList.length ? wishListStore.wishList.length : ""}
                        </span>
                      ) : (
                        ""
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setOffCanvasCartActive(true);
                        document
                          .querySelector("body")
                          .classList.add("overflow-hidden");
                      }}
                    >
                      <IoIosCart />
                      {ordersStore.cart.length >= 1 ? (
                        <span className="count">
                          {ordersStore.cart.length ? ordersStore.cart.length : ""}
                        </span>
                      ) : (
                        ""
                      )}
                    </button>
                  </li>
                </ul>

                <ul className="d-block d-lg-none">
                  <li>
                    <Link
                      href="/other/wishlist"
                      as={process.env.PUBLIC_URL + "/other/wishlist"}
                    >
                      <a>
                        <IoIosHeartEmpty />
                        {wishListStore.wishList.length >= 1 ? (
                          <span className="count">
                            {wishListStore.wishList.length ? wishListStore.wishList.length : ""}
                          </span>
                        ) : (
                          ""
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/other/cart"
                      as={process.env.PUBLIC_URL + "/other/cart"}
                    >
                      <a>
                        <IoIosCart />
                        {ordersStore.cart.length >= 1 ? (
                          <span className="count">
                            {ordersStore.cart.length ? ordersStore.cart.length : ""}
                          </span>
                        ) : (
                          ""
                        )}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => setOffCanvasMobileMenuActive(true)}>
                      <IoIosMenu />
                    </button>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* navigation overlay */}
      <NavigationOverlay
        activeStatus={offCanvasNavigationActive}
        getActiveStatus={setOffCanvasNavigationActive}
      />

      {/* search overlay */}
      <SearchOverlay
        activeStatus={offCanvasSearchActive}
        getActiveStatus={setOffCanvasSearchActive}
      />

      {/* cart overlay */}
      <CartOverlay
        activeStatus={offCanvasCartActive}
        getActiveStatus={setOffCanvasCartActive}
      />

      {/* wishlist overlay */}
      <WishlistOverlay
        activeStatus={offCanvasWishlistActive}
        getActiveStatus={setOffCanvasWishlistActive}
      />
      {/* Mobile Menu */}
      <MobileMenu
        activeStatus={offCanvasMobileMenuActive}
        getActiveStatus={setOffCanvasMobileMenuActive}
      />
    </Fragment>
  );
})


export default HeaderFour;
