import React from "react";
import { Link } from "react-router-dom";
import { Rating } from '@material-ui/lab';
import NoImg from "../../../images/no-img.jpeg";
import "./product.css";
import { Card } from "react-bootstrap";

const ProductCard = ({ product }) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <>
            {/* <Link className="productCard" to={`/product/${product._id}`}> */}
            <Link to={`/product/${product._id}`}>
                {/* {product.images && product.images.length > 0 ? <img src={product.images[0].url} alt="" /> : null}
                <p>{product.name}</p>
                <div>
                    <Rating {...options} /> <span className="productCardSpan">({product.numOfReviews} Review)</span>
                </div>
                <span>{`₹${product.price}`}</span>
                <span>{product.color}</span>
                <div className="bs-btn">Buy Now</div> */}
                <Card>
                    <div className="img-height">
                    
                    {product.images && product.images.length > 0 ? (
                        
                        <img className="img-fluid typ-custom-height" src={product.images[0].url} alt="product" />
                    ) : (
                        <img src={NoImg} className="img-fluid " alt="no_img" />
                    )}
                    </div>
                    <Card.Body>
                        <div className="card--title--buying">
                            <Card.Title>{product.name}</Card.Title>
                            <div className="buy-btn">Buy Now</div>
                        </div>
                        <div>
                            <Rating {...options} /> <span className="productCardSpan">({product.numOfReviews} Review)</span>
                        </div>
                        <span className="price">{`₹${product.price}`}</span>
                        <span>{product.color}</span>
                    </Card.Body>
                </Card>
            </Link>
        </>
    );
};

export default ProductCard;
