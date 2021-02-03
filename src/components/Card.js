import React from 'react'
import Item from './Item'
import tree from './../images/tree.png'; 

function Card() {
    return (
        <div className='card'>
            <Item src={tree}/>
        </div>
    )
}

export default Card
