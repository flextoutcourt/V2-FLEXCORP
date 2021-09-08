import React, { Component } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';

export default function Asc301({auth, errors}){

    function content() {
        return (
        <div>
            Ascenseur 301
        </div>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Projets Ascenseur 301</h2>}
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