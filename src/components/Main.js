import { Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import firebase from '../config/Firebase';
import { useCookies } from 'react-cookie';
import pikachu from './../images/pikachu.png'; 
import Collapsible from 'react-collapsible';

function Main() {
    const [cookies, setCookie] = useCookies(['username'])
    const [username, setUsername] = useState('')
    const [highscores, setHighscores] = useState([])

    useEffect(() => {
        firebase.firestore().collection("Scores").orderBy("points", "desc").limit(10)
            .get().then((querySnapshot) => {
                let highscores = []
                querySnapshot.forEach((doc) => {
                    highscores.push(doc.data());
                });
                setHighscores(highscores);
            });
    }, [])

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
            <div className="main__content">
                <img src={pikachu} alt={pikachu}/>
                <div>
                    <Button onClick={() => window.location.href ='/gra'}>ZAGRAJ</Button>
                </div>
                {cookies['username'] ?
                    <div>
                        <div>
                            <Button onClick={() => createLobby()}>ZAPROŚ ZNAJOMYCH</Button>
                        </div>
                        <div>
                            <Button onClick={() => joinLobby('pierwszy')}>DOŁĄCZ</Button>
                        </div>
                        <Collapsible trigger={<Button>NAJLEPSZE WYNIKI</Button>}>
                            {highscores.map((score, index) => 
                                <div key={index}>{index+1}. {score.name} : <span className="colorOrange">{score.points}</span></div>
                            )}
                        </Collapsible>
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
        </div>
    )
}

export default Main
