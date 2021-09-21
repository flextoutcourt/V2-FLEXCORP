import React, { Component, useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';

import Input from '@/Components/Input';
import Label from '@/Components/Label';
import TextArea from '@/Components/TextArea';
import Button from '@/Components/Button';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5';

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

    const [users, setUsers] = useState([]);
    const [ckEditor, setCkEditor] = useState(null);

    useEffect(() => {
        _get_users().then(data => setUsers(data));
    }, []);

    async function _get_users(){
        const promise = axios.get(route('api.get_users'));
        const responseData = promise.then((data) => data.data);
        return responseData;
    }

    const { data, setData, post, processing, reset } = useForm({
        title: '',
        type: '',
        description: '',
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
        setData('description', ckEditor);
        // debugger;
        post(route('api.project.add'));
    }

    const autosave = (editor) => {
        setCkEditor(editor.getData());
    }
    

    let content = () => {
        return (
            <form onSubmitCapture={onHandleSubmit}>
                <div className="mb-3">
                    <Label forInput="title" value="Nom du projet" />
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
                    <CKEditor
                        data={data.description ?? ''}
                        onChange={(event, editor) => {
                            setData('description', editor.getData())
                        }}
                        editor={ ClassicEditor }
                        config={{
                            ckfinder: {
                                uploadUrl: route('api.ckupload'),
                            },
                            // autosave: {
                            //     save(editor) {
                            //         return autosave(editor);
                            //     },
                            //     waitingTime: 500,
                            // },
                            toolbar: {
                                items: [
                                    'heading',
                                    '|',
                                    'bold',
                                    'italic',
                                    'link',
                                    'bulletedList',
                                    'numberedList',
                                    'horizontalLine',
                                    '|',
                                    'fontSize',
                                    'fontColor',
                                    'fontFamily',
                                    'outdent',
                                    'indent',
                                    '|',
                                    'uploadImage',
                                    'imageResize',
                                    'blockQuote',
                                    'codeBlock',
                                    'insertTable',
                                    'mediaEmbed',
                                    'undo',
                                    'redo',
                                    'todoList',
                                ]
                            },
                            // mention: {
                            //     feeds: [
                            //         {
                            //             marker: '@',
                            //             feed: users.name,
                            //             minimumCharacter: 1
                            //         }
                            //     ]
                            // },
                            image: {
                                toolbar: [
                                    'imageStyle:inline',
                                    'imageStyle:block',
                                    'imageStyle:side',
                                    'imageResize',
                                    '|',
                                    'toggleImageCaption',
                                    'imageTextAlternative',
                                ]
                            },
                            table: {
                                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                            },
                            codeBlock: {
                                languages: [
                                    {language: 'css', label: "CSS", class:"css"},
                                    {language: 'javascript', label: "JavaScript", class: "js javascript js-code"},
                                    {language: 'html', label: "HTML", class:"html"},
                                    {language: 'php', label: "PHP", class:'php'},
                                ]
                            }
                        }}
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
