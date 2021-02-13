import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import Collapsible from 'react-collapsible'
import firebase from '../config/Firebase';
import { useCookies } from 'react-cookie';

function Main() {
    const [lobbies] = useState([1, 2, 3])
    const [cookies, setCookie] = useCookies(['username'])
    const [username, setUsername] = useState('')

    const createLobby = async () => {
        let key = '';
        for (let index = 0; index < 4; index++) {
            key += Math.floor(Math.random() * 10);
        }
        await firebase.firestore().collection('HiddenLobbies').doc(key).collection('players').doc(cookies['username']).set({});
        window.location.href = `/lobby/private/${key}`
    }

    const joinLobby = async (key) => {
        let lobby;
        switch (key) {
            case 1:
                lobby = 'pierwszy'
                break;
            case 2:
                lobby = 'drugi'
                break;
            case 3:
                lobby = 'trzeci'
                break;
            default:
                break;
        }
        await firebase.firestore().collection('Lobbies').doc(lobby).collection('players').doc(cookies['username']).set({});
        window.location.href = `/lobby/${lobby}`
    }

    const submitUsername = (e) => {
        e.preventDefault();
        setCookie('username', username);
    }

    return (
        <div className="main">
            <div>
                <Button onClick={() => window.location.href ='/gra'}>ZAGRAJ</Button>
            </div>
            {cookies['username'] ?
            <div>
                <div>
                    <Button onClick={() => createLobby()}>ZAPROS ZNAJOMYCH</Button>
                </div>
                <div className="collapsible">
                    <Collapsible trigger={<Button>Dołącz</Button>}>
                        {lobbies.length ? lobbies.map((lobby) => 
                            <div key={lobby}><Button onClick={() => joinLobby(lobby)}>{lobby}</Button></div>
                        ) : <p>Nic tu nie ma :(</p>}
                    </Collapsible>
                </div>
            </div> : 
            <form onSubmit={(e) => submitUsername(e)}>
                <input type="text" placeholder="Twoja nazwa" className="text-center" value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />    
            </form>
            }
        </div>
    )
}

export default Main
