import React, { Component, useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';

export default function Actus   ({auth, errors}){

    const [data, setData] = useState([]);
    
    useEffect(() => {
        _get_actus().then(data => setData(data));
    }, []);
    
    async function _get_actus(){
        const promise = axios.get(route('api.get_actus'));
        const responseData = promise.then((data) => data.data);
        return responseData;
    }

    function content(){
        return(
            <>
                <div className="grid grid-cols-3 gap-4">
                    {
                        (data.actus
                        ?
                            (data.actus.length > 0 
                            ?
                                data.actus.map((item, key) => (
                                    <a href={route('actu.show', {actu: item})} className="bg-gray-800" key={key}>
                                        {item.title}
                                    </a>
                                ))
                            :
                                <p>Aucune actualité a afficher</p>
                            )
                        :
                            <p>Aucune actualité a afficher</p>
                        )
                    }
                </div>
                <a href={route('actus.new')} className="fixed bottom-4 right-4 bg-indigo-500 flex justify-center align-middle rounded-full text-white h-12 w-12 text-xl shadow-lg transform duration-200 hover:scale-110 ring-white ring-2">
                    <i className="fas fa-plus mx-auto my-auto"></i>
                </a>
            </>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Les actus de Flex</h2>}
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