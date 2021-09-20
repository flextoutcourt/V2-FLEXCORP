import React, { Component, useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';

const Index = ({auth, errors}) => {

    let content = () => {
        return (
            <div className="grid grid-cols-3 gap-4">
                <a href={route('admin.realisations.add')} className="bg-gray-800 py-2 px-4 rounded-md shadow-lg">
                    Ajouter une réalisation
                </a>
                <a href={route('admin.projects.add')} className="bg-gray-800 py-2 px-4 rounded-md shadow-lg">
                    Ajouter un projet
                </a>
            </div>
        )
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Ajouter une réalisation</h2>}
        >
            {content()}
        </Authenticated>
    )
}

export default Index;
