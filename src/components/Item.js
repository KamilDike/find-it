import React from 'react'

function Item({src}) {
    return (
        <div className="item">
            <img src={src} alt="tree"/>
        </div>
    )
}

export default Item
