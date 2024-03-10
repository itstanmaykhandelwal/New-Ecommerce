import React, { useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductAction";
import ProductCard from "../Home/Product/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {useAlert} from 'react-alert';
import MetaData from "../layout/MetaData";

const categories = ["Laptop", "Cloth", "Tops", "Camera", "Kurti"];
const colors = ["Blue", "Green", "Black", "Purple", "Pink"];

const Products = ({ match }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([500, 60000]);
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");

    const [ratings,setRatings]= useState(0);

    const keyword = match.params.keyword;

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    const { products, error, productsCount } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, price, category, color,ratings));
    }, [dispatch, keyword, currentPage, price, category, color,ratings, alert, error]);

    const itemsPerPage = 8;

    // const currentProducts = products.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );

    return (
        <>
            <MetaData title="Products "/>
            <h2 className="productsHeading">Products</h2>
            <div className="products">
                {products &&
                    products.map((product) => (
                        // <ProductCard key={product.id} product={product} />
                        <ProductCard
                            key={product.id || product._id}
                            product={product}
                        />
                    ))}
            </div>

            <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={500}
                    max={60000}
                />
                <Typography>Categories</Typography>
                <ul className="categoryBox">
                    {categories.map((category) => (
                        <li
                            className="category-link"
                            key={category}
                            onClick={() => setCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
                <Typography>Colors</Typography>
                <ul className="colorBox">
                    {colors.map((color) => (
                        <li
                            className="colors-name"
                            key={color}
                            onClick={() => setColor(color)}
                        >
                            <div
                                className="color-box"
                                style={{ backgroundColor: color.toLowerCase() }}
                            ></div>
                            <span className="color-value">{color}</span>
                            {/* {color} */}
                        </li>
                    ))}
                </ul>

                <fieldset>
                    <Typography component="legend" className="rating-text">Rating Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e,newRating) =>{
                            setRatings(newRating);
                        }}
                        aria-labelledby="continious-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                    />
                </fieldset>
            </div>

            {productsCount > itemsPerPage && (
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={productsCount}
                    pageRangeDisplayed={2}
                    onChange={setCurrentPageNo}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            )}
        </>
    );
};

export default Products;
