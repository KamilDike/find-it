import React, {useState, useEffect} from 'react'
import Item from './Item'


function Card({itemList, selectItem, loading}) {
    const [loadingCard, setLoadingCard] = useState()

    useEffect(() => {
        if (loading) {
            setLoadingCard(true)
        }
    }, [loading])

    useEffect(() => {
        if (loadingCard) {
            setTimeout(() => {setLoadingCard(false)}, 2000)
        }
    }, [loadingCard])

    return (
        <div className={`card ${loadingCard && 'loading__card'}`}>
            {itemList &&
                itemList.map((item, index) => 
                    <Item src={item} index={index} key={index} selectItem={selectItem}/>
                )
            }
        </div>
    )
}

export default Card
