import React from "react";
import * as deck from '@letele/playing-cards';

const Card = deck['Sq'];
const CardBack = deck['B2'];

const RenderCards = () => {
    return (
        <div className="card-container" style={{ height: '200px', width: '150px' }}>
            <Card style={{ height: '100%', width: '100%' }} />
            <CardBack style={{ height: '100%', width: '100%' }} />
        </div>
    );
};

export default RenderCards;
