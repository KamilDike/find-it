import { Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import db from '../config/Firebase'
import { useCookies } from 'react-cookie';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function Lobby() {
    const [key, setKey] = useState(window.location.href.split('/').pop())
    const [players, setPlayers] = useState([])
    const [cookies, setCookie] = useCookies(['username'])

    useEffect(() => {
        if(!cookies['username']) {
            const username = prompt("Podaj twoją nazwę.");
            if (username) {
                setCookie('username', username)
                db.collection('HiddenLobbies').doc(key).collection('players').doc(username).set({});
            } else {
                alert('Musisz podać nazwę')
                window.location.href = '/'
            }
        }

        let lobbiesRef;
        if(window.location.href.indexOf('private') !== -1) {
            lobbiesRef = db.collection('HiddenLobbies');
        } else {
            lobbiesRef = db.collection('Lobbies');
        }

        const initialize = async () => {
            let players = []
            const snapshot = await lobbiesRef.doc(key).collection('players').get();
            snapshot.forEach(doc => {
                players.push(doc.id)
            });
            setPlayers(players)
        }
        initialize()
    }, [])

    return (
        <div className="lobby">
            {players.map(player => 
                <div key={player} className="lobby__player">{player}</div>
            )}
            <p><Button>Start</Button></p>
            <CopyToClipboard text={window.location.href}>
                <Button>Skopiuj link</Button>
            </CopyToClipboard>
        </div>
    )
}

export default Lobby
