import { useEffect } from "react";
import {observer} from "mobx-react-lite";

import {LayoutOne} from "components/Layout";
import {HeroSliderOne} from "components/HeroSlider";
import {ProductTab} from "components/ProductTab";
import {ImageCta} from "components/Cta";
import heroSliderData from "data/hero-sliders/hero-slider-one.json";
import imageCtaData from "data/image-cta/image-cta-one.json";

import productStore from "stores/productsStore"

const Home = observer(() => {

    useEffect(() => {
        productStore.getNewProducts().then(() =>
            productStore.getSaleProducts().then(() => {
                productStore.getPopularProducts()
            }))
    }, [])

    return (
        <LayoutOne aboutOverlay={false}>
            {/* hero slider */}
            <HeroSliderOne sliderData={heroSliderData} />

            {/* product tab */}
            <ProductTab
                newProducts={productStore.newProducts}
                popularProducts={productStore.popularProducts}
                saleProducts={productStore.saleProducts}
            />

            {/* image cta */}
            <ImageCta
                image={imageCtaData.image}
                tags={imageCtaData.tags}
                title={imageCtaData.title}
                url={imageCtaData.url}
            />
        </LayoutOne>
    );
})

export default Home;
