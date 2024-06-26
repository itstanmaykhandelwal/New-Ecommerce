import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { MdDelete, MdEdit } from "react-icons/md";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = ({ history }) => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { error, users } = useSelector((state) => state.allUser);

    const {
        error: deleteError,
        isDeleted,
        message,
    } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success(message);
            history.push("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link
                            to={`/admin/user/${params.getValue(
                                params.id,
                                "id"
                            )}`}
                        >
                            <MdEdit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(
                                    params.getValue(params.id, "id")
                                )
                            }
                        >
                            <MdDelete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    if (users) {
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });
    }
    console.log(users,"Fiels");

    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="container">
            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
             </div>
        </Fragment>
    );
};

export default UsersList;
