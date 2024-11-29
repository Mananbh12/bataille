import React, { useEffect, useState } from 'react';
import * as deck from '@letele/playing-cards';
import ReactFlipCard from 'reactjs-flip-card';
import { create } from "zustand";

// Fonction pour extraire et convertir la valeur de la carte
function extractAndConvertValue(cardString) {
  const last = cardString.slice(-1).toLowerCase(); // Récupère le dernier caractère

  // Définir les valeurs des figures (J, Q, K)
  const value = {
    'j': 11,
    'q': 12,
    'k': 13,
    'a': 14,
  };

  // Si le dernier caractère est un chiffre, le retourner directement
  if (!isNaN(last)) {
    return parseInt(last, 10); // Convertir en entier
  } 
  // Si le dernier caractère est une figure (J, Q, K)
  else if (value[last] !== undefined) {
    return value[last];
  } 
  // Si aucune correspondance n'est trouvée, renvoyer null
  else {
    return null;
  }
}

// Store avec Zustand
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

  // Fonction pour mettre à jour la carte du joueur
  setcarteJoueur: () =>
    set((state) => {
      const indexJoueur = state.indexJoueur;
      if (indexJoueur < state.deckJoueur.length) {
        const carteJoueur = state.deckJoueur[indexJoueur].name; // Accède à la propriété 'name' de l'objet
        const valeurCarteJoueur = extractAndConvertValue(carteJoueur); // Applique la fonction pour récupérer la valeur
        return {
          carteJoueur: carteJoueur, // Mise à jour avec le nom de la carte
          indexJoueur: indexJoueur + 1, // Incrémente l'index pour la carte suivante
        };
      }
      return state; // Retourne l'état inchangé si aucune carte n'est disponible
    }),

  // Fonction pour mettre à jour la carte de l'ordinateur
  setcarteOrdi: () =>
    set((state) => {
      const indexOrdi = state.indexOrdi;
      if (indexOrdi < state.deckOrdi.length) {
        const carteOrdi = state.deckOrdi[indexOrdi].name; // Accède à la propriété 'name' de l'objet
        const valeurCarteOrdi = extractAndConvertValue(carteOrdi); // Applique la fonction pour récupérer la valeur
        return {
          carteOrdi: carteOrdi, // Mise à jour avec le nom de la carte
          indexOrdi: indexOrdi + 1, // Incrémente l'index pour la carte suivante
        };
      }
      return state; // Retourne l'état inchangé si aucune carte n'est disponible
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
      distribution(); // Call distribution only when the game is not active
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
  const CardBack = deck['B2']; // Arrière de la carte

  // Comparer les valeurs des cartes et déterminer le gagnant
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
            frontComponent={game ? <CardFrontJoueur style={{ width: '100%', height: '100%' }} /> : <CardBack style={{ width: '100%', height: '100%' }} />}
            backComponent={game ? <div>{carteOrdi}</div> : null}
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
            frontComponent={game ? <CardFrontOrdi style={{ width: '100%', height: '100%' }} /> : <CardBack style={{ width: '100%', height: '100%' }} />}
            backComponent={game ? <div>{carteJoueur}</div> : null} 
            containerStyle={cardContainerStyle}
            flipCardStyle={{}}
            frontStyle={frontStyle}
            backStyle={frontBackStyle} />
        </div>
      </div>

      <button
        onClick={() => {
          setcarteJoueur(); // Charge la carte suivante pour le joueur
          setcarteOrdi(); // Charge la carte suivante pour l'ordinateur
          setgame(); // Bascule l'état du jeu
          comparerCartes(); // Comparer les cartes et afficher le résultat
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
