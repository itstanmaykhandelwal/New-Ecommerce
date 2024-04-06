import React from "react";
import { Link } from "react-router-dom";
import {Rating} from '@material-ui/lab';

import "./product.css";

const ProductCard = ({ product }) => {
    const options = {
        value:product.ratings,
        readOnly:true,
        precision:0.5,
    };
    return (
        <>
            <Link className="productCard" to={`/product/${product._id}`}>
            {product.images && product.images.length > 0 ? <img src={product.images[0].url} alt="" /> : null}
                <p>{product.name}</p>
                <div>
                    <Rating {...options} /> <span className="productCardSpan">({product.numOfReviews} Review)</span>
                </div>
                <span>{`₹${product.price}`}</span>
                <span>{product.color}</span>
                <div className="bs-btn">Buy Now</div>
            </Link>
        </>
    );
};

export default ProductCard;
