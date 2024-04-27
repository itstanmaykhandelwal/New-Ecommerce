import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUser } from "react-icons/fa";
import Image from 'react-bootstrap/Image';
import Logo from '../../../images/Ethenic Wears.png';
import { useSelector } from "react-redux";

const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand className="logo-img" as={Link} to="/">
                    <Image src={Logo} fluid />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end flex-grow-1" id="basic-navbar-nav">
                    <Nav className="">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {isAuthenticated ? (
                            <Nav.Link as={Link} to="/account">
                                <FaUser className="user-icon" />
                            </Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
