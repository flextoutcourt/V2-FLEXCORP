import { useEffect, useState } from "react";
import Pusher from 'pusher-js';
import Message from "./Message";

const { default: Authenticated } = require("@/Layouts/Authenticated");
const { default: axios } = require("axios");



export default function Main({auth, errors}){
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    let AllMessages = [];

    useEffect(() => {

        Pusher.logToConsole = true;

        var pusher = new Pusher("4c81c662885079cc5c1e", {
            cluster: 'eu'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', (data) => {
            console.log(data);
            AllMessages.push(data);
            setMessages(AllMessages);
        })
    }, []);

    let handleChange = (e) => {
        setMessage(e.target.value);
    }
    
    const handleSubmit = async e => {
        e.preventDefault();
    
        await axios.post(route('tchat.send', {message: message}))
        .then(() => {
            setMessage('');
        })
    }


    return(
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parlez avec nous</h2>}
        >
            <div className="container mx-auto pt-4">
                <div className="message-container mb-4 flex flex-col">
                    {messages.map((message, key) => {
                        return(
                            <Message message={message} key={key}/>
                        )
                    })}
                </div>
                <form onSubmit={handleSubmit} className="bottom-0">
                    <textarea name="message" id="message" cols="30" rows="10" value={message} onChange={handleChange} className="w-full h-12 rounded-md shadow-md">

                    </textarea>
                    <i className="fas fa-plane"></i>
                    {submitting
                        ?
                            <input type="submit" name="submit" disabled />
                        :
                            <input type="submit" name="submit" />

                    }
                </form>
            </div>
        </Authenticated>
    )
}