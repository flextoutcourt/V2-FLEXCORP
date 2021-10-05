import React from 'react';
import Memory from './Memory';

const Games = () => {

    const games = [
        {
            name: 'memory',
            component: <Memory />
        }
    ]

    const handleModal = (e,component) => {
        e.preventDefault();
        return component;
    }

    return (
        <div className="grid grid-cols-3 w-full gap-2 absolute bottom-0">
            {games.map((item, key) => (
                item.component
            ))}
        </div>
    );
}

export default Games;
