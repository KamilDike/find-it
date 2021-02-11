import React, { useState, useEffect } from 'react'
import Item from './Item'


function Card({itemList, selectItem}) {

    return (
        <div className='card'>
            {itemList &&
                itemList.map((item, index) => 
                    <Item src={item} index={index} key={index} selectItem={selectItem}/>
                )
            }
        </div>
    )
}

export default Card
