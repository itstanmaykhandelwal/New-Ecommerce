import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { MdDashboardCustomize } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdList } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <MdPerson />, name: "Profile", func: account },
        { icon: <MdList />, name: "Orders", func: orders },
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
        history.push("/dashboard");
    }
    function orders() {
        history.push("/orders");
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
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : "/profile.jpg"}
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
                    />
                ))}
            </SpeedDial>
        </>
    );
};

export default UserOptions;
