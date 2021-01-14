import React from 'react'

interface ErrorProps {
    errorMsg: string
}
const ErrorBig: React.FC<ErrorProps> = ({ errorMsg }) => {

    return (
        <div className="big-empty">
            Big empty
            <div className="error-content">
                There seems to be something wrong.
            </div>
            <div className="error-message">
                {errorMsg}
            </div>
        </div>
    )
}

export default ErrorBig