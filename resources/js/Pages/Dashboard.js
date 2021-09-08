import Authenticated from '@/Layouts/Authenticated';
import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';

export default function Dashboard(props) {

    console.log(props);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <div className="md:flex justify-start gap-4">
                <div className="md:w-1/3 w-full md:mb-0 mb-4 bg-gray-800 text-white shadow-lg px-2 py-4 rounded-lg relative overflow-hidden scrollbar-none">
                    <div className="user relative">
                        <div className="w-full sm:flex border-b-2 border-gray-900 mb-4 pb-2 overflow-auto">
                            <img src="https://picsum.photos/500" alt="Photo de profil de Flex" className="mx-auto sm:mx-0 border-4 border-white rounded-full max-h-24" />
                            <div className="my-auto ml-3">
                                <h3 className="text-xl font-bold text-center sm:text-left">{props.auth.user.name}</h3>
                                <h4 className=" text-center sm:text-left"><a className="hover:text-indigo-500 duration-300 whitespace-pre-wrap" href={"mailto:"+props.auth.user.email}>{props.auth.user.email}</a></h4>
                            </div>
                        </div>
                        <InertiaLink href="#modify" className="my-3 block w-full bg-indigo-500 py-1 px-3 rounded-md text-white hover:bg-indigo-600 cursor-pointer duration-200">
                           Modifier mes informations 
                        </InertiaLink>
                        <InertiaLink href="#modify" className="my-3 block w-full bg-red-500 py-1 px-3 rounded-md text-white hover:bg-red-600 cursor-pointer duration-200">
                           Supprimer mon compte 
                        </InertiaLink>
                        <InertiaLink href="#modify" className="my-3 block w-full bg-indigo-500 py-1 px-3 rounded-md text-white hover:bg-indigo-600 cursor-pointer duration-200">
                           Modifier mes informations 
                        </InertiaLink>
                    </div>
                </div>
                <div className="md:w-2/3 w-full bg-gray-800 text-white shadow-lg px-2 py-4 rounded-lg overflow-hidden">
                    test
                </div>
            </div>
        </Authenticated>
    );
}
