import { useEffect, useState } from 'react'
import ReactDropdown, { Option } from 'react-dropdown'
import { Link, RouteComponentProps } from 'react-router-dom'
import { getComments, getRating, postComment, postRating, search } from '../api'
import { Art } from '../ContextTypes'
import FadeInTop from './animation/FadeInAnim'
import FadeInBottom from './animation/FadeInBottom'
import { Comments } from '../ContextTypes'

const Cookies = require('js-cookie')

type ViewArtProps = {
    showArt: string
}

const ViewArt = ({ match }: RouteComponentProps<ViewArtProps>) => {

    const [foundArt, setFoundArt] = useState<Art>()
    const [rating, setRating] = useState<string | number>(0)
    const [comments, setComments] = useState<Comments[]>()
    const [comment, setComment] = useState<string>('')
    const [Username, setUsername] = useState<string>('')
    const [userRating, setUserRating] = useState<Option>()
    const [Rate, setRate] = useState<number>(0)
    const [buttonState, setButtonState] = useState<string>('Rate')

    const getData = async () => {
        search(match.params.showArt).then((data) => {
            setFoundArt(data)
            getRating(data.name).then((res) => {
                setRating(res !== null ? res : 0)
            })
            getComments(data.name).then((data) => {
                setComments(data)
            })
        })
    }

    const options = ['5', '4', '3', '2', '1']
    const defOption = "Choose rating"

    const handleComment = () => {
        var text = (document.getElementById('user-comment') as HTMLInputElement).value
        setComment(text)
    }

    const handlePostRating = () => {
        setButtonState("Rating...")
        postRating(Rate, Username, foundArt?.name ?? "").then((res) => {
            window.location.reload()
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
        })
        setButtonState("Rate")
    }

    const handlePostComment = () => {
        if (comment.length !== 0) {
            postComment(comment, Username, foundArt?.name ?? "").then((res) => {
                window.location.reload()
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
            })
        }
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
                            <div className="art-name"> {foundArt?.name} <span className="art-artist"> - {foundArt?.artist}</span></div>
                            <div className="art-about"> {foundArt?.about !== null ? foundArt?.about : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem sed tenetur illo, magnam accusamus tempora doloremque modi, odio, earum sunt quas quisquam quae nesciunt ducimus ullam eligendi quos cupiditate."}</div>
                            {/* <div className="art-artist">{foundArt?.artist}</div> */}
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
                    <div className="art-ratingViewArt">
                        <span>Rating: {rating}</span>
                        <div>Rate this item</div>
                        {/* <ReactDropdown
                            options={options} value={defOption} placeholder="Rate this item" onChange={(option) => { setUserRating(option) }} /> */}
                        <div className="rating-buttons">
                            <div className={Rate === 1 ? "rate-button rate-select" : "rate-button"} onClick={() => setRate(1)}>1</div>
                            <div className={Rate === 2 ? "rate-button rate-select" : "rate-button"} onClick={() => setRate(2)}>2</div>
                            <div className={Rate === 3 ? "rate-button rate-select" : "rate-button"} onClick={() => setRate(3)}>3</div>
                            <div className={Rate === 4 ? "rate-button rate-select" : "rate-button"} onClick={() => setRate(4)}>4</div>
                            <div className={Rate === 5 ? "rate-button rate-select" : "rate-button"} onClick={() => setRate(5)}>5</div>
                        </div>
                        {Rate !== 0 ? <button onClick={() => handlePostRating()}>{buttonState}</button> : <span></span>}
                    </div> : <span></span>
            } classname="" />
            <FadeInBottom children={
                Username !== "null" ?
                    <div className="art-comments">
                        <h2>Comments</h2>
                        {comments?.map((comm, index) => (
                            <div key={index} className="comment">
                                <p>{comm.comment}</p>
                                <h6>{comm.username}</h6>
                            </div>
                        ))}
                        <h3>Add Comment</h3>
                        <textarea name="comment" id="user-comment" onChange={() => handleComment()}></textarea>
                        {comment.length >= 10 ? <button onClick={() => handlePostComment()}>Comment</button> : <span />}
                    </div> : <span></span>
            } classname="" />
        </div>
    )
}

export default ViewArt