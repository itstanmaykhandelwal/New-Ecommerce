import { Button } from 'bootstrap'
import React from 'react'
// import {Link} from 'react-router-dom';
import './Home.css'

const Home = () => {
    return (
        <section className='lyt-section'>
            <div className='container'>
                <div className='grid grid-two-column'>
                    <div className='hero-section-data'>
                        <p className='intro-data'>Welcome to</p>
                        <h2>Store</h2>
                        <p>A woman’s wardrobe is her opportunity to stand out and make a lasting first impression. Launched in 2015, Impressions Online Boutique offers a wide range of apparel to fit any woman’s unique sense of style. Our clothing and accessories are carefully curated to provide our customers the latest fashions.</p>
                       {/* <Link to="/home"><Button>
                                Shop Now
                            </Button></Link> */}
                    </div>
                    {/* Image Home Page */}
                    <div className='hero-section-image'>
                        <figure>
                            {/* <img src="images/hero-banner.jpg" alt="hero_img" className="img-style" /> */}
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home