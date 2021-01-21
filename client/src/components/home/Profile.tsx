import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { allOrders, allUsers, deleteArt, deleteOrder, deleteUser, getArt, getDeliveries, getOrderList, getpostedart, getUser, login, logout, register } from '../api'
// import {  useHistory } from 'react-router-dom'
import { Art, Orders, UserType } from '../ContextTypes'
import FadeInTop from './animation/FadeInAnim'
import ErrorBig from './Error'
import FadeInBottom from './animation/FadeInBottom'
import { Link } from 'react-router-dom'
import Delete from '../resource/delete.png'


const Cookies = require('js-cookie')

interface ProfileProps { }
const Profile: React.FC<ProfileProps> = () => {
    const [username, setUsername] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [loading, setLoading] = useState<string>("Log In")
    const [loginState, setLoginState] = useState<boolean>(true)
    const [regLoading, setRegLoading] = useState<string>("Register")
    const [userDet, setUserDet] = useState<UserType>();
    const [ordersList, setOrdersList] = useState([])
    const [deliveryList, setDeliveryList] = useState([])
    const [artList, setArtList] = useState([])
    // const history = useHistory()


    const [usernameText, setUsernameText] = useState<string>('')
    const [passwordText, setPasswordText] = useState<string>('')
    const [useremailText, setUseremailText] = useState<string>('')
    const [userType, setUserType] = useState<number>(2)
    const [usernameName, setUsernameName] = useState<string>('')

    const handleText = () => {
        var text = (document.getElementById('username-text') as HTMLInputElement).value
        setUsernameText(text);
    }
    const handlePassword = () => {
        var text = (document.getElementById('password-text') as HTMLInputElement).value
        setPasswordText(text);
    }

    const handleRegUsernameName = () => {
        var text = (document.getElementById('user-detail-name') as HTMLInputElement).value
        setUsernameName(text);
    }
    const handleRegUsername = () => {
        var text = (document.getElementById('user-detail-username') as HTMLInputElement).value
        setUsernameText(text);
    }
    const handleRegPassword = () => {
        var text = (document.getElementById('user-detail-password') as HTMLInputElement).value
        setPasswordText(text);
    }
    const handleRegEmail = () => {
        var text = (document.getElementById('user-detail-email') as HTMLInputElement).value
        setUseremailText(text);
    }

    const handleLogIn = () => {
        if (usernameText.length !== 0 && passwordText.length !== 0) {
            setErrorMessage("")
            // console.log("Ready");
            // console.log(usernameText + "..." + passwordText);
            setLoading("Loading...")
            login(usernameText, passwordText).then((res) => {
                // console.log(res);
                if (res?.status === 200) {
                    if (res.data.error === null || res.data.error === undefined) {
                        Cookies.set("username", res?.data.username, { expires: 7 })
                        // history.push("/home");
                        window.location.reload()
                        setLoading("Successful!")
                    } else if (res.data.error != null) {
                        setErrorMessage(res.data.error.toString())
                        setLoading("Login")
                    }
                } else if (res?.status === 404) {
                    setErrorMessage("Server faced some error!")
                    setLoading("Login")
                }
            })
        } else setErrorMessage("Fill all details!")
    }

    const handleRegister = () => {
        if (usernameText.length !== 0 && passwordText.length !== 0 && useremailText.length !== 0 && usernameName.length !== 0) {
            // console.log("Registering user");
            setRegLoading("Registering...")
            register(usernameText, usernameName, useremailText, passwordText, userType).then((res) => {
                if (res?.status === 200) {
                    if (res.data.error === null || res.data.error === undefined) {
                        Cookies.set("username", res?.data.username, { expires: 7 })
                        window.location.reload()
                        setRegLoading("Registered!")
                    } else if (res.data.error != null) {
                        setErrorMessage(res.data.error.toString())
                        setRegLoading("Register")
                    }
                } else if (res?.status === 404) {
                    setErrorMessage("Server faced some error!")
                    setRegLoading("Register!")
                }
            })
        } else setErrorMessage("Fill all details!")
    }

    const handleLogout = () => {
        // console.log("Trying logout");
        logout().then((res) => {
            if (res?.status === 200) {
                Cookies.remove("username");
                window.location.replace('/home')
                // console.log("logged out");
            } else {
                setErrorMessage("Unable to logout :(")
            }
        })

    }
    useEffect(() => {
        const username = Cookies.get('username');
        setUsername(username === undefined ? "null" : username)
        getUser(username !== undefined ? username : "").then((res) => {
            if (res?.data.usertype === 1) {
                getpostedart(username).then((res) => {
                    // console.log(res);
                    setArtList(res);
                })
            }
            setUserDet(res?.data);
            getOrderList(res?.data.username).then((data) => {
                setOrdersList(data)
            })
            getDeliveries(username).then((data) => {
                if (data.length !== 0)
                    setDeliveryList(data.reverse());
            })
        })
        // console.log(username);
    }, [])
    return (
        <div className="content-body">
            {
                userDet?.usertype !== 0 ?
                    <div className="profile-card-holder">
                        {username !== "null"
                            ? <UserDetail username={username} userDet={userDet} handleLogout={() => handleLogout()} />
                            : loginState
                                ? <motion.div
                                    initial={{ y: '-1vh', opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ ease: "easeOut", duration: .4 }}
                                    className="profile-login">
                                    <div className="login-form">
                                        <span className="login">Please Login</span>
                                        <hr />
                                        <span>Username</span>
                                        <input type="text" name="" id="username-text"
                                            autoComplete="false" onChange={() => handleText()} />
                                        <span>Password</span>
                                        <input type="password" name="" id="password-text" onChange={() => handlePassword()} />
                                        <button onClick={() => handleLogIn()}>{loading}</button>
                                    </div>
                                    <div className="register">
                                        New to Art Gallery? <span onClick={() => {
                                            setLoginState(!loginState)
                                            setErrorMessage("")
                                        }}>Create Account</span>
                                    </div>
                                </motion.div>
                                : <FadeInBottom children={
                                    <div className="register-user">
                                        <div className="register hide-mobile">
                                            <h3>Why Register?</h3>
                                            <ul>
                                                <li>Get unlimited free deliveries.</li>
                                                <li>Place orders on you favourite Arts.</li>
                                                <li>Login anywhere.</li>
                                            </ul>
                                        </div>
                                        <div className="place"></div>
                                        <div className="profile-register">
                                            <span className="register-head">Register</span>
                                            <span className="register-message">Please fill in the following details about yourself.</span>
                                            <hr />
                                            <span>I am here to</span>
                                            <div className="user-type">
                                                <button className={userType === 2 ? "selected" : ""} onClick={() => setUserType(2)}>Buy Art</button>
                                                <button className={userType === 1 ? "selected" : ""} onClick={() => setUserType(1)}>Sell Art</button>
                                            </div>
                                            <span className="user-detail">Name</span>
                                            <input type="text" name="user-name" id="user-detail-name" onChange={() => handleRegUsernameName()} />
                                            <span className="user-detail">Username</span>
                                            <input type="text" name="user-username" id="user-detail-username" onChange={() => handleRegUsername()} />
                                            <span className="user-detail">Email</span>
                                            <input type="email" name="user-email" id="user-detail-email" onChange={() => handleRegEmail()} />
                                            <span className="user-detail">Password</span>
                                            <input type="password" name="user-password" id="user-detail-password" onChange={() => handleRegPassword()} />
                                            <button type="submit" className="register-button" onClick={() => handleRegister()}>{regLoading}</button>
                                        </div>
                                        <div className="place"></div>
                                        <div className="register">
                                            Already have an account? <span onClick={() => {
                                                setLoginState(!loginState)
                                                setErrorMessage("")
                                            }}>Login</span>
                                        </div>
                                    </div>
                                } classname="" />
                        }
                        {userDet?.usertype === 1 ? <ArtList artList={artList} username={username} /> : <div />}
                        {username !== "null" ? <OrdersList ordersList={ordersList} username={username} /> : <div />}
                        {userDet?.usertype === 1 ? <DeliveryList deliveryList={deliveryList} /> : <div />}
                    </div> : <AdminPage username={username} handleLogout={() => handleLogout()} />
            }
            {errorMessage.length !== 0 ? <div className="error-message">{errorMessage}</div> : <span></span>}
        </div>
    )
}

