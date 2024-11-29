import React, {useEffect} from 'react';
import * as deck from '@letele/playing-cards';
import ReactFlipCard from 'reactjs-flip-card';
import { create } from "zustand";

// Store de gestion de l'état du jeu
const useDeckStore = create((set) => ({
  deckJoueur: [],
  deckOrdi: [],
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
    console.log('Deck Joueur:', shuffledDeck.slice(0, 26));
    console.log('Deck Ordi:', shuffledDeck.slice(26, 52));
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
      const carteJoueur = state.deckJoueur[0];  
      return {
        carteJoueur: carteJoueur,  
      };
    }),
  setcarteOrdi: () =>
    set((state) => {
      const carteOrdi = state.deckOrdi[0];  
      return {
        carteOrdi: carteOrdi,  
      };
    })
}));

const containerStyle = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
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

const Deck = () => {
  const { deckJoueur, game, deckOrdi, carteJoueur, carteOrdi, distribution, setgame, setcarteJoueur, setcarteOrdi } = useDeckStore();

  const CardBack = deck['B2']; 

  const handleSetCarteJoueur = () => {
    setcarteJoueur(); 
  };

  const handleSetCarteOrdi = () => {
    setcarteOrdi(); 
  };

  useEffect(() => {
    distribution();
  }, []); 
  const CarteJoueur = carteJoueur ? deck[carteJoueur] : null;
  const CarteOrdi = carteOrdi ? deck[carteOrdi] : null;
 



  return (
    <>
      <div style={containerStyle}>
        <div style={{
          ...cardContainerStyle,
          top: '20px',
          left: '300px',
        }}>
          <ReactFlipCard
            frontComponent={game ? <CarteJoueur style={{ width: '100%', height: '100%' }} /> : <CardBack style={{ width: '100%', height: '100%' }} />}
            backComponent={game ? <CarteOrdi style={{ width: '100%', height: '100%' }} /> : <CardBack style={{ width: '100%', height: '100%' }} />}
            containerStyle={cardContainerStyle}
            flipCardStyle={{}}
            frontStyle={frontStyle}
            backStyle={frontBackStyle} />
        </div>

        <div style={{
          ...cardContainerStyle,
          bottom: '20px',
          right: '20px',
        }}>
          <ReactFlipCard
            frontComponent={game ? <CarteOrdi style={{ width: '100%', height: '100%' }} /> : <CardBack style={{ width: '100%', height: '100%' }} />}
            backComponent={game ? <CarteJoueur style={{ width: '100%', height: '100%' }} /> : <CardBack style={{ width: '100%', height: '100%' }} />}
            containerStyle={cardContainerStyle}
            flipCardStyle={{}}
            frontStyle={frontStyle}
            backStyle={frontBackStyle} />
        </div>
      </div>

      <button
        onClick={() => {
          setgame();
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
        Start/Stop Game
      </button>
    </>
  );
}

export default Deck;
