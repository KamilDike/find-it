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
import DobbleAlghorithm from './DobbleAlghorithm';

function Game({online}) {
    const itemList = [cat, banana, basketball, dog, apple, charizard, earth, elephant, pikachu, thunder, tree, water, zebra]
    const [cards, setCards] = useState([])
    const [currentCard, setCurrentCard] = useState(0)
    const [game, setGame] = useState(1)
    const [points, setPoints] = useState()
    const [startTime] = useState(Date.now())

    useEffect(() => {
        let cards = [];
        DobbleAlghorithm().then(alg => {
            alg.forEach((row, index) => {
                cards.push(new Array());
                row.forEach(el => cards[index].push(itemList[el]))
            })
            setCards(cards)
        })
    }, [])

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
            <div>
                {game ?
                <div>
                    <Card itemList={cards[currentCard]}/>
                    <Card itemList={cards[currentCard + 1]} selectItem={selectItem}/>
                </div>
                : 
                <div>KONIEC GRY <br/> twój wynik:
                    <div className="points">{points} pkt</div>
                    <Button onClick={() => window.location.reload()}>ZAGRAJ JESZCZE RAZ</Button>
                </div>
                }
            </div>
        </div>
    )
}

export default Game
