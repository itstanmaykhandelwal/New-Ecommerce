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
import Profile from './component/User/Profile.js'
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import store from './store.js'
import { loadUser } from './actions/userAction.js';
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import ForgotPassword from './component/User/ForgotPassword.js'
import ResetPassword from './component/User/ResetPassword.js'

function App() {
    const {isAuthenticated,user} = useSelector((state)=>state.user)
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
            <Route path="/products/:keyword" component={Products}/>
            <ProtectedRoute exact path="/account" component={Profile}/>
            <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>
            <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
            <Route exact path="/password/forgot" component={ForgotPassword}/>
            <Route exact path="/password/reset/:token" component={ResetPassword}/>
            <Route path="/login" component={LoginSignUp}/>
            <Footer/>
        </Router>
    );
}

export default App;
