import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/ProductAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
import {addItemsToCart} from '../../actions/cartAction.js';

const ProductDetail = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [loading, setLoading] = useState(true);
    const { product, error } = useSelector((state) => state.productDetails);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        const fetchData = async () => {
            setLoading(true);
            await dispatch(getProductDetails(match.params.id));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, match.params.id, error, alert]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "Yellow",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    };

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if(product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () =>{
        if(1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () =>{
        dispatch(addItemsToCart(match.params.id,quantity));
        alert.success("Items added to Cart")
    }
    return (
        <>
            {loading && <div>Loading...</div>}
            {!loading && (
                <>
                <MetaData title={`${product.name}`}/>
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className="detailsBlock2">
                                <ReactStars {...options} />
                                <span>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    Status:
                                    <b
                                        className={
                                            product.Stock < 1
                                                ? "redColor"
                                                : "greenColor"
                                        }
                                    >
                                        {product.Stock < 1
                                            ? "OutOfStock"
                                            : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>
                            <button className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Review yet</p>
                    )}
                </>
            )}
        </>
    );
};

export default ProductDetail;
