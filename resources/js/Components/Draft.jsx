import React from 'react';
import moment from 'moment'
import { InertiaLink } from '@inertiajs/inertia-react';

const Draft = (item) => {

    return (
        <div className="bg-gray-800 shadow-lg rounded-lg w-1/3 p-4">
            <h3 className="text-lg text-white">Brouillon du : {moment(item.item.updated_at).format('DD/MM/YYYY à hh:mm')}</h3>
            <InertiaLink href={route('actus.draft.edit', {id: item.item})} as="a" className="bg-indigo-500 py-2 px-4 rounded-lg shadow-lg text-white mt-2" >Modifier</InertiaLink>
        </div>
    );
}

export default Draft;
