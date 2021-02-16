import { Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import firebase from '../config/Firebase'
import { useCookies } from 'react-cookie';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Game from './Game';
import fb from 'firebase'

function Lobby() {
    const [key] = useState(window.location.href.split('/').pop())
    const [players, setPlayers] = useState([])
    const [cookies, setCookie] = useCookies(['username'])
    const [runs, setRuns] = useState(false)
    const [winner, setWinner] = useState()

    let lobbiesRef;
    if(window.location.href.indexOf('private') !== -1) {
        lobbiesRef = firebase.firestore().collection('HiddenLobbies');
    } else {
        lobbiesRef = firebase.firestore().collection('Lobbies');
    }

    useEffect(() => {
        window.addEventListener("beforeunload", leave)
        if(!cookies['username']) {
            const username = prompt("Podaj twoją nazwę.");
            if (username) {
                setCookie('username', username)
                lobbiesRef.doc(key).collection('players').doc(username).set({points: 0});
            } else {
                alert('Musisz podać nazwę')
                window.location.href = '/'
            }
        } else {
            lobbiesRef.doc(key).collection('players').doc(cookies['username']).set({points: 0});
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
                        if (newData.winner) {
                            setWinner(newData.winner)
                        }
                    }
                })
            })
            setPlayers(players)
        }
        initialize()
    }, [])

    const startGame = () => {
        lobbiesRef.doc(key).set({runs: true, card: 
            [0, 1, 2, 3]
        })
    }

    const setCard = (card) => {
        lobbiesRef.doc(key).set({runs: runs, card:
            card
        })
    }

    const endGame = () => {
        lobbiesRef.doc(key).set({runs: false, winner: cookies['username']})
    }

    const addPoint = () => {
        lobbiesRef.doc(key).collection('players').doc(cookies['username'])
            .update({'points' : fb.firestore.FieldValue.increment(1)})
    }

    const goHome = () => { 
        window.location.href = '/'
    }

    const leave = e => {
        lobbiesRef.doc(key).collection('players').doc(cookies['username']).delete()
    }

    return (
        <div className="lobby">
            {runs ? 
            <div>
                <Game online={true} setCard={setCard} endGame={endGame} addPoint={addPoint} lobbiesRef={lobbiesRef}/>
            </div> :
            <div>
                {players.map(player => 
                    <div key={player} className="lobby__player colorOrangeBackground">{player}</div>
                )}
                <div className="lobby__menu">
                    <p><Button onClick={() => startGame()}>Start</Button></p>
                    <CopyToClipboard text={window.location.href}>
                        <Button onClick={() => alert('Link skopiowany do schowka ;)')}>Skopiuj link</Button>
                    </CopyToClipboard>
                    <p>
                        <Button onClick={() => goHome()}>Menu</Button>
                    </p>
                </div>
                {winner &&
                    <p>Wygrywa: <span className="colorOrange">{winner}</span> !!!</p>
                }
            </div>
            }
        </div>
    )
}

export default Lobby
