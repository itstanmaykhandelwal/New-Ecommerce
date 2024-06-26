import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/ProductAction";
import ReviewCard from "./ReviewCard.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
import {addItemsToCart} from '../../actions/cartAction.js';
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from '@material-ui/core'
import {Rating} from '@material-ui/lab';
import { NEW_REVIEW_RESET } from "../../constants/productConstant.js";

const ProductDetail = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [loading, setLoading] = useState(true);
    const { product, error } = useSelector((state) => state.productDetails);

    const {success,error: reviewError} = useSelector((state) => state.newReview)
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Review Submitted Successfully");
            dispatch({type:NEW_REVIEW_RESET})
        }
        const fetchData = async () => {
            setLoading(true);
            await dispatch(getProductDetails(match.params.id));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, match.params.id, error, alert,success,reviewError]);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly:true,
        precision:0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open,setOpen] = useState(false);
    const [rating,setRating] = useState(0);
    const [comment,setComment] = useState("");

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

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating",rating);
        myForm.set("comment",comment);
        myForm.set("productId",match.params.id);
        dispatch(newReview(myForm));

        setOpen(false);
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
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button disabled={product.Stock<1 ?true:false} onClick={addToCartHandler}>Add to Cart</button>
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
                            <div className="detailsBlock-4 d-flex ">
                                Color : <p>{product.color}</p>
                            </div>
                            {/* <div>
                                <p>{product.color}</p>
                            </div> */}
                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>
                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog 
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle> 
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />       
                            <textarea 
                            className="submitDialogTextArea"
                                cols="30" 
                                rows="2"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            >
                            </textarea>        
                        </DialogContent>  
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                            <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                        </DialogActions>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review,index) => (
                                    <ReviewCard key={index} review={review} />
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
