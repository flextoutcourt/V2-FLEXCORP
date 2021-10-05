import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Input from '@/Components/Input';
import Label from '@/Components/Label';

import { useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import axios from 'axios';
import Alert from '@/Components/Alert';
import { toast } from 'react-toastify';

export default function Memory({label}) {

    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false)
    const [newCategory, setNewCategory] = useState(true);

    useEffect(() => {
        setCards(populateCards(11));
    }, []);

    const populateCards = (limit) => {
        let cardsA = [];
        for(let i = 1; i < limit; i++){
            cardsA.push(i);
            cardsA.push(i);
        }
        return cardsA.sort((a, b) => 0.5 - Math.random());
    }

    const cancelButtonRef = useRef(null);

    const [cards, setCards] = useState([]);

    return (
        <>
            <button onClick={(e) =>  {e.preventDefault(); setOpen(true)}} className="bg-indigo-500 py-2 px-4 rounded-md text-white">Memory</button>
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
                                Jouer au Memory
                                </Dialog.Title>
                                <div className="grid grid-cols-5 gap-2">
                                    {
                                        cards.length > 0
                                        ?
                                            cards.map((item, key) => (
                                                <div className="h-24 w-24 bg-indigo-500">
                                                    {item}
                                                </div>
                                            ))
                                        :
                                            null
                                    }
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
