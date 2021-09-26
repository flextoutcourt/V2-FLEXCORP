import Tweets from '@/Components/Tweets';
import React, {useState, useEffect} from 'react'

export default function Footer() {

    const [tweets, setTweets] = useState([]);
    
    useEffect(() => {
        _get_tweets().then(data => setTweets(data));
    }, []);
    
    async function _get_tweets(){
        const promise = axios.get(route('api.get_tweets'));
        const responseData = promise.then((data) => data.data);
        return responseData;
    }

    return (
        <div className="w-full">
            <footer className="w-full bg-gray-800 m-0 sm:mt-10 pt-10">
                <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
                    <div className="p-5 w-full sm:w-6/12 md:w-4/12">
                        <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                            Liens
                        </div>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Mes projets à venir
                        </a>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Mes réalisations
                        </a>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Mon parcours
                        </a>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Mes partenaires
                        </a>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Tchat
                        </a>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Reporter un bug
                        </a>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Plan du site
                        </a>
                        <hr className="my-2 bg-indigo-500"/>
                    </div>
                    <div className="p-5 w-full sm:w-6/12 md:w-4/12">
                        <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                            Adresse
                        </div>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            4 Boulevard de Strasbourg 62000 Arras
                        </a>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            quentin.leclercbte@gmail.com
                        </a>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            +33 7 86 63 08 50
                        </a>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Me contacter
                        </a>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Mentions légales
                        </a>
                        <hr className="my-2 bg-indigo-500" />
                    </div>
                    <div className="p-5 w-full sm:w-4/12 md:w-4/12">
                        <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                            Mes derniers tweets
                        </div>
                        <Tweets tweets={tweets}/>
                    </div>
                </div>
                <div className="pt-2">
                    <div className="flex pb-5 px-3 m-auto pt-5 
                    border-t border-indigo-500 text-gray-400 text-sm 
                    flex-col md:flex-row max-w-6xl">
                        <div className="mt-2">
                            © Copyright {new Date().getFullYear()}. All Rights Reserved.
                        </div>
                        <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
                            <a href="#" className="w-6 mx-1">
                                <i className="uil uil-facebook-f" />
                            </a>
                            <a href="#" className="w-6 mx-1">
                                <i className="uil uil-twitter-alt" />
                            </a>
                            <a href="#" className="w-6 mx-1">
                                <i className="uil uil-youtube" />
                            </a>
                            <a href="#" className="w-6 mx-1">
                                <i className="uil uil-linkedin" />
                            </a>
                            <a href="#" className="w-6 mx-1">
                                <i className="uil uil-instagram" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
