import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Product from "./Product/product.js";
import MetaData from "../layout/MetaData.js";
import { getProduct } from "../../actions/ProductAction.js";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
    const product = {
        name: "Blue Shirt",
        images: [
            {
                url: "https://5.imimg.com/data5/JH/SP/MY-33710583/men-s-blue-shirt-1000x1000.jpg",
            },
        ],
        price: "Rs300",
        _id: "TMK",
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <>
            <MetaData title="Ecomerce" />
            <section className="lyt-section typ-banner-lyt">
                <div className="container">
                    <div className="row typ-justify-space">
                        <div className="col-lg-5">
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
                            {/* Image Home Page */}
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
                        </div>
                    </div>
                </div>
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
                        <Product product={product} />
                        <Product product={product} />
                        <Product product={product} />
                        <Product product={product} />
                        <Product product={product} />
                        <Product product={product} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
