import React, { createContext, useCallback, useEffect, useState } from 'react'
import { Art } from '../ContextTypes'
import { getArt } from '../api'

interface ArtContextProps {
    art: Array<Art>;
    updateArt?: () => void;
}

export const ArtContext = createContext<ArtContextProps>({
    art: []
})

export const ArtContextProvider: React.FC = ({ children }) => {
    const [art, setArt] = useState<Array<Art>>([])
    const updateArt = useCallback(() => {
        getArt().then((data) => setArt(data.reverse()))
    }, [])
    useEffect(updateArt, [updateArt])
    return (
        <ArtContext.Provider value={{ art, updateArt }}>
            {children}
        </ArtContext.Provider>
    )
}