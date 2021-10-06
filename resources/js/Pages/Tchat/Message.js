import parse from 'html-react-parser';
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierSavannaDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import replace from 'string-replace-to-array';

export default function Message ({message, auth}){

    const regexMentions = new RegExp(`\@([a-zA-Z0-9_:/.]+)*`, 'i');
    const strMentions = message.message;
    const substMentions = `<a href="/user/$1">@$1</a>`;

    message.message = strMentions.replace(regexMentions, substMentions);

    const regex = new RegExp(`\#([a-zA-Z0-9_:/.]+)*`, 'i');
    const str = message.message; 
    const subst = `<a href="$1">$1</a>`;
    message.message = str.replace(regex, subst);

    const regexCode = /\`\`\`((?:\n)?(?:(.*)(?:\n)?)*?(?:\n)?)\`\`\`/gm
    const strCode = message.message;
    const substCode = `<code className="bg-black mt-2 text-white p-2 block rounded-sm">$1</code>`;

    message.message = strCode.replace(regexCode, substCode)
    
    return (
        (message.user
        ?
            (auth.user.id === message.user_id 
            ?
                <div className="bg-gray-800 rounded-xl rounded-br-none self-end max-w-2xl text-gray-100 p-4 my-2 message-gradient" id={message.id}>
                    <h3 className="text-xl">{auth.user.name}</h3>
                    <p className="my-2">
                        {parse(message.message)}
                    </p>
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
                                            <div key={key} className="rounded-lg w-48 h-48" style={{backgroundImage: `url(${item.content})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
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
                        {message.message}
                    </p>
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
                                            <div key={key} className="rounded-lg w-48 h-48" style={{backgroundImage: `url(${item.content})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
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
                        {message.message}
                    </p>
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
                                            <div key={key} className="rounded-lg w-48 h-48" style={{backgroundImage: `url(${item.content})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
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
                        {message.message}
                    </p>
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
                                            <div key={key} className="rounded-lg w-48 h-48" style={{backgroundImage: `url(${item.content})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}></div>
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