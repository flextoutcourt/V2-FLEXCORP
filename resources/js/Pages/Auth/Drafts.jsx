import Draft from '@/Components/Draft';
import Spinner from '@/Components/Spinner';
import Authenticated from '@/Layouts/Authenticated';
import React, {useState, useEffect, Suspense} from 'react';

const Drafts = ({auth, errors}) => {
    
    const [drafts, setDrafts] = useState([]);
    
    useEffect(() => {
        _get_user_drafts().then(data => setDrafts(data));
    }, []);
    
    async function _get_user_drafts(){
        let user_id = auth.user.id;
        const promise = axios.get(route('api.get_drafts', {user_id}));
        const responseData = promise.then((data) => data.data);
        return responseData;
    }

    let content = () => {
        console.log(drafts);
        return (
            <div className="flex gap-4">
                {
                    (drafts 
                    ? 
                        (drafts.length > 0 
                        ?
                            drafts.map((item, key) => (
                                <Draft item={item} key={key}/>
                            ))
                        :
                                <p>Aucun brouillon a afficher</p>
                        )
                    :
                            <p>Aucun brouillon a afficher</p>
                    )
                }
            </div>
        )
    }
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Créer une actu</h2>}
        >
            {content()}
        </Authenticated>
    );
}

export default Drafts;
