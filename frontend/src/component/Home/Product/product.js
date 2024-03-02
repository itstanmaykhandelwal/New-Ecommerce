import React from 'react'
import {Link} from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './product.css'

const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"Yellow",
    size: window.innerWidth < 600 ? 20:25,
    value:2.5,
    isHalf:true,
}

const Product = ({product}) => {
  return (
    <>
        <Link className="productCard" to={product._id}>
            <img src={product.images[0].url} className='img-fluid' alt="product_img"/>
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /> <span>(200 Review)</span>
            </div>
            <span>{product.price}</span>
            <div className='bs-btn'>Buy Now</div>
        </Link>
    </>
  )
}

export default Product