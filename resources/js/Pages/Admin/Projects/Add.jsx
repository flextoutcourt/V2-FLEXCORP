import React, { Component, useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';

import Input from '@/Components/Input';
import Label from '@/Components/Label';
import TextArea from '@/Components/TextArea';
import Button from '@/Components/Button';

import { useForm } from '@inertiajs/inertia-react';
import axios from 'axios';

const Index = ({auth, errors}) => {

    const selectOptions = [
        {
            name: 'Ascenseur 301',
            id: 1
        },
        {
            name: 'Personnels',
            id: 2
        },
        {
            name: 'Professionels',
            id: 3
        },
    ]

    const { data, setData, post, processing, reset } = useForm({
        title: '',
        description: '',
        type: '',
        illustration: null,
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const onHandleFileUpload = (event) => {
        setData('illustration', event.target.files[0]);
    }

    const onHandleSubmit = async (event) => {
        event.preventDefault();
        post(route('api.project.add'));
    }
    

    let content = () => {
        return (
            <form onSubmitCapture={onHandleSubmit}>
                <div className="mb-3">
                    <Label forInput="Title" value="Title" />
                    <Input
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        autoComplete="title"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>
                <div className="mb-3">
                    <Label forInput="type" value="Type de projet"/>
                    <select onChange={onHandleChange} className="w-full rounded-md border border-indigo-500 focus:outline-none" name="type" id="type">
                        <option value={0} >Sélectionnez le type de projet</option>
                        {selectOptions.map((item, key) => (   
                            <option value={item.id} key={key}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <Label forInput="description" value="Description" />
                    <TextArea
                        name="description"
                        value={data.description}
                        className="mt-1 block w-full"
                        autoComplete="description"
                        isFocused={false}
                        handleChange={onHandleChange}
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {
                        data.illustration
                        ?
                            <>
                                {console.log(data.illustration)}
                                <img src={data.illustration.src} alt="" className="w-full" />
                            </>
                        :
                            <div className="mb-3">
                                <Label forInput="illustration" value="Illustration" />
                                <div className="flex w-full h-32 items-center justify-center bg-grey-lighter">
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-indigo-500 hover:text-white duration-200">
                                        <i className="fas fa-plus"/>
                                        <span className="mt-2 text-base leading-normal text-center">Choisissez une illustration</span>
                                        <input type="file" name="illustration" id="illustration" placeholder="illustration" onChange={onHandleFileUpload} className="hidden" />
                                    </label>
                                </div>
                            </div>
                    }
                </div>
                <div className="bm-3">
                    <Button processing={processing}>
                        Ajouter le projet
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Ajouter un projet</h2>}
        >
            {content()}
        </Authenticated>
    )
}

export default Index;
