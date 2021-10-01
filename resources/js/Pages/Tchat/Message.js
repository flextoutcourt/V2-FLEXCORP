import parse from 'html-react-parser';

export default function Message ({message, auth}){

    console.log(message);

    // message.response = JSON.parse(message.response);

    return (
        (message.user
        ?
            (auth.user.id === message.user_id 
            ?
                <div className="bg-gray-800 rounded-xl rounded-br-none self-end max-w-3/4 text-gray-100 p-4 my-2 message-gradient">
                    <h3>{auth.user.name}</h3>
                    <p>{parse(message.message)}</p>
                    {message.link_preview
                        ?
                            <div>
                                <article className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 md:max-w-lg max-w-sm">
                                    <div className="relative w-full h-80 md:h-64 lg:h-44">
                                        <img src={message.link_preview.images[0]}
                                            alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                            className="w-full h-full object-center object-cover"/>
                                    </div>
                                    <div className="px-3 py-4">
                                        <h3 className="text-sm text-gray-500 pb-2">
                                            <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href={message.link_preview.url} target="_blank">
                                                <span className="absolute inset-0"></span>
                                                {message.link_preview.title}
                                            </a>
                                        </h3>
                                        <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                                            {message.link_preview.description}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        :
                            null
                    }
                </div>
            :
                <div className="bg-gray-800 rounded-xl rounded-bl-none self-start max-w-3/4 text-gray-100 p-4 my-2 message-gradient">
                    <h3>{message.user[0].name ?? message.user.name}</h3>
                    <p>{parse(message.message)}</p>
                    {message.link_preview
                        ?
                            <div>
                                <article className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 md:max-w-lg max-w-sm">
                                    <div className="relative w-full h-80 md:h-64 lg:h-44">
                                        <img src={message.link_preview.images[0]}
                                            alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                            className="w-full h-full object-center object-cover"/>
                                    </div>
                                    <div className="px-3 py-4">
                                        <h3 className="text-sm text-gray-500 pb-2">
                                            <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href={message.link_preview.url} target="_blank">
                                                <span className="absolute inset-0"></span>
                                                {message.link_preview.title}
                                            </a>
                                        </h3>
                                        <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                                            {message.link_preview.description}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        :
                            null
                    }
                </div>
            )
        :
            (message.auth.id === auth.user.id)
            ?
                <div className="bg-gray-800 rounded-xl rounded-br-none self-end max-w-3/4 text-gray-100 p-4 my-2 message-gradient">
                    <h3>{message.auth.name}</h3>
                    <p>{parse(message.message)}</p>
                    {message.link_preview
                        ?
                            <div>
                                <article className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 md:max-w-lg max-w-sm">
                                    <div className="relative w-full h-80 md:h-64 lg:h-44">
                                        <img src={message.link_preview.images[0]}
                                            alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                            className="w-full h-full object-center object-cover"/>
                                    </div>
                                    <div className="px-3 py-4">
                                        <h3 className="text-sm text-gray-500 pb-2">
                                            <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href={message.link_preview.url} target="_blank">
                                                <span className="absolute inset-0"></span>
                                                {message.link_preview.title}
                                            </a>
                                        </h3>
                                        <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                                            {message.link_preview.description}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        :
                            null
                    }
                </div>
            :
                <div className="bg-gray-800 rounded-xl rounded-bl-none self-start max-w-3/4 text-gray-100 p-4 my-2 message-gradient">
                    <h3>{message.auth.name}</h3>
                    <p>{parse(message.message)}</p>
                    {message.link_preview
                        ?
                            <div>
                                <article className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200 md:max-w-lg max-w-sm">
                                    <div className="relative w-full h-80 md:h-64 lg:h-44">
                                        <img src={message.link_preview.images[0]}
                                            alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                            className="w-full h-full object-center object-cover"/>
                                    </div>
                                    <div className="px-3 py-4">
                                        <h3 className="text-sm text-gray-500 pb-2">
                                            <a className="bg-indigo-600 py-1 px-2 text-white rounded-lg" href={message.link_preview.url} target="_blank">
                                                <span className="absolute inset-0"></span>
                                                {message.link_preview.title}
                                            </a>
                                        </h3>
                                        <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                                            {message.link_preview.description}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        :
                            null
                    }
                </div>
        )
    )
}