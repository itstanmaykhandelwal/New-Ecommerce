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
                        <div className="price-flex">
                            <span className="price">{`₹${product.price}`}</span>
                            <span className="color-circle" style={{ backgroundColor: product.color }}></span>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        </>
    );
};

export default ProductCard;
