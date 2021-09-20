import React, { Component, useState, useEffect } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';

export default function Perso({auth, errors}){

    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        _get_projects().then(data => setProjects(data));
    }, []);

    async function _get_projects(){
        const promise = axios.get(route('api.get_projects', {id: 2}));
        const responseData = promise.then((data) => data.data);
        return responseData;
    }

    function content() {
        return (
        <div>
            {projects.map((item, key) => (
                <div key={key} className="relative flex justify-between align-middle gap-4 bg-gray-800 rounded-md shadow-lg">
                    <div className="w-1/4 rounded-md shadow-lg overflow-hidden">
                        <img src={"/"+item.illustration} alt="" className="transform hover:scale-105 duration-200" />
                    </div>
                    <div className="w-3/4 p-2">
                        <p className="text-4xl uppercase text-white">
                            {item.title}
                        </p>
                        <hr className="my-4" />
                        <p className="capitalize text-white">
                            {item.description.substr(0, 100)}
                        </p>
                        <a href={route('project.show', {project: item})} className="bg-indigo-500 text-white py-2 px-4 rounded-md shadow-lg absolute bottom-4 right-4">
                            Voir le projet
                        </a>
                    </div>
                </div>
            ))}
        </div>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Projets Personnels</h2>}
            >
                {content()}
            </Authenticated>
        )
    }else{
        return (
            <Guest
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Dashboard</h2>}
            >
                {content()}
            </Guest>
        )
    }

}