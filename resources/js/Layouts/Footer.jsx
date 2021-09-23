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
            <ul className="flex juftify-content align-middle">
                <li><i className="fas fa-facebook-square"></i></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <footer className="w-full bg-gray-800 m-0 sm:mt-10 pt-10">
                <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
                    <div className="p-5 w-1/2 sm:w-4/12 md:w-4/12">
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
                        <hr className="my-2 bg-indigo-500"/>
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Plan du site
                        </a>
                    </div>
                    <div className="p-5 w-1/2 sm:w-4/12 md:w-4/12">
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
                        <hr className="my-2 bg-indigo-500" />
                        <a href="#" className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                            Mentions légales
                        </a>
                    </div>
                    <div className="p-5 w-1/2 sm:w-4/12 md:w-4/12">
                        <div className="text-xs uppercase text-gray-400 font-medium mb-6">
                            Mes derniers tweets
                        </div>
                        {tweets.map((item, key) => (
                            <div class="tweet-wrap">
                                <div class="tweet-header">
                                    <img src="https://pbs.twimg.com/profile_images/1012717264108318722/9lP-d2yM_400x400.jpg" alt="" class="avator"/>
                                    <div class="tweet-header-info">
                                    Steve Schoger <span>@Steve Schoger</span><span>. Jun 27
                                </span>
                                    <p>🔥 If you're tired of using outline styles for secondary buttons, a soft solid background based on the text color can be a great alternative.</p>
                                    
                                    </div>
                                    
                                </div>
                                <div class="tweet-img-wrap">
                                    <img src="https://pbs.twimg.com/media/Dgti2h0WkAEUPmT.png" alt="" class="tweet-img"/>
                                </div>
                                <div class="tweet-info-counts">
                                    
                                    <div class="comments">
                                    
                                    <svg class="feather feather-message-circle sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                    <div class="comment-count">33</div>
                                    </div>
                                    
                                    <div class="retweets">
                                    <svg class="feather feather-repeat sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                                    <div class="retweet-count">397</div>
                                    </div>
                                    
                                    <div class="likes">
                                    <svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    <div class="likes-count">
                                        2.6k
                                    </div>
                                    </div>
                                    
                                    <div class="message">
                                    <svg class="feather feather-send sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
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
