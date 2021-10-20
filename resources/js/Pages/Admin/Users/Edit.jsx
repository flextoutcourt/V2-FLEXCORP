import React, { Component, useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

const Index = ({auth, user}) => {

    const [users, setUsers] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
    });


    useEffect(() => {
        _get_users().then(val => setUsers(val));
    }, []);

    async function _get_users(){
        const promise = axios.get(route('api.get_users'));
        const responseData = promise.then(data => data.data);
        return responseData;
    }

    const onHandleSubmit = e => {
        e.preventDefault();
        alert(`vous allez modifier l'utilisateur ${user.id}`)
        //edition d'utilisateur
    }

    const onHandleChange = e => {
        e.preventDefault();
    }

    let content = () => {
        return(
            <div>
                <form method="post" onSubmit={onHandleSubmit} >
                    <div>
                        <Label forInput="email" value="Email" />

                        <Input
                            type="text"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                    </div>
                    <div>
                        <Label forInput="name" value="Nom Prénom" />

                        <Input
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                    </div>
                    <input type="submit" />
                </form>
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
