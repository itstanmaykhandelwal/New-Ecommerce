import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@material-ui/lab';
import { IoMdExpand } from "react-icons/io";
import { MdDashboard, MdImportExport, MdOutlinePostAdd, MdRateReview } from "react-icons/md";
import { IoAdd, IoPeopleCircleOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            {/* <Link to="/">
                    Ecomerce
                </Link> */}
            <Link to="/admin/dashboard">
                <p>
                    <MdDashboard /> Dashboard
                </p>
            </Link>
            <TreeView
                    defaultCollapseIcon={<IoMdExpand />}
                    defaultExpandIcon={<MdImportExport />}
                >
                    <TreeItem nodeId='1' label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId='2' label="All" icon={<MdOutlinePostAdd />} />
                        </Link>
                        <Link to="/admin/product">
                            <TreeItem nodeId='3' label="Create" icon={<IoAdd />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            <Link to="/admin/orders">
                <p>
                    <CiViewList /> Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <IoPeopleCircleOutline /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <MdRateReview /> Reviews
                </p>
            </Link>
        </div>
    )
}

export default Sidebar