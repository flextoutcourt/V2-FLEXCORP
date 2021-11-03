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
        console.log(e);
        // return Modal(JSON.parse(message.medias)[e.target.dataset.item]);
    }

    return (
        
        (message.user
        ?
            (auth.user.id === message.user_id 
            ?
                <div className="bg-gray-800 rounded-xl rounded-br-none self-end md:max-w-xl md:w-auto w-full text-gray-100 p-4 my-2 message-gradient" id={message.id}>
                    <div className="flex justify-end items-center w-full">
                        <h3 className="text-xl mr-2">{auth.user.name}</h3>
                        {
                            auth?.user?.avatar
                            ?
                            <div className="h-8 w-8 object-cover rounded-md shadow-lg" style={{backgroundImage: `url(${auth?.user?.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}>

                            </div>
                            :
                            <div className="h-8 w-8 object-cover rounded-md shadow-lg" style={{backgroundImage: `url(/users/default.svg)`, backgroundSize: 'cover', backgroundPosition: 'center center'}}>

                            </div>
                        }
                    </div>
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
                                                <img data-item={key} src={item.content} alt="" className="rounded-lg w-full h-24 object-cover md:w-full md:h-full" />
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
                <div className="bg-gray-200 rounded-xl rounded-bl-none self-start md:max-w-xl w-full text-gray-900 p-4 my-2 message-gradient" id={message.id}>
                    <div className="flex justify-start items-center text-gray-900">

                        <div className="h-8 w-8 object-cover rounded-md shadow-lg" style={{backgroundImage: message?.user[0]?.avatar != null ? `url(${message?.user[0]?.avatar})` : 'url(/users/default.svg)', backgroundSize: 'cover', backgroundPosition: 'center center'}}>

                        </div>
                        <h3 className="text-xl ml-2">{message.user[0].name ?? message.user.name}</h3>
                    </div>
                    <p className="my-2 text-gray-900">
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
                                                <img data-item={key} src={item.content} alt="" className="rounded-lg w-full h-24 object-cover md:w-full md:h-full" />
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
                <div className="bg-gray-800 rounded-xl rounded-br-none self-end md:max-w-xl text-gray-100 p-4 my-2 message-gradient" id={message.id}>
                    <div className="flex justify-end items-center">
                        <h3 className="text-xl mr-2">{message.auth.name}</h3>
                        <div className="h-8 w-8 object-cover rounded-md shadow-xl" style={{backgroundImage: message?.auth?.avatar != null ? `url(${message?.auth?.avatar}` : 'url(/users/default.svg)', backgroundSize: 'cover', backgroundPosition: 'center center' }}>

                        </div>
                    </div>
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
                                                <img data-item={key} src={item.content} alt="" className="rounded-lg w-full h-24 object-cover md:w-full md:h-full" />
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
                <div className="bg-gray-100 rounded-xl rounded-bl-none self-start max-w-2xl text-gray-900 p-4 my-2 message-gradient" id={message.id}>
                    <div className="flex justify-start items-center text-gray-900">
                        <div className="h-8 w-8 object-cover rounded-md shadow-lg" style={{backgroundImage: message?.auth?.avatar != null ? `url(${message?.auth?.avatar})` : 'url(/users/default.svg)', backgroundSize: 'cover', backgroundPosition: 'center center'}}>

                        </div>
                        <h3 className="text-xl ml-2">{message.auth.name}</h3>
                    </div>
                    <p className="my-2 text-gray-900">
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
                                    <div className="relative w-full max-h-80 md:h-64 lg:h-44 bg-white p-2">
                                        <img src={message.link_preview.images[0]}
                                            alt={message.link_preview.description}
                                            className="w-full h-full object-cover"/>
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
                                                <img data-item={key} src={item.content} alt="" className="rounded-lg w-full h-24 object-cover md:w-full md:h-full" />
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