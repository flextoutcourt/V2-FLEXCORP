import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';
import Flex3d from '@/Components/Flex3d';
import LanguageSlider from '@/Components/LanguageSlider';

export default function Home({auth, errors}){

    function content() {
        return (
            <div className="w-full">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 p-4 bg-gray-800 rounded-xl shadow-lg">
                        <h3 className="text-2xl text-white">PUTAIN CA MARCHE J'SUIS TROP CONTENT</h3>
                        <Flex3d />
                    </div>
                    <div className="w-full md:w-2/3 p-4 bg-gray-800 rounded-xl shadow-lg">
                        <h3 className="text-2xl text-white">Les langages que j'utilise</h3>
                        <LanguageSlider className="mx-auto" />
                    </div>
                </div>
            </div>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Bienvenue !</h2>}
            >
                {content()}
            </Authenticated>
        )
    }else{
        return (
            <Guest
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Bienvenue !</h2>}
            >
                {content()}
            </Guest>
        )
    }

}