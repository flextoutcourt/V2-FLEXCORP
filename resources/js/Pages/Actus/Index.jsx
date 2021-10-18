import React, { Component, useState, useEffect, useRef } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';
import Isotope from 'isotope-layout';
import { backgroundColor } from 'tailwindcss/defaultTheme';

export default function Actus ({auth, errors}){

    const [actus, setActus] = useState([]);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        _get_actus().then(data => setActus(data));
    }, []);

    useEffect(() => {
        _get_categories().then(data => setCategories(data));
    }, []);
    
    async function _get_actus(){
        const promise = axios.get(route('api.get_actus'));
        const responseData = promise.then((data) => data.data);
        return responseData;
    }
    
    async function _get_categories()
    {
        const promise = axios.get(route('api.get_categories'));
        const responseData = promise.then((data) => data.data);
        return responseData;
    }
    
    const IsotopeReact = ({children}) => {
        // init one ref to store the future isotope object
        const isotope = useRef()
        // store the filter keyword in a state
        const [filterKey, setFilterKey] = useState('*')
      
        // initialize an Isotope object with configs
        React.useEffect(() => {
          isotope.current = new Isotope('.filter-container', {
            itemSelector: '.filter-item',
          })
          // cleanup
          return () => isotope.current.destroy()
        }, [])
      
        // handling filter key change
        useEffect(() => {
          filterKey === '*'
            ? isotope.current.arrange({filter: `*`})
            : isotope.current.arrange({filter: `.${filterKey}`})
        }, [filterKey])
      
        const handleFilterKeyChange = key => () => setFilterKey(key)
        
        return (
            <>
                <div className="flex justify-start gap-4 overflow-x-auto scrollbar scrollbar-thumb-indigo-500 scrollbar-track-gray-800 pb-6 rounded-md">
                    {
                        filterKey === '*'
                        ?
                            <a onClick={handleFilterKeyChange('*')} className="p-2 rounded-md shadow-md duration-200 cursor-pointer border border-transparent hover:border-indigo-500 bg-indigo-500 text-white font-bold text-center whitespace-nowrap">Tout</a>
                        :
                            <a onClick={handleFilterKeyChange('*')} className="p-2 rounded-md shadow-md duration-200 cursor-pointer border bg-transparent text-white border-indigo-500 hover:bg-indigo-500 font-bold text-center whitespace-nowrap">Tout</a>
                    }
                    {
                        categories.map((category, key) => (
                            category.title === filterKey
                            ?
                                <a key={key} onClick={handleFilterKeyChange(category.title)} className="p-2 rounded-md shadow-md duration-200 cursor-pointer border border-transparent font-bold text-center whitespace-nowrap" style={{backgroundColor:category.color, color: invertColor(category.color)}} >{category.title}</a>
                            :
                                <a key={key} onClick={handleFilterKeyChange(category.title)} className="p-2 rounded-md shadow-md duration-200 cursor-pointer border bg-transparent text-white font-bold text-center whitespace-nowrap" style={{borderColor: category.color}}>{category.title}</a>
                        ))
                    }
                </div>
            </>
        )
      }

    function invertColor(hex, bw) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }

    function content(){
        return(
            <>
                <IsotopeReact/>
                <div className="filter-container grid grid-cols-2 gap-4 mt-4">
                    {
                        actus
                        ?
                            actus.map((actu, key) => (
                                <a href={route('actu.show', {actu})} key={key} className={"filter-item w-full mb-2 bg-gray-800 shadow-lg rounded-md flex justify-start items-center overflow-hidden "+actu.category.title+" text-white"}>
                                    <img src="https://picsum.photos/150" alt={actu.title} className="object-cover" style={{minHeight: 150}} />
                                    <p className="ml-4">
                                        <span>{actu.title}</span>
                                    </p>
                                </a>
                            ))
                        :
                            <p>Aucun articles a afficher</p>                                
                    }
                </div>
            </>
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