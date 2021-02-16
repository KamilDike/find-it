import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import firebase from '../config/Firebase';
import { useCookies } from 'react-cookie';
import pikachu from './../images/pikachu.png'; 

function Main() {
    const [cookies, setCookie] = useCookies(['username'])
    const [username, setUsername] = useState('')

    const createLobby = async () => {
        let key = '';
        for (let index = 0; index < 4; index++) {
            key += Math.floor(Math.random() * 10);
        }
        await firebase.firestore().collection('HiddenLobbies').doc(key).set({})
        window.location.href = `/lobby/private/${key}`
    }

    const joinLobby = (key) => {
        window.location.href = `/lobby/${key}`
    }

    const submitUsername = (e) => {
        e.preventDefault();
        setCookie('username', username);
    }

    return (
        <div className="main">
            <img src={pikachu} alt={pikachu}/>
            <div>
                <Button onClick={() => window.location.href ='/gra'}>ZAGRAJ</Button>
            </div>
            {cookies['username'] ?
            <div>
                <p>
                    <Button onClick={() => createLobby()}>ZAPROŚ ZNAJOMYCH</Button>
                </p>
                <p>
                    <Button onClick={() => joinLobby('pierwszy')}>DOŁĄCZ</Button>
                </p>
            </div> : 
            <form onSubmit={(e) => submitUsername(e)}>
                <input id="usernameInput" type="text" placeholder="Twoja nazwa" className="text-center" value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />   
                <input type="submit" value="✔️" className="btn-primary"/>
                <p>
                    <small>Odblokowuję multiplayer</small>
                </p>
            </form>
            }
        </div>
    )
}

export default Main
