import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { motion } from 'framer-motion'
import { getUser, login, logout, register } from '../api'
import { useHistory } from 'react-router-dom'
import { UserType } from '../ContextTypes'

interface ProfileProps { }
const Profile: React.FC<ProfileProps> = () => {
    const [username, setUsername] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [loading, setLoading] = useState<string>("Log In")
    const [loginState, setLoginState] = useState<boolean>(true)
    const [regLoading, setRegLoading] = useState<string>("Register")
    const history = useHistory()


    const [usernameText, setUsernameText] = useState<string>('')
    const [passwordText, setPasswordText] = useState<string>('')
    const [useremailText, setUseremailText] = useState<string>('')
    const [userType, setUserType] = useState<number>(1)
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
            console.log("Ready");
            console.log(usernameText + "..." + passwordText);
            setLoading("Loading...")
            login(usernameText, passwordText).then((res) => {
                console.log(res);
                if (res?.status === 200) {
                    if (res.data.error === null || res.data.error === undefined) {
                        Cookie.set("username", res?.data.username)
                        history.push("/home");
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
            console.log("Registering user");
            setRegLoading("Registering...")
            register(usernameText, usernameName, useremailText, passwordText, userType).then((res) => {
                if (res?.status === 200) {
                    if (res.data.error === null || res.data.error === undefined) {
                        Cookie.set("username", res?.data.username)
                        history.push("/profile");
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
        console.log("Trying logout");
        logout().then((res) => {
            if (res?.status === 200) {
                Cookie.remove("username")
                history.push("/home");
                console.log("logged out");
            } else {
                setErrorMessage("Unable to logout :(")
            }
        })

    }
    useEffect(() => {
        const username = Cookie.get('username');
        setUsername(username === undefined ? "null" : username)
        getUser(username !== undefined ? username : "").then((res) => { })
        console.log(username);
    }, [])
    return (
        <div className="content-body">
            <div className="profile-card-holder">
                {username !== "null"
                    ? <div className="profile-card">
                        <h1>{username}</h1>
                        <button onClick={() => handleLogout()} >Logout</button>
                    </div>
                    : loginState
                        ? <motion.div
                            initial={{ scale: .1 }}
                            animate={{ scale: 1 }}
                            transition={{ ease: "easeOut", duration: .2 }}
                            className="profile-login">
                            <span className="login">Please Login</span>
                            <div className="login-form">
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
                        : <motion.div
                            initial={{ scale: .1 }}
                            animate={{ scale: 1 }}
                            transition={{ ease: "easeOut", duration: .2 }}
                        >
                            <div className="register-user">
                                <div className="profile-register">
                                    <span className="register-head">Register</span>
                                    <span className="register-message">Please fill in the following details about yourself.</span>
                                    <hr />
                                    <span>I am here to</span>
                                    <div className="user-type">
                                        <button className={userType == 1 ? "selected" : ""} onClick={() => setUserType(1)}>Buy Art</button>
                                        <button className={userType == 2 ? "selected" : ""} onClick={() => setUserType(2)}>Sell Art</button>
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
                        </motion.div>
                }
                {errorMessage.length !== 0 ? <div className="error-message">{errorMessage}</div> : <span></span>}

            </div>
        </div>
    )
}

export default Profile