import { useEffect, useState } from 'react'
import ReactDropdown, { Option } from 'react-dropdown'
import { Link, RouteComponentProps } from 'react-router-dom'
import { getRating, postRating, search } from '../api'
import { Art } from '../ContextTypes'
import FadeInTop from './animation/FadeInAnim'
import FadeInBottom from './animation/FadeInBottom'

const Cookies = require('js-cookie')

type ViewArtProps = {
    showArt: string
}

const ViewArt = ({ match }: RouteComponentProps<ViewArtProps>) => {

    const [foundArt, setFoundArt] = useState<Art>()
    const [rating, setRating] = useState<string | number>(0)
    const [Username, setUsername] = useState<string>('')
    const [userRating, setUserRating] = useState<Option>()
    const [buttonState, setButtonState] = useState<string>('Submit')

    const getData = async () => {
        search(match.params.showArt).then((data) => {
            setFoundArt(data)
            getRating(data.name).then((res) => {
                setRating(res !== null ? res : 0)
            })
        })
        // postRating()
    }

    const options = ['5', '4', '3', '2', '1']
    const defOption = "Choose rating"

    const handlePostRating = () => {
        setButtonState("Submiting...")

        postRating(parseInt(userRating?.value === undefined ? "5" : userRating.value), Username, foundArt?.name ?? "").then((res) => {
            console.log(res);
            window.location.reload()
        })
        setButtonState("Submit")
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getData()
        const username = Cookies.get('username');
        setUsername(username === undefined ? "null" : username)
    }, [])
    return (
        <div className="view-art">
            <FadeInTop children={
                <div style={{ backgroundImage: `url(${foundArt?.imageurl})`, backgroundPosition: 'no-repeat', backgroundSize: 'cover', backgroundPositionY: '50%' }} >
                    <div className="found-art">
                        <div className="space-filler"></div>
                        <img alt={foundArt?.name} src={foundArt?.imageurl} className="art-image" />
                        <div className="space-filler"></div>
                        <div className="art-details" >
                            <div className="art-name"> {foundArt?.name}</div>
                            <div className="art-about"> {foundArt?.about !== null ? foundArt?.about : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem sed tenetur illo, magnam accusamus tempora doloremque modi, odio, earum sunt quas quisquam quae nesciunt ducimus ullam eligendi quos cupiditate."}</div>
                            {/* <div className="art-rating">Rating: {rating}</div> */}
                            <div className="art-price">Price: ${foundArt?.price}</div>
                            <div className="art-buttons">
                                <Link to={{
                                    pathname: "/buyart/" + foundArt?.name
                                }} className="art-buy">Buy Now</Link>
                            </div>
                        </div>
                        <div className="space-filler"></div>
                    </div>
                </div>} classname="" />
            <FadeInBottom children={
                Username !== "null" ?
                    <div className="art-rating">
                        <span>Rating: {rating}</span>
                        <div>Rate this item</div>
                        <ReactDropdown
                            arrowClosed={(<span className="arrow-closed"></span>)}
                            arrowOpen={(<span className="arrow-openx"></span>)}
                            options={options} value={defOption} placeholder="Rate this item" onChange={(option) => { setUserRating(option) }} />
                        <button onClick={() => handlePostRating()}>{buttonState}</button>
                    </div> : <span></span>
            } classname="" />
        </div>
    )
}

export default ViewArt