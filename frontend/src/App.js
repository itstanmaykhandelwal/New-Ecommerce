import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js'
import {Route, BrowserRouter as Router} from 'react-router-dom'; 
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetail.js';


function App() {
    useEffect(() => {
        WebFont.load({
            google:{
                families:["Roboto","Droid Sans","Chilanka"]
            }
        })
    }, [])
    
    return (
        <Router>
            <Header/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/product/:id" component={ProductDetails}/>
            <Footer/>
        </Router>
    );
}

export default App;
