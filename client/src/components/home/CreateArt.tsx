import React, { useState, useEffect } from 'react'
import { getUser } from '../api';

const Cookies = require('js-cookie')

interface CreateArtProp { }

const CreateArt: React.FC<CreateArtProp> = ({ }) => {
    const [username, setUsername] = useState<string>('');
    const [message, setMessage] = useState<string>('')


    useEffect(() => {
        const username = Cookies.get('username');
        setUsername(username === undefined ? "null" : username)
        getUser(username !== undefined ? username : "").then((res) => {
            if (res?.data.usertype === 2) {
                setMessage("Unauthorized! You are on a customer account, create an artist to sell art!")
            }
        })
    }, [])
    return (
        <div className="content-body">
            <div className="nav-space"></div>
            {message.length !== 0
                ? <div className="error"><h1>{username}</h1>{message}</div>
                : <div className="input-art-details">
                    <form action="" method="post" className="create-art-inputs" >
                        <span>Enter Art Name</span>
                        <input type="text" name="art-name" id="art-name" />
                        <span>Image URL</span>
                        <input type="text" name="art-url" id="art-url" />
                        <span>Price</span>
                        <input type="text" name="art-price" id="art-price" />
                    </form>
                </div>
            }
        </div>
    )
}

export default CreateArt