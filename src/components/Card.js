import React, { useState, useEffect } from 'react'
import Item from './Item'


function Card({itemList, active}) {
    console.log(itemList)

    return (
        <div className='card'>
            {itemList &&
                itemList.map((item, index) => 
                    <Item src={item} index={index}/>
                )
            }
        </div>
    )
}

export default Card
