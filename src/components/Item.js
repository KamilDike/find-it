import React from 'react'

function Item({src, index, selectItem}) {
    return (
        <div className={`item item${index} ${selectItem ? 'cursor-pointer' : ''}`} 
            onClick={() => {
                selectItem && selectItem(src)
            }}>
            <img src={src} alt={src}/>
        </div>
    )
}

export default Item
