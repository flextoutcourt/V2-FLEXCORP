import React, { Component } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';

const navigation = [
    {
        'name': 'Ascenseur 301',
        'link': "projects.asc301"
    },
    {
        'name': 'Personnels',
        'link': 'projects.perso'
    },
    {
        'name': 'Professionels',
        'link': 'projects.pro'
    }
]

export default function Project_main({auth, errors}){

    function content() {
        return (
            <div className="grid grid-cols-3 gap-4">
                {navigation.map((item, itemIdx) => (
                    <InertiaLink method="get" as="button" href={route(item.link)} key={itemIdx} className="w-full bg-gray-100 rounded-md shadow-md p-4 transform-gpu hover:scale-105 duration-300">
                        {item.name}
                    </InertiaLink>
                ))}
            </div>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Projets</h2>}
            >
                {content()}
            </Authenticated>
        )
    }else{
        return (
            <Guest>
                {content()}
            </Guest>
        )
    }

}