import React, {useState, useEffect} from 'react';
import Guest from './../../Layouts/Guest'
import Authenticated from './../../Layouts/Authenticated'
import parse from 'html-react-parser';

export default function Show({auth, errors, actu}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(null);

    useEffect(() => {
        _get_comments().then(val => setComments(val));
    }, []);

    async function _get_comments(){
        const promise = axios.get(route('api.get_comments', actu.id));
        const responseData = promise.then(data => data.data);
        return responseData;
    }

    const handleCommentSubmit = (e) => {
        console.log(e)
    } 

    const handleChange = (e) => {
        setComment(e.target.value);
    }
    
    const content = () => {
        return (
            <div className="text-white">
                <h3 className="text-3xl">{actu.title}</h3>
                <div>
                    {
                        parse(actu.content)
                    }
                </div>
                {
                    <div className="mt-4">
                    <hr className="my-4"/>
                        <h3 className="text-2xl mb-4">Commentaires</h3>
                        {
                            auth.user
                            ?
                                <form method="post" onSubmit={handleCommentSubmit}>
                                    <div className="mb-3">
                                        <input type="text" onChange={handleChange} />
                                    </div>
                                </form>
                            :
                                <p>Vous devez être <a href={route('login')} className="text-indigo-500">connecté</a> pour pouvoir commenter</p>
                        }
                        <hr className="my-4" />
                        <div className="grid grid-cols-1 gap-4">
                            {comments.map((comment, key) => (
                                <div className="shadow-lg rounded-xl p-4 bg-gray-800 relative overflow-hidden">
                                    <a href="#" className="w-full h-full block">
                                        <div className="flex items-center border-b-2 mb-2 py-2">
                                            <img className="w-10 h-10 object-cover rounded-full" alt="User avatar" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200" />
                                            <div className="pl-3">
                                                <div className="font-medium text-indigo-500">
                                                {comment.user.name}
                                                </div>
                                                <div className="text-white text-sm">
                                                {comment.user.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <p className="text-white text-sm font-medium mb-2">
                                                {comment.content}
                                            </p>
                                        </div>
                                        {
                                            comment.sub_comments
                                            ?
                                                comment.sub_comments.length > 0
                                                ?
                                                    comment.sub_comments.map((sub_comment, key) => (
                                                        <div className="ml-8">
                                                            <div className="shadow-lg rounded-xl p-4 bg-gray-800 relative overflow-hidden">
                                                                <a href="#" className="w-full h-full block">
                                                                    <div className="flex items-center border-b-2 mb-2 py-2">
                                                                        <img className="w-10 h-10 object-cover rounded-full" alt="User avatar" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200" />
                                                                        <div className="pl-3">
                                                                            <div className="font-medium text-indigo-500">
                                                                            {sub_comment.user.name}
                                                                            </div>
                                                                            <div className="text-white text-sm">
                                                                            {sub_comment.user.email}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-full">
                                                                        <p className="text-white text-sm font-medium mb-2">
                                                                            {sub_comment.content}
                                                                        </p>
                                                                    </div>
                                                                    <div className="w-full ml-8">
                                                                        
                                                                    </div>
                                                                    <div className="w-full h-2 bg-indigo-200 rounded-full">
                                                                        <div className="w-2/3 h-full text-center text-xs text-white bg-indigo-500 rounded-full">
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </div>      
                                                        </div>
                                                    ))
                                                :
                                                    null
                                            :
                                                null
                                        }
                                        <div className="w-full h-2 bg-indigo-200 rounded-full">
                                            <div className="w-2/3 h-full text-center text-xs text-white bg-indigo-500 rounded-full">
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Les actus de Flex</h2>}
            >
                {content()}
            </Authenticated>
        )
    }else{
        return (
            <Guest
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Dashboard</h2>}
            >
                {content()}
            </Guest>
        )
    }
}
