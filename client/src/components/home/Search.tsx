import React, { useState } from 'react'
import { search } from '../api';
import { Art } from '../ContextTypes';

interface SearchProp { }
const Search: React.FC<SearchProp> = () => {
    // const [searched, setSearched] = useState<string>('')
    const [searchtext, setSearchtext] = useState<string>('')
    const [foundArt, setFoundArt] = useState<Art>()

    const handleChange = (searchText: string) => {
        var text = (document.getElementById('search-text') as HTMLInputElement).value
        setSearchtext(text)
    }
    const getData = async (searchText: string) => {

        if (searchText.length !== 0) {
            console.log("Searching");
            search(searchtext).then((data) => {
                // setSearched(searchText)
                setFoundArt(data)
            })
        } else {
            console.log(searchText);
        }
    }

    return (
        <div className="content-body">
            <div className="nav-space"></div>
            <div className="home-intro">
                <div>
                    <div className="home-intro-heading">
                        Search from our awesome collection of artifacts
                    </div>
                </div>
                <div className="home-intro-instruction">
                    Type something
                </div>
            </div>
            <div className="input">
                <input type="text" name="search" id="search-text"
                    autoComplete="false" placeholder="Start searching"
                    // defaultValue={searchtext}
                    onChange={() => handleChange(searchtext)}
                />
            </div>
            <div className="search-button">
                <button type="submit" onClick={() => getData(searchtext)}>Search</button>
            </div>
            {
                foundArt ?
                    <div className="found-art">
                        <img alt={foundArt.name} src={foundArt.imageurl} className="art-image" />
                        <div>
                            <div className="art-name"> {foundArt.name}</div>
                            <div className="art-about">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem sed tenetur illo, magnam accusamus tempora doloremque modi, odio, earum sunt quas quisquam quae nesciunt ducimus ullam eligendi quos cupiditate.</div>
                            <div className="art-rating">Rating: {foundArt.rating}</div>
                            <div className="art-price">Price: ${foundArt.price}</div>
                            <div className="art-buttons">
                                {/* <button className="art-view">View</button>
                                <span className="art-button-space"></span> */}
                                <button className="art-buy">Buy Now</button>
                            </div>
                        </div>
                    </div>
                    : <div></div>
            }

        </div>
    )
}

export default Search
