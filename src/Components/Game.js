import React, { useEffect, useState } from 'react';
import * as deck from '@letele/playing-cards';
import ReactFlipCard from 'reactjs-flip-card';
import { create } from "zustand";

function extractAndConvertValue(cardString) {
  if(cardString=="SvgJ1"){
    return 14;
  }else if(cardString=="SvgJ2"){
    return 14;
  }
  const last = cardString.slice(-1).toLowerCase(); 

  const value = {
    'j': 11,
    'q': 12,
    'k': 13,
    'a': 14,
  };
   
  if (!isNaN(last)) {
    return parseInt(last, 10);  
  } 
  else if (value[last] !== undefined) {
    return value[last];
  } 
  else {
    return null;
  }
}

const useDeckStore = create((set) => ({
  deckJoueur: [],
  deckOrdi: [],
  indexJoueur: 0,
  indexOrdi: 0,
  carteJoueur: "",
  carteOrdi: "",
  game: false,
  distribution: () => {
    const jeu = Object.keys(deck).map(key => deck[key]);

    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
      return array;
    }

    const shuffledDeck = shuffle([...jeu]);

    set({
      deckJoueur: shuffledDeck.slice(0, 26),
      deckOrdi: shuffledDeck.slice(26, 52),
    });
  },
  setgame: () =>
    set((state) => {
      const newGameState = !state.game;
      if (newGameState) {
        state.distribution();
      } else {
        state.distribution();
      }
      return { game: newGameState };
    }),

  setcarteJoueur: () =>
    set((state) => {
      const indexJoueur = state.indexJoueur;
      if (indexJoueur < state.deckJoueur.length) {
        const carteJoueur = state.deckJoueur[indexJoueur].name; 
        return {
          carteJoueur: carteJoueur, 
          indexJoueur: indexJoueur + 1, 
        };
      }
      return state; 
    }),

  
  setcarteOrdi: () =>
    set((state) => {
      const indexOrdi = state.indexOrdi;
      if (indexOrdi < state.deckOrdi.length) {
        const carteOrdi = state.deckOrdi[indexOrdi].name; 
        return {
          carteOrdi: carteOrdi, 
          indexOrdi: indexOrdi + 1,  
        };
      }
      return state;  
    }),
}));

const containerStyle = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: '#006400',
  backgroundImage: 'radial-gradient(circle, rgba(0, 80, 0, 0.15) 1px, transparent 1px)', 
  backgroundSize: '20px 20px', 
};

const cardContainerStyle = {
  position: 'absolute',
  transform: 'translateX(-50%)',
  width: '160px',
  height: '224px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const frontBackStyle = {
  width: '100%',
  height: '100%',
};

const frontStyle = {
  width: '100%',
  height: '100%',
};

const Game = () => {
  const { deckJoueur, game, deckOrdi, carteJoueur, carteOrdi, distribution, setgame, setcarteJoueur, setcarteOrdi, indexJoueur, indexOrdi } = useDeckStore();
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    if (!game) {
      distribution(); 
    }
  }, [game, distribution]);

  useEffect(() => {
    if (deckJoueur.length > 0 && deckOrdi.length > 0) {
      setcarteJoueur(); 
      setcarteOrdi();
    }
  }, [deckJoueur, deckOrdi, setcarteJoueur, setcarteOrdi]);

  const CardFrontJoueur = deckJoueur.length > 0 ? deck[deckJoueur[indexJoueur].name.slice(-2)] : ''; 
  const CardFrontOrdi = deckOrdi.length > 0 ? deck[deckOrdi[indexOrdi].name.slice(-2)] : '';
  const CardBack = deck['B2']; 

  const comparerCartes = () => {
    const valeurCarteJoueur = extractAndConvertValue(carteJoueur);
    const valeurCarteOrdi = extractAndConvertValue(carteOrdi);

    if (valeurCarteJoueur > valeurCarteOrdi) {
      setResultMessage('Joueur gagne');
    } else if (valeurCarteJoueur < valeurCarteOrdi) {
      setResultMessage('Ordi gagne');
    } else {
      setResultMessage('Égalité');
    }
  };

  return (
    <>
      <div style={containerStyle}>
        {resultMessage && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '20px',
            borderRadius: '10px',
          }}>
            {resultMessage}
          </div>
        )}

        <div style={{
          ...cardContainerStyle,
          top: '20px',
          left: '300px',
        }}>
          <ReactFlipCard
            frontComponent={game ? <CardFrontJoueur style={{ width: '100%', height: '100%' }} /> : <CardBack />}
            backComponent={game ? <div>{carteOrdi}</div> : null}
            containerStyle={cardContainerStyle}
            flipCardStyle={{}}
            frontStyle={frontStyle}
            backStyle={frontBackStyle} />
          <div style={{
            position: 'absolute',
            top: '230px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'black',
          }}>
            Ordi
          </div>
        </div>

        <div style={{
          ...cardContainerStyle,
          bottom: '150px',
          right: '20px',
        }}>
          <ReactFlipCard
            frontComponent={game ? <CardFrontOrdi style={{ width: '100%', height: '100%' }} /> : <CardBack />}
            backComponent={game ? <div>{carteJoueur}</div> : null} 
            containerStyle={cardContainerStyle}
            flipCardStyle={{}}
            frontStyle={frontStyle}
            backStyle={frontBackStyle} />
          <div style={{
            position: 'absolute',
            top: '230px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'black',
          }}>
            Joueur
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setcarteJoueur(); 
          setcarteOrdi(); 
          setgame(); 
          comparerCartes(); 
        }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Play
      </button>
    </>
  );
}

export default Game;
