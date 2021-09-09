import Authenticated from '@/Layouts/Authenticated';
import React, { Component, useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import { useForm } from '@inertiajs/inertia-react';
import ValidationErrors from '@/Components/ValidationErrors';
import Spinner from '@/Components/Spinner';

export default function Edit({auth, status, canResetPassword}){

    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        password: '',
    });

    function content() {
        return(
            <div>Ceci est du {auth.user.name}</div>
        )
    }

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('user.update'))
    };

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Dashboard</h2>}
        >
            <ValidationErrors errors={errors} visible={true} />
            <form onSubmit={submit}>
                <div>
                    <Label forInput="email" value="Nom" />
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
                <div className="mt-4">
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
                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>
                <div className="mt-4">
                    <Button processing={processing}>
                        Modifier ces informations
                    </Button>
                </div>
            </form>
        </Authenticated>
    )

}   
