import {Fragment} from "react";
import {HeaderOne} from "../Header";
import {FooterOne} from "../Footer";

const LayoutOne = ({children, aboutOverlay}) => {
    return (
        <Fragment>
            <HeaderOne/>
            {children}
            <FooterOne/>
        </Fragment>
    );
};

export default LayoutOne;
