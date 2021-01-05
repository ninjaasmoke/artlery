import React from 'react'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    // useHistory,
    // Link,
    Redirect,
} from 'react-router-dom';

import Nav from './Nav'
import Orders from './Orders';
import Search from './Search';

interface HomeProps { }
const Home: React.FC<HomeProps> = () => {
    return (
        <Router>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Redressed&display=swap" rel="stylesheet" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;900&display=swap" rel="stylesheet" />
            <Nav />
            <div className="nav-space"></div>
            <Switch>
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
    return (
        <div className="content-body">
            <h2>Home</h2>
        </div>
    )
}

export default Home
