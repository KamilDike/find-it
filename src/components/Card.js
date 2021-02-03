import React, { useState, useEffect } from 'react'
import Item from './Item'
import cat from './../images/cat.png'; 
import banana from './../images/banana.png'; 
import basketball from './../images/basketball.png'; 
import dog from './../images/dog.png'; 

function Card() {
    const itemList = [cat, banana, basketball, dog]
    const [cards, setCards] = useState([])

    //The number of symbols on a card has to be a prime number + 1
    const numberOfSymbolsOnCard = 4
    const n = numberOfSymbolsOnCard - 1

    //Total number of cards that can be generated following the Dobble rules
    const numberOfCards = n**2 + n + 1

    const addFirstSet = (n) => {
        let cards = []
        //Add first set of n+1 cards (e.g. 4 cards)
        for (let i = 0; i < n + 1; i++) {
            //Add new card with first symbol
            cards.push([1])
            //Add n+1 symbols on the card (e.g. 4 symbols)
            for (let j = 0; j < n; j++) {
                cards[i].push((j+1)+(i*n)+1)
            }
        }
        return cards;
    }

    const addNSets = (n, cards) => {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                //Append a new card with 1 symbol
                cards.push([i+2])
                for (let k = 0; k < n; k++) {
                    let val  = (n+1 + n*k + (i*k+j)%n)+1
                    cards[cards.length - 1].push(val)
                }                
            }            
        }
        return cards;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        const initialize = async () => {
            let cards = await addFirstSet(n)
            cards = await addNSets(n, cards)
            cards = shuffleArray(cards)
            setCards(cards)
        }
        initialize()
    }, [n])

    return (
        <div className='card'>
            {console.log(cards)}
            <Item src={cat}/>
        </div>
    )
}

export default Card
