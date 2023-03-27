import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const dbRef = firebase.database().ref('games');
    dbRef.on('value', (snapshot) => {
      const gamesData = snapshot.val();
      const gamesList = [];
      for (let id in gamesData) {
        gamesList.push({ id, ...gamesData[id] });
      }
      setGames(gamesList);
    });
  }, []);

  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>
          <h2>{game.title}</h2>
          <p>{game.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Games;