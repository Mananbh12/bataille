import React from "react";
import * as deck from '@letele/playing-cards';
import ReactFlipCard from 'reactjs-flip-card';

const Card = deck['Sq']; 
const CardBack = deck['B2']; 

const styles = {
    card: { height: '100%', width: '100%' }, 
};

const RenderCards = () => {
    return (
        // <div className="card-container" style={{ height: '200px', width: '150px' }}>
        //     <ReactFlipCard
        //         frontStyle={styles.card}
        //         backStyle={styles.card}
        //         frontComponent={<Card />}
        //         backComponent={<CardBack />}
        //     />
        // </div>
        <div></div>
    );
};

export default RenderCards;
