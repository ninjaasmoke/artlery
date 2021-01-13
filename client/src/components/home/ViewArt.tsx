import { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { search } from '../api'
import { Art } from '../ContextTypes'

type ViewArtProps = {
    showArt: string
}

const ViewArt = ({ match }: RouteComponentProps<ViewArtProps>) => {

    const [foundArt, setFoundArt] = useState<Art>()

    const getData = async () => {
        search(match.params.showArt).then((data) => {
            setFoundArt(data)
        })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="view-art">
            <div className="jumbo">
                <img src={foundArt?.imageurl} alt={foundArt?.name} />
                <div className="image-mask"></div>
                {/* <div className="image-dp">
                    <img src={foundArt?.url} alt={foundArt?.name} />
                </div> */}
            </div>
            <div className="found-art">
                <img alt={foundArt?.name} src={foundArt?.imageurl} className="art-image" />
                <div>
                    <div className="art-name"> {foundArt?.name}</div>
                    <div className="art-about">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem sed tenetur illo, magnam accusamus tempora doloremque modi, odio, earum sunt quas quisquam quae nesciunt ducimus ullam eligendi quos cupiditate.</div>
                    <div className="art-rating">Rating: {foundArt?.rating}</div>
                    <div className="art-price">Price: ${foundArt?.price}</div>
                    <div className="art-buttons">
                        <button className="art-buy">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewArt