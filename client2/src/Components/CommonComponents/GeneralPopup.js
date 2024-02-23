import React from 'react'

const GeneralPopup = ({ data, onClose }) => {
    console.log(data)
    return (
        <div class="container">
            {data ? (
                data.map((item, index) => (
                    <span>{item.fldTitle}</span>
                ))
                ) : (
                        // Render something else or nothing if data is falsy
                <p>No data available</p>
            )}
            <button onClick={onClose}></button>
        </div>
    )
}

export default GeneralPopup