import React, { useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductAction";
import ProductCard from "../Home/Product/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from 'react-alert';
import MetaData from "../layout/MetaData";
import { Accordion } from "react-bootstrap";
import { MdSearch } from "react-icons/md";

const categories = ["Laptop", "Cloth", "Tops", "Camera", "Kurti"];
const colors = ["Blue", "Green", "Black", "Purple", "Pink"];

const Products = ({ match,history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([500, 60000]);
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [keywords, setKeywords] = useState("");

    const [ratings, setRatings] = useState(0);

    const keyword = match.params.keyword;

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keywords.trim()) {
          history.push(`/products/${keywords}`);
        } else {
          history.push("/products");
        }
      };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    const { products, error, productsCount } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, price, category, color, ratings));
    }, [dispatch, keyword, currentPage, price, category, color, ratings, alert, error]);

    const itemsPerPage = 8;

    

    // const currentProducts = products.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );

    return (
        <>
            <MetaData title="Products " />
            <h2 className="productsHeading">Products</h2>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="filterBox">
                            <div>
                                <form className="searchBox" onSubmit={searchSubmitHandler}>
                                    <input
                                        type="text"
                                        placeholder="Search a Product ..."
                                        onChange={(e) => setKeywords(e.target.value)}
                                    />
                                    <button type="submit" value="Search">
                                    <MdSearch />
                                    </button>
                                    {/* <input type="submit" value="Search" /> */}
                                </form>
                            </div>
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={500}
                                max={60000}
                            />
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <Typography>Categories</Typography>
                                    </Accordion.Header>
                                    <Accordion.Body>
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
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <Accordion defaultActiveKey="1" flush>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <Typography>Colors</Typography>
                                    </Accordion.Header>
                                    <Accordion.Body>
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
                                                    {/* <span className="color-value">{color}</span> */}
                                                    {/* {color} */}
                                                </li>
                                            ))}
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <fieldset>
                                <Typography component="legend" className="rating-text">Rating Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continious-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="product-flex-lyt">
                            <div className="row">
                                {products &&
                                    products.map((product) => (
                                        // <ProductCard key={product.id} product={product} />
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <ProductCard
                                                key={product.id || product._id}
                                                product={product}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
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
