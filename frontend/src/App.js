import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js'
import {Route, BrowserRouter as Router} from 'react-router-dom'; 
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetail.js';
import Products from './component/Product/Products.js';
import LoginSignUp from './component/User/LoginSignUp.js';
import store from './store.js'
import { loadUser } from './actions/userAction.js';
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';

function App() {
    const {isAuthenticated,user} = useSelector(state=>state.user)
    useEffect(() => {
        WebFont.load({
            google:{
                families:["Roboto","Droid Sans","Chilanka"]
            }
        })
        store.dispatch(loadUser());
    }, [])
    
    return (
        <Router>
            <Header/>
            {isAuthenticated && <UserOptions user={user}/>}
            <Route exact path="/" component={Home}/>
            <Route exact path="/product/:id" component={ProductDetails}/>
            <Route exact path="/products" component={Products}/>
            <Route path="/products/:keyword" component={Products}/>
            <Route path="/login" component={LoginSignUp}/>
            <Footer/>
        </Router>
    );
}

export default App;
