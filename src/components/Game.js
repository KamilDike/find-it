import React, { useState, useEffect } from 'react'
import cat from './../images/cat.png'; 
import banana from './../images/banana.png'; 
import basketball from './../images/basketball.png'; 
import dog from './../images/dog.png'; 
import apple from './../images/apple.png'; 
import charizard from './../images/charizard.png'; 
import earth from './../images/earth.png'; 
import elephant from './../images/elephant.png'; 
import pikachu from './../images/pikachu.png'; 
import thunder from './../images/thunder.png'; 
import tree from './../images/tree.png'; 
import water from './../images/water.png'; 
import zebra from './../images/zebra.png';
import Card from './Card';
import { Button } from 'react-bootstrap';

function Game() {
    const itemList = [cat, banana, basketball, dog, apple, charizard, earth, elephant, pikachu, thunder, tree, water, zebra]
    const [cards, setCards] = useState([])
    const [currentCard, setCurrentCard] = useState(0)
    const [game, setGame] = useState(1)
    const [points, setPoints] = useState()
    const [startTime] = useState(Date.now())
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
            cards.push([itemList[0]])
            //Add n+1 symbols on the card (e.g. 4 symbols)
            for (let j = 0; j < n; j++) {
                cards[i].push(itemList[(j+1)+(i*n)])
            }
        }
        return cards;
    }

    const addNSets = (n, cards) => {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                //Append a new card with 1 symbol
                cards.push([itemList[i+1]])
                for (let k = 0; k < n; k++) {
                    let val  = (n+1 + n*k + (i*k+j)%n)+1
                    cards[cards.length - 1].push(itemList[val-1])
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

    const selectItem = (item) => {
        const foundItem = cards[currentCard].indexOf(item)
        if (foundItem !== -1) {
            setCurrentCard(currentCard + 1);
        }
    }

    useEffect(() => {
        if (cards.length > 0 && currentCard === cards.length - 1) {
            const points = 100000000 / (Date.now() - startTime)            
            setPoints(parseInt(points));
            setGame(0)
        }
    }, [currentCard, cards])

    return (
        <div className="game container">
            {game ?
            <div>
                <Card itemList={cards[currentCard]}/>
                <Card itemList={cards[currentCard + 1]} selectItem={selectItem}/>
            </div>
            : 
            <div>KONIEC GRY <br/> twój wynik:
                <div className="points">{points}</div>
                <Button onClick={() => window.location.reload()}>ZAGRAJ JESZCZE RAZ</Button>
            </div>
            }
        </div>
    )
}

export default Game
