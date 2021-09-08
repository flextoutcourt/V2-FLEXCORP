import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';

export default function Home({auth, errors}){

    function content() {
        return (
            <div>
                test
            </div>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
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