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
const itemList = [cat, banana, basketball, dog, apple, charizard, earth, elephant, pikachu, thunder, tree, water, zebra]

function Game({online, setCard, setRuns, addPoint, lobbiesRef}) {
    const [key] = useState(window.location.href.split('/').pop())
    const [cards, setCards] = useState([])
    const [currentCard, setCurrentCard] = useState(0)
    const [game, setGame] = useState(1)
    const [points, setPoints] = useState()
    const [startTime] = useState(Date.now())
    const [onlineCard, setOnlineCard] = useState([])
    const [delay, setDelay] = useState(0)

    useEffect(() => {
        let cards = [];
        if (online) {
            lobbiesRef.doc(key).onSnapshot(doc => {
                const card = doc.data().card
                if (card) {
                    setOnlineCard([itemList[card[0]], itemList[card[1]], itemList[card[2]], itemList[card[3]]])
                }
            })
        }
        DobbleAlghorithm().then(alg => {
            alg.forEach((row, index) => {
                cards.push([]);
                row.forEach(el => cards[index].push(itemList[el]))
            })
            setCards(cards)
        })
    }, [online])

    const selectItem = (item) => {
        let foundItem;
        if (online) {
            foundItem = onlineCard.indexOf(item)
        } else {
            foundItem = cards[currentCard].indexOf(item)
        }
        if (foundItem !== -1) {
            if (Date.now() - delay > 2000) {
                setCurrentCard(currentCard + 1);
                if (online) {
                    const newCard = [itemList.indexOf(cards[currentCard+1][0]), itemList.indexOf(cards[currentCard+1][1]), itemList.indexOf(cards[currentCard+1][2]), itemList.indexOf(cards[currentCard+1][3])]
                    setCard(newCard)
                    addPoint()
                }
            }
        } else {
            setDelay(Date.now())
        }
    }

    useEffect(() => {
        if (cards.length > 0 && currentCard === cards.length - 3) {
            const points = 100000000 / (Date.now() - startTime)            
            setPoints(parseInt(points));
            setGame(0)
            if (online) {
                setRuns()
            }
        }
    }, [currentCard])

    return (
        <div className="game container">
            <div>
                {game ?
                <div>
                    {online ?
                        <Card itemList={onlineCard}/> : 
                        <Card itemList={cards[currentCard]}/>
                    }
                    <Card itemList={cards[currentCard + 1]} selectItem={selectItem} loading={delay}/>
                </div>
                : 
                <div>KONIEC GRY <br/> twój wynik:
                    <div className="points colorOrange">{points} pkt</div>
                    <Button onClick={() => window.location.reload()}>ZAGRAJ JESZCZE RAZ</Button>
                    <Button onClick={() => window.location.href = '/'}>MENU</Button>
                </div>
                }
            </div>
        </div>
    )
}

export default Game
