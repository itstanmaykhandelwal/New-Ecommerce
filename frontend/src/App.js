import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js'
import {Route, BrowserRouter as Router} from 'react-router-dom'; 
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js'


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
            <Route extact path="/" component={Home}/>
            <Footer/>
        </Router>
    );
}

export default App;
