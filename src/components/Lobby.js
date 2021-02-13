import { Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import firebase from '../config/Firebase'
import { useCookies } from 'react-cookie';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Game from './Game';

function Lobby() {
    const [key] = useState(window.location.href.split('/').pop())
    const [players, setPlayers] = useState([])
    const [cookies, setCookie] = useCookies(['username'])
    const [runs, setRuns] = useState(false)

    let lobbiesRef;
    if(window.location.href.indexOf('private') !== -1) {
        lobbiesRef = firebase.firestore().collection('HiddenLobbies');
    } else {
        lobbiesRef = firebase.firestore().collection('Lobbies');
    }

    useEffect(() => {
        if(!cookies['username']) {
            const username = prompt("Podaj twoją nazwę.");
            if (username) {
                setCookie('username', username)
             firebase.firestore().collection('HiddenLobbies').doc(key).collection('players').doc(username).set({});
            } else {
                alert('Musisz podać nazwę')
                window.location.href = '/'
            }
        }

        const initialize = async () => {
            lobbiesRef.doc(key).collection('players').onSnapshot(snapshot => {
                let players = [];
                snapshot.docs.forEach(doc => {
                    if (doc.exists) {
                        players.push(doc.id)
                    }
                })
                setPlayers(players)
            })
            lobbiesRef.onSnapshot(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (doc.id === key) {
                        const newData = doc.data()
                        setRuns(newData.runs)
                    }
                })
            })
            setPlayers(players)
        }
        initialize()
    }, [])

    const startGame = () => {
        lobbiesRef.doc(key).collection('players').doc(cookies['username']).set({points: 0})
        lobbiesRef.doc(key).set({runs: true, card: 
            ["cat", "banana", "basketball", "dog"]
        })
    }

    const setCard = (card) => {
        lobbiesRef.doc(key).set({runs: runs, card:
            card
        })
    }

    const endGame = () => {
        lobbiesRef.doc(key).set({runs: false})
    }

    const addPoint = () => {
        lobbiesRef.doc(key).collection('players').doc(cookies['username'])
            .update({"points" : firebase.firestore.FieldValue.increment(1)})
    }

    return (
        <div className="lobby">
            {runs ? 
            <div>
                <Game online={true} setCard={setCard} setRuns={endGame} addPoint={addPoint}/>
            </div> :
            <div>
                {players.map(player => 
                    <div key={player} className="lobby__player">{player}</div>
                )}
                <p><Button onClick={() => startGame()}>Start</Button></p>
                <CopyToClipboard text={window.location.href}>
                    <Button>Skopiuj link</Button>
                </CopyToClipboard>
            </div>
            }
        </div>
    )
}

export default Lobby
