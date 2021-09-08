import React, { Component } from 'react'
import Guest from '@/Layouts/Guest';
import { InertiaLink } from '@inertiajs/inertia-react';

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

export default class Project_main extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Guest title="Mes projets">
                <div className="grid grid-cols-3 gap-4">
                    {navigation.map((item, itemIdx) => (
                        <InertiaLink method="get" as="button" href={route(item.link)} key={itemIdx} className="w-full bg-gray-100 rounded-md shadow-md p-4 transform-gpu hover:scale-105 duration-300">
                            {item.name}
                        </InertiaLink>
                    ))}
                </div>
            </Guest>
        )
    }

}