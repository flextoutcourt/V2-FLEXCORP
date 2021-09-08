import {useEffect, useState} from "react";
import Pusher from "pusher-js";
import axios from "axios";
import Authenticated from "@/Layouts/Authenticated";
import Message from '../Tchat/Message';
import Echo from "laravel-echo";

function App({auth, errors}) {
    const [oldMessages, setoldMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        _get_messages().then(val => setoldMessages(val));
      }, []);
    
    async function _get_messages(){ 
        const promise = axios.get(route("tchat.list"));
        const responseData = promise.then((data) => data.data);
        return responseData;
    }

    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher('4c81c662885079cc5c1e', {
            cluster: 'eu' 
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', (data) => {
            setMessages(messages => ([...messages, data]));
        });
    }, []);

    const submit = async e => {
        e.preventDefault();

        await axios.post(route('tchat.send', {message}))
        .then(() => {
            setMessage('');
            window.scroll(0, document.body.scrollHeight);
        });
        await axios.post(route('notify.user', {type: message}));

    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Laissez votre avis sur le site</h2>}
        >
            <div className="container max-w-7xl mx-auto">
                <div className="flex flex-col w-full">
                    {oldMessages.map((m, key) => {
                        return (
                            <Message message={m} key={key} auth={auth} />
                        )
                    })}
                    {messages.map((m, key) => {
                        return (
                            <Message message={m} key={key} auth={auth} />
                        )
                    })}
                </div>
                <form onSubmit={e => submit(e)} className="sticky bottom-0 left-0 right-0 border-t border-indigo-500 bg-gray-900 text-white focus:ring-opacity-50 focus:ring-2 focus:ring-indigo-500">
                    <input className="w-full p-4 bg-gray-900 outline-none focus:border-indigo-500 focus:border-t-4 focus:bg-gray-800" placeholder="Write a message" value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </form>
            </div>
        </Authenticated>
    );
}

export default App;