import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import './swiper.css';
import HeroImg from '../../../images/hero-1.jpg';
import HeroImg2 from '../../../images/hero-2.jpg';
import { MdArrowRightAlt } from "react-icons/md";
import {Link} from 'react-router-dom';

import { EffectFade,Navigation } from 'swiper/modules';

const Swipers = () => {
    return (
        <>
            <div className="banner-swiper">
                <Swiper 
                    navigation={true} 
                    modules={[EffectFade,Navigation]} 
                    className="mySwiper"
                    loop
                    effect={'fade'}
                >
                    <SwiperSlide style={{ backgroundImage: `url(${HeroImg})` }}>
                        <div className="container">
                            <div className="row">
                                <div className='col-xl-5 col-lg-7 col-md-8'>
                                    <div class="hero__text">
                                        <h6>Summer Collection</h6>
                                        <h2>Fall - Winter Collections 2024</h2>
                                        <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering
                                            commitment to exceptional quality.</p>
                                        <Link to="/products" class="primary-btn">Shop now <MdArrowRightAlt className='arrow-font'/></Link>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide style={{ backgroundImage: `url(${HeroImg2})` }}>
                        <div className="container">
                            <div className="row">
                                <div className='col-xl-5 col-lg-7 col-md-8'>
                                    <div class="hero__text">
                                        <h6>Summer Collection</h6>
                                        <h2>Fall - Winter Collections 2024</h2>
                                        <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering
                                            commitment to exceptional quality.</p>
                                        <Link to="/products" class="primary-btn">Shop now <MdArrowRightAlt className='arrow-font'/></Link>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

export default Swipers