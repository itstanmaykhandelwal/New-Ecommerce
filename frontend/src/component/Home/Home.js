import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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

                {/* <div className="col-lg-5">
                            <div className="hero-section-data">
                                <p className="intro-data">Welcome to</p>
                                <h2>Store</h2>
                                <p>
                                    A woman’s wardrobe is her opportunity to
                                    stand out and make a lasting first
                                    impression. Launched in 2015, Impressions
                                    Online Boutique offers a wide range of
                                    apparel to fit any woman’s unique sense of
                                    style. Our clothing and accessories are
                                    carefully curated to provide our customers
                                    the latest fashions.
                                </p>
                                <Link to="/home">Home</Link>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="hero-section-image">
                                <figure>
                                    <img
                                        src="images/hero-banner.jpg"
                                        alt="hero_img"
                                        className="img-style"
                                    />
                                </figure>
                            </div>
                        </div> */}
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
