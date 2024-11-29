import React, { useEffect } from 'react';
import * as deck from '@letele/playing-cards'; 
import ReactFlipCard from 'reactjs-flip-card';
import { create } from "zustand";

//Composant pour gérer les decks des 2 joueurs

const useDeckStore = create((set) => ({
  deckJoueur: [],
  deckOrdi: [],
  distribution: () => {
    const jeu = Object.keys(deck).map(key => deck[key]);
    
    function shuffle(array) {               //source https://fr.javascript.info/task/shuffle
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


const Deck = () => {

    const { deckJoueur, deckOrdi, distribution } = useDeckStore();

    useEffect(() => {
        distribution();
      }, [distribution]);    
    

      return (
        <>
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[150px]">
            <ReactFlipCard
              frontComponent={<CardBack />}
              backComponent={<CardBack />}
            />
          </div>
    
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[200px] h-[300px]">
            <ReactFlipCard
              frontComponent={<CardBack />}
              backComponent={<CardBack />}
            />
          </div>
        </>
      );
    }


export default Deck;