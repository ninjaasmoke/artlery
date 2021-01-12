import React from 'react'

interface LoadingProp { }
const Loading: React.FC<LoadingProp> = () => {
    return (
        <div className="big-empty">
            Loading...
        </div>
    )
}

export default Loading