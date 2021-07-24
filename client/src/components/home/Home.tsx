import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import { getArt } from '../api';
import { Art } from '../ContextTypes';
import BuyArt from './BuyArt';
import CreateArt from './CreateArt';
import Loading from './Loading';

import Nav from './Nav'
import Orders from './Orders';
import Profile from './Profile';
import Search from './Search';
import ViewArt from './ViewArt';

const Cookies = require('js-cookie')

interface HomeProps { }
const Home: React.FC<HomeProps> = () => {
    const [username, setUsername] = useState<string>('');
    const [sort, setSort] = useState<string>('def')
    const [art, setArt] = useState<Art[]>([]);

    const handleSort = () => {
        // console.log("Handling sort");
        if (sort === "def" || sort === "Popular") {
            art.sort((a, b) => b.price - a.price)
            setSort('Price')
        } else if (sort === 'Price') {
            art.sort((a, b) => {
                if (b.name < a.name) return 1;
                else if (a.name < b.name) return -1;
                else return 0;
            })
            setSort('Name A-Z')
        } else if (sort === 'Name A-Z') {
            art.sort((a, b) => {
                if (b.name < a.name) return -1;
                else if (a.name < b.name) return 1;
                else return 0;
            })
            setSort('Name Z-A')
        } else {
            art.reverse()
            setSort('Popular')
        }

    }
    useEffect(() => {
        const username = Cookies.get('username');
        setUsername(username === undefined ? "null" : username)
        getArt().then((data) => {
            setArt(data.reverse())
        })
    }, [])
    return (
        <Router>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&display=swap" rel="stylesheet"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet" />
            <Nav />
            <div className="nav-space"></div>
            <Switch>
                <Route path="/view/:showArt" component={ViewArt} />
                <Route path="/buyart/:art" component={BuyArt} />
                <Route exact path="/home">
                    <HomeComp art={art} username={username} sort={sort} handleSort={() => handleSort()} />
                </Route>
                <Route exact path="/search" component={Search} />
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/create" component={CreateArt} />
                <Redirect to="/home" />
            </Switch>
        </Router>
    )
}

interface HomeCompProp {
    art: Art[];
    username: string;
    sort: string;
    handleSort: Function;
}
const HomeComp: React.FC<HomeCompProp> = ({ art, username, sort, handleSort }) => {

    return (
        <div className="content-body">
            {/* <div className="nav-space"></div> */}
            <motion.div className="home-intro"
                initial={{ y: '-1vh', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeOut", duration: .5 }}>
                <div>
                    <div className="home-intro-heading">
                        Hey {username.length !== 0 && username !== "null" ? username : "There"}! Welcome to the art gallery
                    </div>
                    <div className="home-intro-body">
                        A collection of awesome artworks at the reach of your fingertips.
                    </div>
                </div>
                <div className="home-intro-instruction">
                    Choose an artwork that you love!
                </div>
            </motion.div>
            <div className="art">
                <span onClick={() => handleSort()}>Sorted By: {sort === 'def' ? "Latest" : sort}</span>
                {art.length ?
                    art.map((artVal: Art, index: number) => (
                        <Link to={{
                            pathname: "/view/" + artVal.name
                        }} key={index}>
                            <div className="art-post">
                                <img src={artVal.imageurl} alt={artVal.name} className="art-image" />
                                <div className="img-data-bg">
                                    <div className="img-data">
                                        <p className="img-name">{artVal.name}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )) : <Loading />}
            </div>
        </div>
    )
}

export default Home
