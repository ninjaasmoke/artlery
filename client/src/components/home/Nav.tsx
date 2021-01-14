import React, { useEffect, useState } from 'react'
import User from "../resource/user.png";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";

interface NavProp { }
const Nav: React.FC<NavProp> = () => {
    const [toggle, setToggle] = useState<string>('toggle')
    const [navIsOpen, setNavIsOpen] = useState<boolean>(false)
    const [navH, setNavH] = useState<string>('100vh')
    // const [navcolor, setNavcolor] = useState<string>('transparent')

    useEffect(() => {
        // window.addEventListener('scroll', () => {
        //     if (window.scrollY >= 100) {
        //         setNavcolor('#f9f9f9')
        //     } else {
        //         setNavcolor('transparent')
        //     }
        // })
    }, [])

    const toggleNav = () => {
        if (!navIsOpen) {
            setToggle('toggle change')
            setNavH('0')
        } else {
            setToggle('toggle')
            setNavH('100vh')
        }
        setNavIsOpen(!navIsOpen)
    }
    return (
        <div>
            <nav>
                <div className="placeholder-to-center"></div>
                <Header imgUri={"Logo"} />
                <div className="links">
                    <NavLink to="/home" label="Home" toggle={() => { }} />
                    <NavLink to="/search" label="Search" toggle={() => { }} />
                    {/* <NavLink to="/orders" label="Orders" toggle={() => { }} /> */}
                    <Link to="/profile" >
                        <img src={User} alt="" />
                    </Link>
                </div>
                <div className={toggle} onClick={() => toggleNav()}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </nav>
            <motion.div
                className="nav-menu"
                initial={{ y: navH }}
                animate={{ y: navH }}
                transition={{ ease: 'anticipate', duration: .4 }}>
                <NavLink to="/home" label="Home" toggle={() => toggleNav()} />
                <NavLink to="/search" label="Search" toggle={() => toggleNav()} />
                {/* <NavLink to="/orders" label="Orders" toggle={() => toggleNav()} /> */}
                <NavLink to="/profile" label="Profile" toggle={() => toggleNav()} />
            </motion.div>
        </div>
    )
}

interface HeaderProp {
    imgUri: string;
}
const Header: React.FC<HeaderProp> = ({ imgUri }) => {
    return (
        <div className="header-img">
            {/* <img src={imgUri} alt="Header Image" /> */}
            <div><span className="black-header">Art</span> Gallery</div>
        </div>
    )
}

interface NavLinkProps {
    to: string;
    label: string;
    toggle: Function;
}
const NavLink: React.FC<NavLinkProps> = ({ to, label, toggle }) => {
    const history = useHistory();

    const [currentpath, setCurrentpath] = useState<string>();

    useEffect(() => {
        setCurrentpath(history.location.pathname)
        history.listen(({ pathname }) => {
            setCurrentpath(pathname)
        })
    }, [])

    return (
        <div className={currentpath === to ? 'nav-link selected-nav-link' : 'nav-link'} onClick={() => toggle()}>
            <Link to={to}>
                <span>{label}</span>
            </Link>
        </div>
    )
}

export default Nav
