import React, { useEffect } from "react";
import "./Home.css";
import ProductCard from "./Product/ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/ProductAction.js";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Swipers from "./Swiper/Swiper.js";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <>
            <MetaData title="Ecomerce" />
            <section className="lyt-section typ-pt-0">
                <Swipers />
            </section>

            {/* // Section Two */}
            <section className="lyt-section">
                <div className="container">
                    <div className="row">
                        <div className="text-wrap">
                            <h2 className="common-heading">
                                Featured Products
                            </h2>
                        </div>
                    </div>
                    <div className="product-flex-lyt">
                        <div className="row">
                            {products &&
                                products.map((product) => (
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
