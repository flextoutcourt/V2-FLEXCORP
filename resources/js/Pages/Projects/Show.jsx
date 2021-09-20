import React, { Component, useState, useEffect, useRef } from 'react'
import clamp from 'lodash-es/clamp'
import { InertiaLink } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';
import {Parallax} from 'react-parallax'
import './styles.css'

export default function Show({auth, errors, project}){
    
    function content() {
        return (
            <div>
                <Parallax blur={0} bgImage={"/"+project.illustration} bgImageAlt={'illustration de '+project.title} className="relative" strength={200} style={{height: "500px"}}>
                    <button className="absolute bottom-0 right-0">gdfjhglkfjjhgskfhglksjfdghlkj s</button>
                </Parallax>
                <p className="text-lg">
                    {project.description}
                </p>
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