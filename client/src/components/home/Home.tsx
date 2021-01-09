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
import Error from './Error';

import Nav from './Nav'
import Orders from './Orders';
import Search from './Search';
import ViewArt from './ViewArt';

interface HomeProps { }
const Home: React.FC<HomeProps> = () => {
    return (
        <Router>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;900&display=swap" rel="stylesheet" />
            <Nav />
            <Switch>
                <Route path="/view/:showArt" component={ViewArt} />
                <Route exact path="/home" component={HomeComp} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/orders" component={Orders} />
                <Redirect to="/home" />
            </Switch>
        </Router>
    )
}

interface HomeCompProp { }
const HomeComp: React.FC<HomeCompProp> = () => {
    useEffect(() => {
        getArt().then((data) => {
            setArt(data)
        })
    }, [])
    const [art, setArt] = useState([])
    return (
        <div className="content-body">
            <div className="nav-space"></div>
            <div className="home-intro">
                <div>
                    <div className="home-intro-heading">
                        Hey There! Welcome to the art gallery
                    </div>
                    <div className="home-intro-body">
                        A collection of awesome artworks at the reach of your fingertips.
                    </div>
                </div>
                <div className="home-intro-instruction">
                    Choose an artwork that you love!
                </div>

            </div>
            <div className="art">
                {art.length ?
                    art.map((artVal: Art, index: number) => (
                        <Link to={{
                            pathname: "/view/" + artVal.name
                        }} key={index}>
                            <div className="art-post">
                                <img src={artVal.imageurl} alt={artVal.name} className="art-image" />
                                <div className="img-data-bg">
                                    <div className="img-data">
                                        {artVal.name}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )) : <Error errorMsg="No Content" />}
            </div>
        </div>
    )
}

export default Home
