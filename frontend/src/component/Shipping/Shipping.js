import React, { useState } from 'react';
import "./Shipping.css";
import { useDispatch, useSelector } from 'react-redux';
import { MdLocationCity } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MdPhoneIphone } from "react-icons/md";
import { State } from 'country-state-city';
import { useAlert } from 'react-alert';
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import MetaData from '../layout/MetaData';
import CheckOutSteps from '../Cart/CheckOutSteps.js'
import {saveShippingInfo} from '../../actions/cartAction.js'

const Shipping = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [city, setCity] = useState(shippingInfo.city)
    const [address, setAddress] = useState(shippingInfo.address);
    const [state, setState] = useState(shippingInfo.state);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const indianStates = State.getStatesOfCountry('IN');

    const shippingSubmit = (e) => {
        e.preventDefault();

        if(phoneNo.length < 10 || phoneNo.length > 10){
            alert.error("Phone Number should be 10 Digits Long");
            return;
        }
        dispatch(
            saveShippingInfo({address,city,state,pinCode,phoneNo})
        );
        history.push("/order/confirm")
    }

    return (
        <>
            <MetaData title="Shipping Details"/>

            <CheckOutSteps activeStep={0}/>
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>

                    <form
                        className='shippingForm'
                        encType='multipart/form-data'
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <MdHomeFilled />
                            <input
                                type="text"
                                placeholder='Address'
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <MdLocationCity />
                            <input
                                type="text"
                                placeholder='City'
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <MdLocationOn />
                            <input
                                type="number"
                                placeholder='Pin Code'
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <MdPhoneIphone />
                            <input
                                type="number"
                                placeholder='Phone Number'
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>
                        <div>
                            <BsGlobeCentralSouthAsia />
                            <select
                                required
                                value={state}
                                // onChange={(e) => setState(e.target.value)}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="">State</option>
                                {indianStates.map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value="Continue"
                            className='shippingBtn'
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping