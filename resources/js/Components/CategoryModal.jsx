import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Input from './Input';
import Label from './Label';

import { useForm } from '@inertiajs/inertia-react';
import Button from './Button';
import axios from 'axios';
import Alert from './Alert';
import { toast } from 'react-toastify';

export default function CategoryModal({label}) {

    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false)
    const [newCategory, setNewCategory] = useState(true);
    const [alerts, setAlerts] = useState({
        message: '',
        status: ''
    });

    useEffect(() => {
        _get_categories().then(data => setCategories(data));
    }, []);

    async function _get_categories(){
        const promise = axios.get(route('api.get_categories'));
        const responseData = promise.then((data) => data.data);
        return responseData;
    }

    async function _set_category(){
        const promise = axios.post(route('api.set_category'), fd);
        const responseData = promise.then((data) => data.data);
        return responseData;
    }

    const { data, setData, post, processing, errors, reset } = useForm({
            title: '',
            description: '',
            illustration: [],
        });

    const cancelButtonRef = useRef(null);

    const submit = async (event) => {
        event.preventDefault();
        let fd = new FormData();
        fd.append('title', data.title);
        fd.append('description', data.description);
        fd.append('illustration', data.illustration ?? null);
        post(route('api.set_category'), {
            preserveScroll: true,
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
        console.log(errors);
    }


    const onHandleChange = (event) => {
            setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const onHandleFileUpload = (event) => {
            setData('illustration', event.target.files);
    }

    const onSelectChange = (event) => {
        console.log(event.target.value);
        if(event.target.value == 0){
            setNewCategory(true);
        }else{
            setNewCategory(false);
        }
    }

    let content = () => {
        return (
            <form onSubmit={submit} encType='multipart/formdata'>
                <div>
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
                    <Label forInput="description" value="description" />
                    <Input
                    type="text"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    autoComplete="description"
                    isFocused={false}
                    handleChange={onHandleChange}
                />
                </div>
                <div className="mb-3">
                    <div className="flex w-full items-center justify-center bg-grey-lighter">
                        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-indigo-500 hover:text-white duration-200">
                            <i className="fas fa-plus"/>
                            <span className="mt-2 text-base leading-normal text-center">Choisissez une illustration</span>
                            <input type="file" name="illustration" id="illustration" placeholder="illustration" onChange={onHandleFileUpload} className="hidden" />
                        </label>
                    </div>
                </div>
                <div className="mt-4">
                    <Button processing={processing}>
                        Modifier ces informations
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="bg-indigo-500 py-2 px-4 rounded-md text-white">{label}</button>
            {
                (alerts
                ?
                    (alerts.length > 0
                    ?
                        alerts.map((item, key) => {
                            <Alert key={key} color={item.status == 200 ? 'green' : 'red'}>{item.message}</Alert>
                        })
                    :
                        null
                    )
                    
                :
                    null
                )
            }
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                <i className="fas fa-plus text-indigo-500"></i>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                Ajouter une catégorie
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div className="text-sm text-gray-500">
                                        {
                                            (categories
                                            ?
                                                (categories.length > 0
                                                ?
                                                    <>
                                                        <select onChange={onSelectChange} className="w-full rounded-sm border border-indigo-500 focus:outline-none">
                                                            <option value={0} selected>Nouvelle catégorie</option>
                                                            {categories.map((item, key) => (   
                                                                <option value={item.id} key={key}>{item.title}</option>
                                                            ))}
                                                        </select>
                                                        {
                                                            newCategory
                                                            ?
                                                                <>
                                                                    <hr className="my-4"/>
                                                                    <h3>Nouvelle catégorie</h3>
                                                                    {content()}
                                                                </>
                                                            :
                                                            <></>
                                                        }
                                                    </> 
                                                :
                                                    content()
                                                )
                                            :
                                                content()
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            >
                            Annuler
                            </button>
                        </div>
                        </div>
                    </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            </>
    )
}
