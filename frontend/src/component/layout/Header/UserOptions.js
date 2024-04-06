import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { MdDashboardCustomize } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdList } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch,useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { Backdrop } from "@material-ui/core";

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state.cart);

    const options = [
        { icon: <MdPerson />, name: "Profile", func: account },
        { icon: <MdList />, name: "Orders", func: orders },
        { icon: <MdShoppingCart style={{color:cartItems.length > 0? "tomato":"unset"}} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <MdExitToApp />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <MdDashboardCustomize />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        history.push("/admin/dashboard");
    }
    function orders() {
        history.push("/orders");
    }
    function cart() {
        history.push("/cart");
    }
    function account() {
        history.push("/account");
    }
    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    return (
        <>
            <Backdrop open={open} style={{zIndex:10}}/>
            <SpeedDial
                className="speedDial"
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{zIndex:"11"}}
                open={open}
                direction="down"
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : <FiUser />}
                        alt="Profile"
                    />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth<=600?true:false}
                    />
                ))}
            </SpeedDial>
        </>
    );
};

export default UserOptions;
