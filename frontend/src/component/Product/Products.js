import React, { useEffect, useState } from 'react';
import "./Products.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/ProductAction';
import ProductCard from '../Home/Product/ProductCard';
import Pagination from 'react-js-pagination'

const Products = ({match}) => {
    const dispatch = useDispatch();

    const [currentPage,setCurrentPage] = useState(1);

    const keyword = match.params.keyword

    const setCurrentPageNo = (e) =>{
        setCurrentPage()
    }
    const {products,error,productsCount,resultPerPage} = useSelector((state) => state.products)
    useEffect(() => {
        dispatch(getProduct(keyword,currentPage));
    }, [dispatch,keyword,currentPage,resultPerPage])
    

    return (
        <>
            <h2 className='productsHeading'>Products</h2>
            <div className="products">
                {products && 
                    products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                }
            </div>
            {resultPerPage < productsCount && (
                <div className="paginationBox">
                <Pagination 
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass='page-item'
                    linkClass='page-link'
                    activeClass='pageItemActive'
                    activeLinkClass='pageLinkActive'
                />
            </div>
            )}
        </>
    )
}

export default Products