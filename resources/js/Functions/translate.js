import React, {useEffect, useState} from 'react';
import axios from "axios";




const Translate = (string) => {

    const [translate, setTranslate] = useState('');

    useEffect(() => {
        _get_translation().then((data) => setTranslate(data));
    }, [])

    const _get_translation = () => {
        const promise = axios.post(route('api.translates.lang', {query: string}));
        const responseData = promise.then(data => data.data);
        return responseData;
    }
    return (
        (translate != '') ? translate : ''
    );
}

export default Translate;
