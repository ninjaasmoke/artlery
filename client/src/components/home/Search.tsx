import React, { useState } from 'react'
import { search } from '../api';
import { Art } from '../ContextTypes';
import FadeInTop from './animation/FadeInAnim';
import FadeInBottom from './animation/FadeInBottom';

interface SearchProp { }
const Search: React.FC<SearchProp> = () => {
    const [searchError, setSearchError] = useState<string>('')
    const [searchtext, setSearchtext] = useState<string>('')
    const [foundArt, setFoundArt] = useState<Art>()
    const [searchState, setSearchState] = useState<string>('Search')

    const handleChange = (searchText: string) => {
        var text = (document.getElementById('search-text') as HTMLInputElement).value
        setSearchtext(text)
    }
    const getData = async (searchText: string) => {
        if (searchText.length !== 0) {
            setSearchState('Searching...')
            // console.log("Searching");
            setSearchError('')
            search(searchtext).then((data) => {
                if (data !== null) {
                    setFoundArt(data);
                    setSearchState('Search')
                    if (window.innerWidth > 767) {
                        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
                    }
                } else {
                    setSearchError('Didn\'t find anything...')
                    setFoundArt(undefined)
                }
            })
        }
    }

    return (
        <div className="content-body">
            <div className="nav-space"></div>
            <FadeInTop
                children={
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
                }
                classname="" />
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
            {searchError.length !== 0 ? <div className="error-message">{searchError}</div> : <span></span>}
            {
                foundArt ?
                    <FadeInBottom
                        classname=""
                        children={<div className="found-art">
                            <img alt={foundArt.name} src={foundArt.imageurl} className="art-image" />
                            <div className="art-details">
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
                        </div>} />
                    : <div></div>
            }

        </div>
    )
}

export default Search
