import React, { Component, useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';

const Index = ({auth, errors}) => {

    let content = () => {
        return (
            <div className="grid grid-cols-3 gap-4">
                <a href={route('admin.realisation.add')} className="bg-gray-800 py-2 px-4 rounded-md shadow-lg">
                    Ajouter une réalisation
                </a>
                <a href={route('admin.project.add')} className="bg-gray-800 py-2 px-4 rounded-md shadow-lg">
                    Ajouter un projet
                </a>
                <a href={route('admin.user.list')} className="bg-gray-800 py-2 px-4 rounded-md shadow-lg">
                    Liste des utilisateurs
                </a>
            </div>
        )
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Administration</h2>}
        >
            {content()}
        </Authenticated>
    )
}

export default Index;
