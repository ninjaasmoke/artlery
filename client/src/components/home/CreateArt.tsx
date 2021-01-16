import React, { useState, useEffect } from 'react'
import { createArt, getUser } from '../api';

const Cookies = require('js-cookie')

interface CreateArtProp { }

const CreateArt: React.FC<CreateArtProp> = ({ }) => {
    const [username, setUsername] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [buttonState, setButtonState] = useState<string>('Create');
    const [errorMsg, setErrorMsg] = useState<string>('')

    const [artname, setArtname] = useState<string>('')
    const [arturl, setArturl] = useState<string>('')
    const [artabout, setArtabout] = useState<string>('')
    const [artprice, setArtprice] = useState<number>(0)

    const handleName = () => {
        var text = (document.getElementById('art-name') as HTMLInputElement).value
        setArtname(text);
    }
    const handleUrl = () => {
        var text = (document.getElementById('art-url') as HTMLInputElement).value
        setArturl(text);
    }
    const handleAbout = () => {
        var text = (document.getElementById('art-about') as HTMLInputElement).value
        setArtabout(text);
    }
    const handlePrice = () => {
        var text = (document.getElementById('art-price') as HTMLInputElement).value
        setArtprice(parseInt(text));
    }

    const handleSubmit = () => {
        setButtonState('Creating')
        setErrorMsg('')
        if (artname.length !== 0 && arturl.length !== 0 && artprice !== 0 && artabout.length !== 0) {
            createArt(username, artname, arturl, artprice, artabout).then((data) => {
                // // console.log(data);
                setButtonState('Successful')
                if (data.artist !== undefined && data.artist.length !== null) {
                    window.location.replace('/home')
                } else if (data.error !== undefined) {
                    setErrorMsg(data.error)
                }
            })
        } else {
            setButtonState('Create')
            setErrorMsg('Fill all details!')
        }
    }

    useEffect(() => {
        const username = Cookies.get('username');
        setUsername(username === undefined ? "null" : username)
        getUser(username !== undefined ? username : "").then((res) => {
            if (res?.data.usertype === 2) {
                setMessage("Unauthorized! You are on a customer account, create an artist account to sell art!")
            }
        })
    }, [])
    return (
        <div className="content-body">
            {/* <div className="nav-space"></div> */}
            {message.length !== 0
                ? <div className="error"><h1>{username}</h1>{message}</div>
                : <div className="input-art-details">
                    <div className="create-art-inputs" >
                        <span>Enter Art Name</span>
                        <input type="text" name="art-name" id="art-name" onChange={() => handleName()} />
                        <span>Image URL <span className="art-image-sub" >Please enter valid url</span> </span>
                        <input type="text" name="art-url" id="art-url" onChange={() => handleUrl()} />
                        <span>About this art?</span>
                        <textarea name="art-about" id="art-about" rows={6} onChange={() => handleAbout()} ></textarea>
                        {/* <input type="text" name="art-about" id="art-about" onChange={() => handleAbout()} /> */}
                        <span>Price</span>
                        <input type="number" name="art-price" id="art-price" onChange={() => handlePrice()} />
                        <button onClick={() => handleSubmit()}>{buttonState}</button>
                    </div>
                    {errorMsg.length !== 0 ? <div className="error-message">{errorMsg}</div> : <span />}
                </div>
            }
        </div>
    )
}

export default CreateArt