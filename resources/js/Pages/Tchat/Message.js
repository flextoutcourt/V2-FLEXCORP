import {Fragment, useRef, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react';

import parse from 'html-react-parser';
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierSavannaDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import replace from 'string-replace-to-array';

export default function Message ({message, auth}){

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(null);
    const cancelButtonRef = useRef(null);

    const regexMentions = new RegExp(`\@([a-zA-Z0-9_:/.]+)*`, 'i');
    const strMentions = message.message;
    const substMentions = `<a href="/user/$1">@$1</a>`;

    message.message = strMentions.replace(regexMentions, substMentions);

    const regex = new RegExp(`\#([a-zA-Z0-9_:/.]+)*`, 'i');
    const str = message.message; 
    const subst = `<a href="$1">$1</a>`;
    message.message = str.replace(regex, subst);
    
    const regexCode = /\`\`\`(\w*)?((?:\n)?(?:(.*)(?:\n)?)*?(?:\n)?)\`\`\`/gm
    const strCode = message.message;
    
    const substCode = `$2`;
    
    message.code = [];
    strCode.replace(regexCode, (e, p1, p2) => {
        message.langage = p1;
        message.code.push(p2);
    });
    message.texte = message.message.replace(regexCode, '');
    // console.log(message.code);
    
    const OpenLightBox = (e) => {
        e.preventDefault();
        setOpen(true);
        setContent('html');
        // return Modal(JSON.parse(message.medias)[e.target.dataset.item]);
    }


    
    const Modal = (item) => {
        <>
            <button onClick={() => setOpen(true)} className="bg-indigo-500 py-2 px-4 rounded-md text-white"></button>
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
                                {content}
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
    }

    return (
        (message.user
        ?
            (auth.user.id === message.user_id 
            ?
                <div className="bg-gray-800 rounded-xl rounded-br-none self-end max-w-2xl text-gray-100 p-4 my-2 message-gradient" id={message.id}>
                    <h3 className="text-xl">{auth.user.name}</h3>
                    <p className="my-2">
                        {parse(message.texte)}
                    </p>
                    {
                        message.code.length > 0
                        ?
                            <SyntaxHighlighter language={message.language} style={atelierSavannaDark} className="rounded-md shadow-lg" showLineNumbers>
                                {message.code}
                            </SyntaxHighlighter>
                        :
                            null
                    }
                    {message.link_preview
                        ?
                            <div className="w-full">
                                <article className=" mx-auto bg-transparent group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 md:max-w-lg max-w-sm">
                                    <div className="relative w-full h-80 md:h-64 lg:h-44 bg-white p-2">
                                        <img src={message.link_preview.images[0]}
                                            alt={message.link_preview.description}
                                            className="w-full h-full object-center object-cover"/>
                                    </div>
                                    <div className="px-3 py-4 border border-indigo-500 border-t-0 rounded-lg rounded-t-none">
                                        <h3 className="text-sm text-white pb-2">
                                            <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href={message.link_preview.url} target="_blank">
                                                <span className="absolute inset-0"></span>
                                                {message.link_preview.title}
                                            </a>
                                        </h3>
                                        <p className="text-base font-semibold text-white">
                                            {message.link_preview.description}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        :
                            null
                    }
                    {
                        JSON.parse(message.medias)
                        ?
                            JSON.parse(message.medias).length > 0
                            ?
                                <div className={`grid grid-cols-${JSON.parse(message.medias).length < 4 ? JSON.parse(message.medias).length : JSON.parse(message.medias).length == 4 ? 2 : 3} gap-1`}>

                                    {JSON.parse(message.medias).map((item, key) => (
                                        item.type == 'img'
                                        ?
                                            <button onClick={OpenLightBox} key={key}>
                                                <div data-item={key} className="rounded-lg w-48 h-48" style={{backgroundImage: `url(${item.content})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
                                            </button>
                                        :
                                            <video key={key} src={item.content} controls className="rounded-lg" poster={item.thumb ?? null} preload='none'></video>
                                    ))}
                                </div>
                            :
                                null
                        :
                        null
                    }
                </div>
            :
                <div className="bg-gray-800 rounded-xl rounded-bl-none self-start max-w-2xl text-gray-100 p-4 my-2 message-gradient" id={message.id}>
                    <h3 className="text-xl">{message.user[0].name ?? message.user.name}</h3>
                    <p className="my-2">
                        {parse(message.texte)}
                    </p>
                    {
                        message.code.length > 0
                        ?
                            <SyntaxHighlighter language={message.language} style={atelierSavannaDark} className="rounded-md shadow-lg" showLineNumbers>
                                {message.code}
                            </SyntaxHighlighter>
                        :
                            null
                    }
                    {message.link_preview
                        ?
                            <div className="w-full">
                                <article className=" mx-auto bg-transparent group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 md:max-w-lg max-w-sm">
                                    <div className="relative w-full h-80 md:h-64 lg:h-44 bg-white p-2">
                                        <img src={message.link_preview.images[0]}
                                            alt={message.link_preview.description}
                                            className="w-full h-full object-center object-cover"/>
                                    </div>
                                    <div className="px-3 py-4 border border-indigo-500 border-t-0 rounded-lg rounded-t-none">
                                        <h3 className="text-sm text-white pb-2">
                                            <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href={message.link_preview.url} target="_blank">
                                                <span className="absolute inset-0"></span>
                                                {message.link_preview.title}
                                            </a>
                                        </h3>
                                        <p className="text-base font-semibold text-white">
                                            {message.link_preview.description}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        :
                            null
                    }
                    {
                        JSON.parse(message.medias)
                        ?
                            JSON.parse(message.medias).length > 0
                            ?
                                <div className={`grid grid-cols-${JSON.parse(message.medias).length < 4 ? JSON.parse(message.medias).length : JSON.parse(message.medias).length == 4 ? 2 : 3} gap-1`}>

                                    {JSON.parse(message.medias).map((item, key) => (
                                        item.type == 'img'
                                        ?
                                            <button onClick={OpenLightBox} key={key}>
                                                <div data-item={key} className="rounded-lg w-48 h-48" style={{backgroundImage: `url(${item.content})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
                                            </button>
                                        :
                                            <video key={key} src={item.content} controls className="rounded-lg" poster={item.thumb ?? null} preload='none'></video>
                                    ))}
                                </div>
                            :
                                null
                        :
                        null
                    }
                </div>
            )
        :
            (message.auth.id === auth.user.id)
            ?  
                <div className="bg-gray-800 rounded-xl rounded-br-none self-end max-w-2xl text-gray-100 p-4 my-2 message-gradient" id={message.id}>
                    <h3 className="text-xl">{message.auth.name}</h3>
                    <p className="my-2">
                        {parse(message.texte)}
                    </p>
                    {
                        message.code.length > 0
                        ?
                            <SyntaxHighlighter language={message.language} style={atelierSavannaDark} className="rounded-md shadow-lg" showLineNumbers>
                                {message.code}
                            </SyntaxHighlighter>
                        :
                            null
                    }
                    {message.link_preview
                        ?
                            <div className="w-full">
                                <article className=" mx-auto bg-transparent group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 md:max-w-lg max-w-sm">
                                    <div className="relative w-full h-80 md:h-64 lg:h-44 bg-white p-2">
                                        <img src={JSON.parse(message.link_preview).images[0]}
                                            alt={JSON.parse(message.link_preview).description}
                                            className="w-full h-full object-center object-cover"/>
                                    </div>
                                    <div className="px-3 py-4 border border-indigo-500 border-t-0 rounded-lg rounded-t-none">
                                        <h3 className="text-sm text-white pb-2">
                                            <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href={JSON.parse(message.link_preview).url} target="_blank">
                                                <span className="absolute inset-0"></span>
                                                {JSON.parse(message.link_preview).title}
                                            </a>
                                        </h3>
                                        <p className="text-base font-semibold text-white">
                                            {JSON.parse(message.link_preview).description}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        :
                            null
                    }
                    {
                        JSON.parse(message.medias)
                        ?
                            JSON.parse(message.medias).length > 0
                            ?
                                <div className={`grid grid-cols-${JSON.parse(message.medias).length < 4 ? JSON.parse(message.medias).length : JSON.parse(message.medias).length == 4 ? 2 : 3} gap-1`}>

                                    {JSON.parse(message.medias).map((item, key) => (
                                        item.type == 'img'
                                        ?
                                            <button onClick={OpenLightBox} key={key}>
                                                <div data-item={key} className="rounded-lg w-48 h-48" style={{backgroundImage: `url(${item.content})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
                                            </button>
                                        :
                                            <video key={key} src={item.content} controls className="rounded-lg" poster={item.thumb ?? null} preload='none'></video>
                                    ))}
                                </div>
                            :
                                null
                        :
                        null
                    }
                </div>
            :
                <div className="bg-gray-800 rounded-xl rounded-bl-none self-start max-w-2xl text-gray-100 p-4 my-2 message-gradient" id={message.id}>
                    <h3 className="text-xl">{message.auth.name}</h3>
                    <p className="my-2">
                        {parse(message.texte)}
                    </p>
                    {
                        message.code.length > 0
                        ?
                            <SyntaxHighlighter language={message.language} style={atelierSavannaDark} className="rounded-md shadow-lg" showLineNumbers>
                                {message.code}
                            </SyntaxHighlighter>
                        :
                            null
                    }
                    {message.link_preview
                        ?
                            <div className="w-full">
                                <article className=" mx-auto bg-transparent group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 md:max-w-lg max-w-sm">
                                    <div className="relative w-full h-80 md:h-64 lg:h-44 bg-white p-2">
                                        <img src={message.link_preview.images[0]}
                                            alt={message.link_preview.description}
                                            className="w-full h-full object-center object-cover"/>
                                    </div>
                                    <div className="px-3 py-4 border border-indigo-500 border-t-0 rounded-lg rounded-t-none">
                                        <h3 className="text-sm text-white pb-2">
                                            <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href={message.link_preview.url} target="_blank">
                                                <span className="absolute inset-0"></span>
                                                {message.link_preview.title}
                                            </a>
                                        </h3>
                                        <p className="text-base font-semibold text-white">
                                            {message.link_preview.description}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        :
                            null
                    }
                    {
                        JSON.parse(message.medias)
                        ?
                            JSON.parse(message.medias).length > 0
                            ?
                                <div className={`grid grid-cols-${JSON.parse(message.medias).length < 4 ? JSON.parse(message.medias).length : JSON.parse(message.medias).length == 4 ? 2 : 3} gap-1`}>

                                    {JSON.parse(message.medias).map((item, key) => (
                                        item.type == 'img'
                                        ?
                                            <button onClick={OpenLightBox} key={key}>
                                                <div data-item={key} className="rounded-lg w-48 h-48" style={{backgroundImage: `url(${item.content})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
                                            </button>
                                        :
                                            <video key={key} src={item.content} controls className="rounded-lg" poster={item.thumb ?? null} preload='none'></video>
                                    ))}
                                </div>
                            :
                                null
                        :
                        null
                    }
                </div>
        )
    )
}