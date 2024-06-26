import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetail.js";
import Products from "./component/Product/Products.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Shipping/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from './component/Cart/OrderSuccess.js'
import MyOrders from './component/Order/MyOrder.js';
import OrderDetails from './component/Order/OrderDetails.js';
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from './component/admin/Dashboard.js'
import ProductList from './component/admin/ProductList.js'
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UserList from "./component/admin/UserList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReview from "./component/admin/ProductReview.js";
import NotFound from "./component/layout/NotFound/NotFound.js";

function App() {
    const [stripeApiKey, setStripeApiKey] = useState("");
    const { isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated) {
            getStripeApiKey();
        }
    }, [isAuthenticated]);

    async function getStripeApiKey() {
        try {
            const { data } = await axios.get("/api/v1/stripeapikey");
            setStripeApiKey(data.stripeApiKey);
        } catch (error) {
            // Handle error
            console.error('Error fetching Stripe API key:', error);
        }
    }
    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });
        store.dispatch(loadUser());
        getStripeApiKey();
    }, []);

    return (
        <Router>
            <Header />
            {isAuthenticated && <UserOptions user={user} />}
            {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute
                        exact
                        path="/process/payment"
                        component={Payment}
                    />
                </Elements>
            )}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:id" component={ProductDetails} />
                <Route exact path="/products" component={Products} />
                <Route path="/products/:keyword" component={Products} />
                <Route path="/products/:keyword" component={Products} />
                <ProtectedRoute exact path="/account" component={Profile} />
                <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
                <ProtectedRoute
                    exact
                    path="/password/update"
                    component={UpdatePassword}
                />
                <Route exact path="/password/forgot" component={ForgotPassword} />
                <Route
                    exact
                    path="/password/reset/:token"
                    component={ResetPassword}
                />
                <Route path="/login" component={LoginSignUp} />
                {/* <Route path="/cart" component={Cart} /> */}
                <ProtectedRoute exact path="/cart" component={Cart} />
                <ProtectedRoute exact path="/shipping" component={Shipping} />



                <ProtectedRoute
                    exact
                    path="/success"
                    component={OrderSuccess}
                />
                <ProtectedRoute
                    exact
                    path="/orders"
                    component={MyOrders}
                />
                <ProtectedRoute
                    exact
                    path="/order/confirm"
                    component={ConfirmOrder}
                />
                <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
                <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
                <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
                <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
                <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />
                <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
                <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />
                <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UserList} />
                <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
                <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReview} />
                <Route 
                    component={
                        window.location.pathname=== "/process/payment" ? null : NotFound
                    }
                />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
