import {useEffect, useState} from "react";
import Pusher from "pusher-js";
import axios from "axios";
import Authenticated from "@/Layouts/Authenticated";
import Message from '../Tchat/Message';
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { toast } from 'react-toastify';
import Textarea from 'react-expanding-textarea'
import { MentionsInput, Mention } from 'react-mentions'
import { backgroundPosition } from "tailwindcss/defaultTheme";
import { v4 as uuidv4 } from 'uuid';
import Games from "./Games/Games";
import { SRLWrapper } from "simple-react-lightbox";

import * as PusherPushNotifications from '@pusher/push-notifications-web';


function Main({auth, errors}) {

    const pusher_key = '4c81c662885079cc5c1e';
    
    const [oldMessages, setoldMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [linkPreview, setLinkPreview] = useState('');
    const [users, setUsers] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [gamesMenu, setGamesMenu] = useState(false);
    const [retracted, setRetracted] = useState(false);
    const [offset, setOffset] = useState(0);
    const [fileUpload, setFileUpload] = useState(false);
    const [fileUploadMenu, setFileUploadMenu] = useState(false);
    const [mentionsMenu, setMentionsMenu] = useState(false);
    const [mentions, setMentions] = useState([]);
    const [userPresence, updateUserPresence] = useState([]);
    const [socketId, setsocketId] = useState(null)
    
    const [files, setFiles] = useState([]);
    const [filesD, setFilesD] = useState([]);

    const pusher = new Pusher(pusher_key, {
        cluster: 'eu',
    });
    
    useEffect(() => {

        /*const beamsClient = new PusherPushNotifications.Client({
            instanceId: "f7c763bd-95ba-4bf8-882c-82ba622f3a74",
        });
          
        beamsClient
            .start()
            .then((beamsClient) => beamsClient.getDeviceId())
            .then((deviceId) =>
              console.log("Successfully registered with Beams. Device ID:", deviceId)
            )
            .then(() => beamsClient.addDeviceInterest("hello"))
            .then(() => beamsClient.getDeviceInterests())
            .then((interests) => console.log("Current interests:", interests))
            .catch(console.error);*/
            
        _get_messages(0).then(val => {
            setoldMessages(val)
        })
        _get_users().then(val => setUsers(val));

        document.querySelector('#form').addEventListener('keydown', e => {
            handleCtrlKey(e)
        })

        
        const channel = pusher.subscribe('chat');
        channel.bind('message', (data) => {
            setoldMessages(oldMessages => [data, ...oldMessages]);
        })

        const presenceChannel = pusher.subscribe(`presence-channel`, data => {
            presenceChannel.authorize(data.auth);
        });
        
        presenceChannel.bind('pusher:subscription_succeeded', members => {
            updateUserPresence([]);
            members.each(user => {
                axios.get(route('api.user.get', user))
                .then((data) => {
                    updateUserPresence(userPresence => [...userPresence, data.data]);
                })
            });
        });

        presenceChannel.bind('pusher:member_added', data => {
            console.log(data);
            axios.get(route('api.user.get', data))
            .then((data) => {
                updateUserPresence(userPresence => [...userPresence, data.data]);
            })
        });
        presenceChannel.bind('pusher:member_removed', data => {
            axios.get(route('api.user.get', data))
            .then((data) => {
                updateUserPresence(userPresence => userPresence.filter(u => u.id !== data.data.id));
            })
        });

    }, []);
    

    async function _get_user_presence_array() {
        const userProm = axios.get(route('get_current_presence'));
        const responseData = userProm.then((data) => data.data);
        return responseData;
    }
    
    async function _get_users(){
        const promise = axios.get(route('api.get_users'));
        const responseData = promise.then(data => data.data);
        return responseData;
    }

    async function _get_messages(k){
        const promise = axios.get(route("tchat.list"), {
            params: {
                offset: k
            }
        });
        const responseData = promise.then((data) => data.data);
        return responseData;
    }

    const handleCtrlKey = e => {  
        console.log(message.length);      
        if(e.ctrlKey && e.keyCode == 13 && message.length != 0){
            submit(e)
        }
    }



    const onEndReachTreshold = (e) => {
        e.preventDefault();
        let offsetTop = e.target.scrollHeight + e.target.scrollTop - e.target.clientHeight;
        if(offsetTop < 1){
            _get_messages(oldMessages.length).then((data) => {
                data.map((item, key) => {
                    setoldMessages(oldMessages => [...oldMessages, item])
                })
                // offsetTop = 0
            });
        }
    }

    const submit = async e => {
        e.preventDefault();
        
        if((message.trim().length > 0 || files.length > 0)){
            const regex = new RegExp("^(https?|ftp)://[^\s/$.?#].[^\s]*$", 'i')
            const str = message;
            let m;
    
            if ((m = regex.exec(str)) !== null) {
                await getLinkPreview(m[0], {
                    proxyUrl: 'https://cors-anywhere.herokuapp.com/'
                }).then((response) => {
                    let fd = new FormData();
                    fd.append('message', message);
                    fd.append('files', JSON.stringify(filesD));
                    fd.append('response', JSON.stringify(response));
                    // fd.append('files', files);
                    axios.post(route('tchat.send'), fd)
                    .then(() => {
                        setMessage('');
                        setRetracted(false);
                        setOffset(offset + 1);
                        setFileUploadMenu(false);
                        setFilesD([]);
                        setFiles([]);
                        document.querySelector('#AllMessages').scroll(0, document.querySelector('#AllMessages').scrollHeight);
                    })    
                })
                .catch(async(e) => {
                    toast.error('Une erreur est survenue lors de la r??cup??ration des donn??es du lien');
                    let fd = new FormData();
                    fd.append('message', message);
                    fd.append('files', JSON.stringify(filesD));
                    await axios.post(route('tchat.send'), fd)
                    .then(() => {
                        setMessage('');
                        setRetracted(false);
                        setOffset(offset + 1);
                        setFileUploadMenu(false);
                        setFilesD([]);
                        setFiles([]);
                        document.querySelector('#AllMessages').scroll(0, document.querySelector('#AllMessages').scrollHeight);
                    })
                })
            }else{
                let fd = new FormData();
                fd.append('files', JSON.stringify(filesD));
                fd.append('message', message);
                await axios.post(route('tchat.send'), fd)
                    .then(() => {
                        setMessage('');
                        setRetracted(false);
                        setOffset(offset + 1);
                        setFileUploadMenu(false);
                        setFilesD([]);
                        setFiles([]);
                        document.querySelector('#AllMessages').scroll(0, document.querySelector('#AllMessages').scrollHeight);
                    });
            }
        }else{
            toast.warning('Vous ne pouvez pas envoyer un message vide');
        }

        // axios.post(route('notify.user', {type: "message"}));

    }

    const uploadFile = (e) => {
        const items = [...e.target.files];
        items.map((item, key) => {
            setFiles(files => [...files, item]);
            let fd = new FormData();
            fd.append('file', item, item.name);
            fd.append('uuid', uuidv4());
            axios.post(route('tchat.media_add'), fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((data) => {
                setFilesD(filesD => [...filesD, data.data]);
            })
        });
        console.log(files);
        setMenuOpen(false);
        setFileUploadMenu(true);
    }

    const deleteFile = (e) => {
        e.preventDefault();
        let itemKey = e.target.parentNode.id ?? 0;
        let fileId = filesD[itemKey].id

        
        let fd = new FormData();
        fd.append('itemId', fileId);
        axios.post(route('tchat.delete_media'), fd)
        .then((data) => {
            setFilesD(
                filesD.filter((item, key) => {
                    return item.id != data.data.id;
                })
            )
        })

        if(filesD.length < 2){
            setMenuOpen(false);
            setFileUploadMenu(false)
        }
    }

    const deployMessageMenu = (e) => {
        e.preventDefault();
        if(menuOpen){
            if(message.length > 0){
                setRetracted(true);
            }else{
                setRetracted(false);
            }
        }else{
            setRetracted(true);
        }
        setMenuOpen(!menuOpen);
    }

    const toggleFileMenu = (e) => {
        e.preventDefault();
    }
    const togglePictureMenu = (e) => {
        e.preventDefault();
    }
    const toggleGifMenu = (e) => {
        e.preventDefault();
    }

    const toggleGamesMenu = (e) => {
        e.preventDefault();
        setGamesMenu(!gamesMenu);
    }

    const userData = users.map((item, key) => ({
        id: item.id,
        display: item.name
    }))

    const handleChange = e => {
        setMessage(e.target.value);
        // const regex = /\@(\w?)*/gmi;
        // const str = e.target.value;
        // let m;
        // setMentionsMenu(false);
        // while ((m = regex.exec(str)) !== null) {

            
        //     if (m.index === regex.lastIndex) {
        //         regex.lastIndex++;
        //     }
            
        //     // The result can be accessed through the `m`-variable.
        //     m.forEach((match, groupIndex) => {
        //         console.log(match);
        //         if(match.length > 1){
        //             setMentions(users.find(item => item.name.match(match+'\w*')));
        //         }else{
        //             setMentions(users);
        //         }
        //         setMentionsMenu(true);
        //     });
        // }
        if(e.target.value.length > 0){
            setRetracted(true);
        }else{
            setRetracted(false);
        }
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Laissez votre avis sur le site</h2>}
        >
            <div className="container max-w-7xl mx-auto md:grid md:grid-cols-4 gap-1">
                <div className="col-span-3">
                    <SRLWrapper className="w-full col-span-3">
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
                            <div className="scrollbar scrollbar-thumb-indigo-500 scrollbar pr-5 flex flex-col-reverse w-full overflow-y-auto overflow-x-hidden" style={{maxHeight: "calc(100vh - 218px)"}} id="AllMessages" onScroll={onEndReachTreshold}>
                                {/* {messages.reverse().map((m, key) => {
                                    return (
                                        <Message message={m} key={key} auth={auth} />
                                    )
                                })} */}
                                {oldMessages.map((m, key) => {
                                    return (
                                        <Message message={m} key={key} auth={auth} />
                                    )
                                })}
                            </div>
                            <form onSubmit={e => submit(e)} className="z-20 sticky bottom-0 left-0 right-0 border-t border-indigo-500 text-white focus:ring-opacity-50 focus:ring-2 focus:ring-indigo-500 bg-gray-900" encType='multipart/formdata' id="form">
                                <div className="relative">
                                    {
                                        menuOpen
                                        ?
                                            <div className="mb-2 z-0 absolute bottom-0 grid grid-cols-2 md:grid-cols-3 gap-2 w-full duration-200 opacity-1 overflow-hidden">

                                                <div>
                                                    <input type="file" id="fileUpload" className="hidden" onChange={uploadFile} multiple/>
                                                    <label htmlFor="fileUpload">
                                                        <div className="text-center p-2 text-white hover:bg-gray-600 duration-200 shadow-2xl bg-gray-700 rounded-lg cursor-pointer">
                                                            Ajouter un fichier
                                                        </div>
                                                    </label>
                                                </div>
                                                <button onClick={togglePictureMenu} className="text-center p-2 text-white hover:bg-gray-600 duration-200 shadow-2xl bg-gray-700 rounded-lg">Ajouter une image</button>
                                                <button onClick={toggleGifMenu} className="text-center p-2 text-white hover:bg-gray-600 duration-200 shadow-2xl bg-gray-700 rounded-lg">Ajouter un gif</button>
                                            </div>
                                        :
                                            <div className="mb-2 absolute -bottom-full grid grid-cols-2 md:grid-cols-3 gap-2 w-full duration-200 opacity-0 overflow-hidden invisible">
                                                <button className="text-center p-2 text-white hover:bg-gray-600 duration-200 shadow-2xl bg-gray-700 rounded-lg">Ajouter un fichier</button>
                                                <button className="text-center p-2 text-white hover:bg-gray-600 duration-200 shadow-2xl bg-gray-700 rounded-lg">Ajouter une image</button>
                                                <button className="text-center p-2 text-white hover:bg-gray-600 duration-200 shadow-2xl bg-gray-700 rounded-lg">Ajouter un gif</button>
                                            </div>
                                    }
                                    {
                                        fileUploadMenu
                                        ?
                                            <div className="mb-2 z-0 absolute bg-gray-700 rounded-md bottom-0 flex align-center gap-2 duration-200 opacity-1 p-2 overflow-x-auto">
                                                {filesD.map((item, key) => (
                                                    item.type == 'video/mp4'
                                                    ?
                                                    <div key={key} id={key}>
                                                        <div className="rounded-md p-2 h-20 w-20 relative" style={{backgroundImage: "url('/"+item.thumb+"')", backgroundSize: 'cover', backgroundPosition: 'center center' }} id={key}>
                                                            <button className="text-center absolute -top-2 -right-2 h-6 w-6 p-0 bg-indigo-500 rounded-full" onClick={deleteFile} id={key}>
                                                                <i className="fas fa-times text-sm"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div key={key} id={key}>
                                                        <div className="rounded-md p-2 h-20 w-20 relative" style={{backgroundImage: "url('/"+item.content+"')", backgroundSize: 'cover', backgroundPosition: 'center center' }} id={key}>
                                                            <button className="text-center absolute -top-2 -right-2 h-6 w-6 p-0 bg-indigo-500 rounded-full" onClick={deleteFile} id={key}>
                                                                <i className="fas fa-times text-sm"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div>
                                                    <input type="file" id="fileUpload" className="hidden" onChange={uploadFile} multiple/>
                                                    <label htmlFor="fileUpload">
                                                        <div className="text-center w-20 h-20 flex items-center justify-center p-1 text-white hover:bg-gray-600 duration-200 shadow-2xl bg-gray-700 rounded-lg cursor-pointer">
                                                            <i className="fas fa-paperclip text-2xl"></i>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        :
                                        null
                                    }
                                    {
                                        gamesMenu
                                        ?
                                            <div className="mb-2 z-0 absolute bg-gray-700 rounded-md bottom-0 grid grid-cols-4 w-full h-48 gap-2 duration-200 opacity-1 p-2 overflow-x-auto">
                                                <Games/>
                                            </div>
                                        :
                                            null
                                    }
                                </div>
                                <div className="relative w-full flex items-end justify-between gap-2 bg-gray-900 py-1">
                                    <button onClick={fileUploadMenu ? (e) => {e.preventDefault()} : deployMessageMenu} disabled={fileUploadMenu} className={!fileUploadMenu ? "rounded-xl border border-transparent hover:border-indigo-500 bg-indigo-500 hover:bg-transparent duration-200 text-white hover:text-indigo-500 p-2 h-10 w-10 text-center cursor-pointer" : "rounded-xl border border-transparent  bg-indigo-100 duration-200 text-indigo-500 p-2 h-10 w-10 text-center cursor-not-allowed"}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                    {
                                        !retracted
                                        ?
                                            filesD.length > 0
                                            ?
                                                <button className="rounded-xl border-0 border-transparent hover:border-indigo-500 bg-indigo-500 hover:bg-transparent duration-200 text-white hover:text-indigo-500 p-0 w-0 text-center cursor-pointer opacity-0 h-0">
                                                    <i className="fas fa-paperclip" style={{fontSize: 0}}></i>
                                                </button>
                                            :
                                                <div>
                                                    <input type="file" id="fileUpload" className="hidden" onChange={uploadFile} multiple/>
                                                    <label htmlFor="fileUpload">
                                                        <div className="rounded-xl border border-transparent hover:border-indigo-500 bg-indigo-500 hover:bg-transparent duration-200 text-white hover:text-indigo-500 p-2 h-10 w-10 text-center cursor-pointer opacity-1">
                                                            <i className="fas fa-paperclip"></i>
                                                        </div>
                                                    </label>
                                                </div>
                                        :
                                            <button className="rounded-xl border-0 border-transparent hover:border-indigo-500 bg-indigo-500 hover:bg-transparent duration-200 text-white hover:text-indigo-500 p-0 w-0 text-center cursor-pointer opacity-0 h-0">
                                                <i className="fas fa-paperclip" style={{fontSize: 0}}></i>
                                            </button>
                                    }
                                    {
                                        !retracted
                                        ?
                                            filesD.length > 0
                                            ?
                                                <button className="rounded-xl border-0 border-transparent hover:border-indigo-500 bg-indigo-500 hover:bg-transparent duration-200 text-white hover:text-indigo-500 p-0 w-0 text-center cursor-pointer opacity-0 h-0" onClick={toggleGamesMenu}>
                                                    <i className="fas fa-paperclip" style={{fontSize: 0}}></i>
                                                </button>
                                            :
                                                <button className="rounded-xl border border-transparent hover:border-indigo-500 bg-indigo-500 hover:bg-transparent duration-200 text-white hover:text-indigo-500 p-2 h-10 w-10 text-center cursor-pointer" onClick={toggleGamesMenu}>
                                                    <i className="fas fa-dice"></i>
                                                </button>
                                        :
                                            <button className="rounded-xl border-0 border-transparent hover:border-indigo-500 bg-indigo-500 hover:bg-transparent duration-200 text-white hover:text-indigo-500 p-0 h-0 w-0 opacity-0 text-center cursor-pointer">
                                                <i className="fas fa-dice" style={{fontSize: 0}}></i>
                                            </button>
                                    }
                                    {/* <span className="w-full p-4 bg-gray-900 focus:bg-gray-800" onChange={handleChange}>
                                        {message}
                                    </span> */}
                                    <div className="relative w-full h-full">
                                        {
                                            mentionsMenu
                                            ?
                                                <div className="absolute bg-red-500 rounded-lg shadow-lg p-4 flex-col gap-2">
                                                    {mentions.map((item, key) => (
                                                        <div>
                                                            {item.user}
                                                        </div>
                                                    ))}
                                                </div>
                                            :
                                                null
                                        }
                                        <Textarea
                                                autoFocus={true}
                                                value={message}
                                                onChange={handleChange}
                                                className="w-full overflow-hidden align-bottom py-auto h-10 px-4 bg-gray-900 rounded-2xl border border-transparent outline-none focus:border-indigo-500 focus:border-t-4 focus:bg-gray-800 resize-none"
                                                placeholder="??crivez votre message"
                                                autoCapitalize="true"
                                                rows={1}
                                                style={{maxHeight: "90px"}}
                                            >
                                        </Textarea>
                                    </div>
                                    
                                    <button type="submit" className="rounded-xl border border-indigo-500 hover:bg-indigo-500 duration-200 text-indigo-500 hover:text-white p-2 h-10 w-10 text-center cursor-pointer">
                                        <i className="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </form>
                        </SRLWrapper>
                </div>
                <div className="w-full bg-gray-800-500 col-span-1 p-1 flex flex-col gap-2 rounded-md shadow-lg sticky top-0">
                    <h3 className="text-lg text-white">Utilisateur connect??s</h3>
                    {
                        userPresence.map((item, key) => (
                            <div className="flex justify-start items-center gap-2" key={key}>
                                <div className="relative">
                                    <img src={item.avatar ? item.avatar : '/users/default.svg'} alt={item.name} className="h-12 w-12 rounded-md shadow-xl object-cover" />
                                    <span className="bg-green-500 h-2 w-2 rounded-full shadow-lg absolute -bottom-1 -right-1"></span>
                                </div>
                                <p className="text-white">{item.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Authenticated>
    );
}

export default Main;