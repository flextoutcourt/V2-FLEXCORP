import {useEffect, useState} from "react";
import Pusher from "pusher-js";
import axios from "axios";
import Authenticated from "@/Layouts/Authenticated";
import Message from '../Tchat/Message';
import Echo from "laravel-echo";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { toast } from 'react-toastify';

function App({auth, errors}) {
    const [oldMessages, setoldMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [linkPreview, setLinkPreview] = useState('');
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        _get_messages().then(val => setoldMessages(val));
        _get_users().then(val => setUsers(val));
      }, []);
    
      async function _get_users(){
          const promise = axios.get(route('api.get_users'));
          const responseData = promise.then(data => data.data);
          return responseData;
      }

    async function _get_messages(){ 
        const promise = axios.get(route("tchat.list"));
        const responseData = promise.then((data) => data.data);
        return responseData;
    }

    useEffect(() => {
        // Pusher.logToConsole = true;

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

        const regex = new RegExp("^(https?|ftp)://[^\s/$.?#].[^\s]*$", 'i')
        const str = message;
        let m;

        if ((m = regex.exec(str)) !== null) {
            await getLinkPreview(m[0]).then((response) => {
                axios.post(route('tchat.send', {message, response}))
                .then(() => {
                    setMessage('');
                    window.scroll(0, document.body.scrollHeight);
                })    
            })
            .catch((e) => {
                console.log(e);
                toast.error('Une erreur est survenue lors de la récupération des données du lien');
                axios.post(route('tchat.send', {message}))
                .then(() => {
                    setMessage('');
                    window.scroll(0, document.body.scrollHeight);
                })
            })
        }else{
            axios.post(route('tchat.send', {message}))
                .then(() => {
                    setMessage('');
                    window.scroll(0, document.body.scrollHeight);
                });
        }
        await axios.post(route('notify.user', {type: "message"}));

    }

    const handleChange = e => {
        setMessage(e.target.value);
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Laissez votre avis sur le site</h2>}
        >
            <div className="container max-w-7xl mx-auto">
                {/* <div className="absolute bottom-4 left-4 w-96 overflow-x-auto h-10 z-50">
                    <div class="flex items-center overflow-hidden h-10 p-1">
                        {users.map((item, key) => (
                            (key == 0 
                            ?
                                <img class={"inline-block h-8 w-8 rounded-full hover:scale-110 duration-200 text-white border-2 border-white object-cover object-center"} src="https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                            :
                                <img class="-ml-2 inline-block h-8 w-8 rounded-full hover:scale-110 duration-200 text-white border-2 border-white object-cover object-center" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" />
                            )
                        ))}
                    </div>
                </div> */}
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
                        onChange={handleChange}
                    />
                </form>
            </div>
        </Authenticated>
    );
}

export default App;