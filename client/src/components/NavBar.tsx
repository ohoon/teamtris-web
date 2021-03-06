import React, { memo } from 'react';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, NavLink } from 'react-bootstrap';
import { Me } from '../api/users';

const NavigationBar = styled(Navbar)`
    padding: 0 30px 0 60px;
`;

const Logo = styled(Navbar.Brand)`
    cursor: pointer;
`;

interface NavBarProps {
    me: Me | null;
    redirect: (where: string) => void;
    logout: () => void;
}

function NavBar({ me, redirect, logout }: NavBarProps) {
    const goToHome = () => {
        redirect('/');
    };

    const goToLogin = () => {
        redirect('/login');
    };

    return (
        <NavigationBar
            bg="dark"
            variant="dark"
            fixed="top"
        >
            <Logo
                onClick={goToHome}
            >
                TeamTris
            </Logo>
            <Nav
                className="ml-auto"
            >
                {me ?
                    <NavDropdown
                        id="collasible-nav-dropdown"
                        title={me.nickname}

                    >
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            onClick={logout}
                        >
                            로그아웃
                        </NavDropdown.Item>
                    </NavDropdown> :
                    <NavLink
                        onClick={goToLogin}
                    >
                        로그인
                    </NavLink>
                }
            </Nav>
        </NavigationBar>
    );
}

export default memo(NavBar);