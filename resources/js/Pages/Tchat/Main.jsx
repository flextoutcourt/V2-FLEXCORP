import {useEffect, useState} from "react";
import Pusher from "pusher-js";
import axios from "axios";
import Authenticated from "@/Layouts/Authenticated";
import Message from '../Tchat/Message';

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
        channel.bind('message', function (data) {
            messages.push(data);
            setMessages(messages);
        });
    }, []);

    const submit = async e => {
        e.preventDefault();

        await axios.post(route('tchat.send', {message}))

        setMessage('');
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <div className="container mx-auto">
                <div className="flex flex-col w-full">
                    {oldMessages.map((message, key) => {
                        return (
                            <Message message={message} key={key} auth={auth} />
                        )
                    })}
                    {messages.map((message, key) => {
                        return (
                            <Message message={message} key={key} auth={auth} />
                        )
                    })}
                </div>
                <form onSubmit={e => submit(e)} className="sticky bottom-0 left-0 right-0">
                    <input className="rounded-md w-full p-4" placeholder="Write a message" value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </form>
            </div>
        </Authenticated>
    );
}

export default App;