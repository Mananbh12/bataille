import React, { useEffect } from 'react';
import * as deck from '@letele/playing-cards'; 
import ReactFlipCard from 'reactjs-flip-card';
import { create } from "zustand";

// Composant pour gérer les decks des 2 joueurs

const useDeckStore = create((set) => ({
  deckJoueur: [],
  deckOrdi: [],
  distribution: () => {
    const jeu = Object.keys(deck).map(key => deck[key]);
    
    function shuffle(array) {         //source https://fr.javascript.info/task/shuffle
        array.sort(() => Math.random() - 0.5);
        return array;
    }

    const shuffledDeck = shuffle([...jeu]); 

    set({
      deckJoueur: shuffledDeck.slice(0, 26), 
      deckOrdi: shuffledDeck.slice(26, 52), 
    });
  },
}));

const CardBack = deck['B2']; 

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

// On modifie la taille du svg pour que le rendu soit correct (mis du temps à trouver ça)
const CardBackStyled = () => (
  <CardBack style={{ width: '100%', height: '100%' }} />
);

const Deck = () => {
    const { deckJoueur, deckOrdi, distribution } = useDeckStore();

    useEffect(() => {
        distribution();
    }, [distribution]);

    return (
        <div style={containerStyle}>
          <div style={{ 
            ...cardContainerStyle, 
            top: '20px',           
            left: '300px',          
          }}>
            <ReactFlipCard
              frontComponent={<CardBackStyled />}
              backComponent={<CardBackStyled />}
              containerStyle={cardContainerStyle}  
              flipCardStyle={{}} 
              frontStyle={frontBackStyle}  
              backStyle={frontBackStyle}   
            />
          </div>
    
          
          <div style={{ 
            ...cardContainerStyle, 
            bottom: '20px',       
            right: '20px',         
          }}>
            <ReactFlipCard
              frontComponent={<CardBackStyled />}
              backComponent={<CardBackStyled />}
              containerStyle={cardContainerStyle}  
              flipCardStyle={{}} 
              frontStyle={frontBackStyle}  
              backStyle={frontBackStyle}   
            />
          </div>
        </div>
    );
}

export default Deck;
