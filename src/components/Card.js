import React, { useState, useEffect } from 'react'
import Item from './Item'


function Card({itemList}) {
    console.log(itemList)

    return (
        <div className='card'>
            {itemList &&
            <Item src={itemList[0]}/>
            }
        </div>
    )
}

export default Card
