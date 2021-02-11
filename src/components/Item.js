import React from 'react'

function Item({src, index}) {
    return (
        <div className={`item item${index}`} onClick={() => alert(src)}>
            <img src={src} alt={src}/>
        </div>
    )
}

export default Item
