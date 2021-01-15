import { useEffect, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { placeOrder, search } from '../api'
import { Art } from '../ContextTypes'
import FadeInTop from './animation/FadeInAnim'

const Cookies = require('js-cookie')

type BuyArtProps = {
    art: string
}
const BuyArt = ({ match }: RouteComponentProps<BuyArtProps>) => {
    const [foundArt, setFoundArt] = useState<Art>()
    const [orderBuy, setOrderBuy] = useState<string>("Place Order")
    const [addressText, setAddressText] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [errorMessage, setErrorText] = useState<string>('')

    const getData = async () => {
        search(match.params.art).then((data) => {
            setFoundArt(data)
        })
    }

    const handleAddressText = () => {
        var text = (document.getElementById('address') as HTMLInputElement).value
        setAddressText(text);
    }

    function getDate() {
        var date = new Date(Date.now())
        date.setDate(date.getDate() + 7)
        return date.toISOString()
    }

    const handleBuy = () => {
        if (addressText.length !== 0 && username !== "null") {
            setErrorText('')
            setOrderBuy('Ordering...')
            placeOrder({ username: username, artname: match.params.art, address: addressText, booked: Date().toString().substring(4, 15), due: getDate().substring(4, 15) }).then((data) => {
                console.log(data);
                if (data.username === username) {
                    setOrderBuy('Success!')
                    window.location.replace('/profile')
                } else {
                    setOrderBuy('Place Order')
                    setErrorText('You have already bought this item!')
                }
            })
        } else if (username === "null") {
            setErrorText("You need to login to place order!")
        } else {
            setErrorText('Fill up the address!')
        }

    }
    useEffect(() => {
        window.scrollTo(0, 0)
        const username = Cookies.get('username');
        setUsername(username === undefined ? "null" : username)
        getData()

    }, [])
    return (
        <FadeInTop children={
            <div className="content-body">
                <div className="nav-space"></div>
                <div className="buy-input">
                    <h2>Enter delivery address</h2>
                    <input type="text" id="address" placeholder="Address" aria-expanded={true} onChange={() => handleAddressText()} />
                    <span></span>
                    <div className="buttons">
                        <button onClick={() => handleBuy()} className="button">{orderBuy}</button>
                        <div className="art-button-space"></div>
                        {errorMessage === "You need to login to place order!" ? <Link to="/profile" className="button" >Login</Link> : <span></span>}
                    </div>
                    {errorMessage.length !== 0 ? <div className="error-message">{errorMessage}</div> : <span></span>}
                </div>
                <div className="buy-art">
                    <img alt={foundArt?.name} src={foundArt?.imageurl} className="art-image" />
                    <div>
                        <div className="art-name"> {foundArt?.name}</div>
                        <div className="art-about">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem sed tenetur illo, magnam accusamus tempora doloremque modi, odio, earum sunt quas quisquam quae nesciunt ducimus ullam eligendi quos cupiditate.</div>
                        <div className="art-rating">Rating: {foundArt?.rating}</div>
                        <div className="art-price">Price: ${foundArt?.price}</div>
                    </div>
                </div>
            </div>} classname="" />
    )
}

export default BuyArt
