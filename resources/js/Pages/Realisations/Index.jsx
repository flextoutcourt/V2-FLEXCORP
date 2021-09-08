import React, { Component } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';

export default function Realisations_show({auth, errors}){

    function content(){
        return(
            <div>
                Mes Réalisations
            </div>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Mes réalisations</h2>}
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