import {Fragment, useEffect} from "react";
import Head from "next/head";
import {observer} from "mobx-react-lite";
import {Toaster} from "react-hot-toast";

import "../assets/scss/styles.scss";

import orderStore from "stores/ordersStore"
import wishListStore from "stores/wishListStore"

export default observer(({ Component, pageProps }) => {
    useEffect(() => {
      orderStore.getCart().then(async () => {
          await wishListStore.getWishList()
      })
    }, [])
    return (
        <Fragment>
            <Head>
                <title>React Next JS Multipurpose eCommerce Template</title>
                <link rel="icon" href={process.env.PUBLIC_URL + "/favicon.ico"}/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Component {...pageProps} />
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </Fragment>
    );
})
