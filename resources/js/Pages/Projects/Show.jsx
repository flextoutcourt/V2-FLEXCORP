import React, { useState, useEffect } from 'react'
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';
import {Parallax} from 'react-parallax';
import parse from 'html-react-parser';
import './styles.css';

export default function Show({auth, errors, project}){
    
    const [comments, setComments] = useState([]);

    useEffect(() => {
        _get_comments().then(val => setComments(val));
    }, []);

    async function _get_comments(){
        const promise = axios.get(route('api.get_comments', route().params.project));
        const responseData = promise.then(data => data.data);
        return responseData;
    }

    function content() {
        return (
            <div>
                <Parallax 
                    blur={{min: -10, max: 10}} 
                    bgImage={"/"+project.illustration} 
                    bgImageAlt={'illustration de '+project.title} 
                    strength={150} 
                    bgImage={'/'+project.illustration} 
                    bgImageStyle={{height: 500, width: "100%"}} 
                    style={{height: 450}} 
                    className="rounded-md shadow-lg mb-4"
                />
                <div className="ck-blurred ck ck-content ck-rounded-corners">
                    {parse(project.description)}
                </div>
                    <div className="grid grid-cols-1 gap-4">
                        {comments.map((item, key) => {
                            <div className="bg-gray-700">
                                {item.content}
                            </div>
                        })}
                    </div>
            </div>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">{project.title}</h2>}
            >
                {content()}
            </Authenticated>
        )
    }else{
        return (
            <Guest
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">{project.title}</h2>}
            >
                {content()}
            </Guest>
        )
    }

}