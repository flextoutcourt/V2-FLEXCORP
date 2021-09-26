import Authenticated from '@/Layouts/Authenticated';
import React, { Component, useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import { useForm } from '@inertiajs/inertia-react';
import ValidationErrors from '@/Components/ValidationErrors';
import Spinner from '@/Components/Spinner';

export default function EditPicture({auth, status, canResetPassword}){

    const { data, setData, post, processing, errors, reset } = useForm({
        illustration: ''
    });

    const onHandleFileUpload = (event) => {
        setData('illustration', event.target.files[0]);
    }

    const submit = async (event) => {
        event.preventDefault();
        // debugger;
        post(route('user.update_photo'));
    };

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Modification : {auth.user.name}</h2>}
        >
            <ValidationErrors errors={errors} visible={true} />
            <form onSubmit={submit}>
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
                <div className="mt-4">
                    <Button processing={processing}>
                        Modifier ces informations
                    </Button>
                </div>
            </form>
        </Authenticated>
    )

}   