interface AdminProps {
    username: string,
    handleLogout: () => void
}
const AdminPage: React.FC<AdminProps> = ({ username, handleLogout }) => {
    const [users, setUsers] = useState<UserType[]>([])
    const [art, setArt] = useState<Art[]>([]);
    const [ordersList, setOrdersList] = useState<Orders[]>([])
    const [logoutButton, setLogoutButton] = useState<string>('Logout')

    const deleteHandleUser = (username: string) => {
        deleteUser(username).then((data) => {
            if (data.username === username)
                window.location.reload()
        })
    }
    const deleteHandleArt = (username: string, artname: string) => {
        deleteArt(username, artname).then((data) => {
            if (data.username === username)
                window.location.reload()
        })
    }
    const deleteHandleOrder = (username: string, artname: string) => {
        deleteOrder(username, artname).then((data) => {
            if (data.username === username)
                window.location.reload()
        })
    }
    useEffect(() => {
        allUsers().then((data) => {
            setUsers(data)
        })
        getArt().then((data) => {
            setArt(data)
        })
        allOrders().then((data) => {
            setOrdersList(data)
        })
    }, [])
    return (
        <div className="admin-page">
            <h1>Admin</h1>
            <h2>{username}</h2>
            <button onClick={() => { setLogoutButton('Logging Out...'); handleLogout(); setLogoutButton('Logged Out!'); }} className="logout">{logoutButton}</button>
            <h3>Users</h3>
            <div className="users">
                {users.map((user, index) => (
                    user.usertype !== 0 ?
                        <div className="user-box" key={index}>
                            <div className="user">
                                <h4>{user.username}</h4>
                                <p className="type">{user.usertype === 1 ? "Artist" : "Customer"}</p>
                                <p>{user.firstname}</p>
                                <p>{user.email}</p>
                                <img src={Delete} alt="delete" className="delete" onClick={() => deleteHandleUser(user.username)} />
                            </div>
                        </div>
                        : <span />
                ))}
            </div>
            <h3>Art</h3>
            <div className="artP">
                {art.map((art, index) => (
                    <div className="art-box" key={index}>
                        <div className="arte">
                            <h4>{art.name}</h4>
                            <p>${art.price}</p>
                            <img src={Delete} alt="delete" className="delete" onClick={() => deleteHandleArt(art.artist, art.name)} />
                        </div>
                    </div>
                ))}
            </div>
            <h3>Orders</h3>
            <div className="ordersP">
                {ordersList.map((order, index) => (
                    <div className="order-box" key={index}>
                        <div className="orderP">
                            <h4>{order.artname}</h4>
                            <p>At: {order.address}</p>
                            <p>To: {order.username}</p>
                            <p>Booked: {order.booked}</p>
                            <p>Before: {order.due}</p>
                            <img src={Delete} alt="delete" className="delete" onClick={() => deleteHandleOrder(order.username, order.artname)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

interface UserDetailProps {
    username: string,
    userDet: UserType | undefined,
    handleLogout: () => void
}
const UserDetail: React.FC<UserDetailProps> = ({ username, userDet, handleLogout }) => {
    const [logoutButton, setLogoutButton] = useState<string>('Logout')
    return (
        <FadeInTop classname="profile" children={
            <div>
                <h2>Profile</h2>
                <div className="profile-card">
                    <div className="user-heading">
                        <h1>{username}</h1>
                        <h2>{userDet?.usertype === 1 ? "Artist" : "Customer"}</h2>
                    </div>
                    <div className="user-detail">
                        <h3>{userDet?.firstname}</h3>
                        <h3>{userDet?.email}</h3>
                        <a href="mailto:nithins674@gmail.com" className="c-admin">Contact admin</a>
                    </div>
                    <div className="user-buttons">
                        {userDet?.usertype === 1 ? <Link to="/create">Create Art</Link> : <span></span>}
                        <div className="space"></div>
                        <button onClick={() => { setLogoutButton('Logging Out...'); handleLogout(); setLogoutButton('Logged Out!'); }} className="logout">{logoutButton}</button>
                    </div>
                </div>
            </div>
        } />
    )
}

interface ArtListProps {
    artList: Art[],
    username: string
}
const ArtList: React.FC<ArtListProps> = ({ artList, username }) => {

    const handleDeleteArt = (artname: string) => {
        deleteArt(username, artname).then((res) => {
            if (res.username == username)
                window.location.reload()
        })
    }
    return (
        <div className="orders-list">
            <h2>Your Uploads</h2>
            <div className="list">
                {artList !== undefined && artList !== null && artList.length !== 0 ?
                    artList?.map((art, index) => (
                        <motion.div key={index}
                            className="list-item"
                            initial={{ scaleY: .1 }}
                            animate={{ scaleY: 1 }}
                            transition={{ ease: "easeOut", duration: .2 }}
                        >
                            <Link to={{
                                pathname: "/view/" + art.name
                            }}>View</Link>
                            <h3>{art.name}</h3>
                            <span>{art.about}</span>
                            <span className="price">${art.price}</span>
                            <img src={Delete} alt="delete" className="delete" onClick={() => handleDeleteArt(art.name)} />
                        </motion.div>
                    ))
                    : <ErrorBig errorMsg="No Uploads Yet" />}
            </div>
        </div>
    )
}

interface OrderProp {
    ordersList: Orders[],
    username: string
}
const OrdersList: React.FC<OrderProp> = ({ ordersList, username }) => {

    const handleDeleteOrder = (artname: string) => {
        deleteOrder(username, artname).then((res) => {
            if (res.username == username)
                window.location.reload()
        })
    }

    return (
        <div
            className="orders-list"
        >
            <h2>Your Orders</h2>
            <div className="list">
                {ordersList !== undefined && ordersList !== null && ordersList.length !== 0 ?
                    ordersList?.map((order, index) => (
                        <motion.div key={index}
                            className="list-item"
                            initial={{ scaleY: .1 }}
                            animate={{ scaleY: 1 }}
                            transition={{ ease: "easeOut", duration: .2 }}
                        >
                            <h3>{order.artname}</h3>
                            <span>Delivery at: {order.address}</span>
                            <span>Due: {order.due}</span>
                            <span>Booked: {order.booked}</span>
                            <img src={Delete} alt="delete" className="delete" onClick={() => handleDeleteOrder(order.artname)} />
                        </motion.div>
                    ))
                    : <ErrorBig errorMsg="No Orders Yet" />}
            </div>
        </div>
    )
}

interface DeliveryProp {
    deliveryList: Orders[],
}
const DeliveryList: React.FC<DeliveryProp> = ({ deliveryList }) => {
    return (
        <div
            className="orders-list"
        >
            <h2>Your Deliveries</h2>
            <div className="list">
                {deliveryList !== undefined && deliveryList !== null && deliveryList.length !== 0 ?
                    deliveryList?.map((order, index) => (
                        <motion.div key={index}
                            className="list-item"
                            initial={{ scaleY: .1 }}
                            animate={{ scaleY: 1 }}
                            transition={{ ease: "easeOut", duration: .2 }}
                        >
                            <h3>{order.artname}</h3>
                            <span>Delivery to: {order.username}</span>
                            <span>Delivery at: {order.address}</span>
                            <span>Due: {order.due}</span>
                            <span>Booked: {order.booked}</span>
                        </motion.div>
                    ))
                    : <ErrorBig errorMsg="No Bookings Yet" />}
            </div>
        </div>
    )
}

export default Profile