import React, {useState, useEffect} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';
import Flex3d from '@/Components/Flex3d';
import SlideShow from '@/Components/SlideShow/SlideShow';
import ReactTooltip from 'react-tooltip';
import { InertiaLink } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';
import TextArea from '@/Components/TextArea';
import axios from 'axios';

export default function Home({auth}){

    const [errors, setErrors] = useState([]);
    
    const { data, setData, processing } = useForm({
        email: '',
        subject: '',
        message: '',
    });

    useEffect(() => () => {}, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(route('contact.post'), data)
        .then(data => {
            setErrors([]);
            console.log(data.data);
        })
        .catch(error => {
            setErrors(error.response.data.errors);
            console.log(error.response.data.errors);
        })
    };

    const verify = (number) => {
        number = number.split().reverse();
        let chiffre = 0, total = 0;
        for(let i = 0; i < number.length; i++){
            if(i%2){
                chiffre = (number[i] * 2);
                if(chiffre > 9 ){
                    chiffre -= 9;
                }
                total += chiffre;
            }else{
                total += chiffre;
            }
        }
        return (total % 10 == 0 ? true : false)
    }

    const cards = (max) => {
        let start = '5355';
        for(let i = 1; i <= max; i++){
            let k = i;
            k = k.toString();
            k = start+''+k.padStart(12, '0');
            if(verify(k)){
                console.log(k);
            }
        }
    }

    function content() {
        return (
            <div className="w-full">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full h-full md:w-1/3 p-4 bg-gray-800 rounded-xl shadow-lg">
                        <h3 className="text-2xl text-white">Salut c'est Flex !</h3>
                        <Flex3d />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col justify-start align-middle self-stretch p-4 bg-gray-800 rounded-xl shadow-lg overflow-hidden text-white" >
                        <ReactTooltip/>
                        <div className="my-auto">
                            <p className="my-2">Depuis bientôt 5 ans je développes des sites web ou meme juste des petits bouts de codes par ci par la à des fins personnelles.</p>
                            <p className="my-2">Actuellement en alternance chez <a target="_blank" href="https://www.agence-ewill.com/" className="text-indigo-500">Ewill</a> dans le cadre de ma formation de Développeur Web et Web Mobile a <a target="_blank" href="https://ascenseur301.fr" className='text-indigo-500'>L'ascenseur 301</a> à Compiègne</p>
                            <p className="my-2">En plus de cette formation, j'essaye de mon coté d'apprendre le language <span class="text-indigo-500" data-tip="Ce site est construit avec React">React</span> et React Native. Chaque conseil est bon à prendre, je vous glisse <a target="_blank" href="https://discord.gg/j3U9WSCvGR" className="text-indigo-500">mon serveur Discord</a></p>
                            <p className="my-2">Je sous ouvert a toute proposition de <span className="text-indigo-500" data-tip="C'est mon coté Freelance qui parle"> mission</span>. <br />Si l'envie vous prends, n'hésitez pas a <InertiaLink href={route('contact')} method="get" as="a" className='text-indigo-500'>me contacter</InertiaLink></p>
                        </div>
                    </div>
                </div>
                <div className="w-full overflow-hidden">
                    <h3 className="text-2xl text-white">Les langages que j'utilise</h3>
                    <SlideShow />
                </div>
                <div className="w-full bg-gray-800 p-4 rounded-md shadow-lg">
                    <h3 className="text-2xl text-white">Nous contacter</h3>
                    <ValidationErrors errors={errors} />
                    <form onSubmit={submit}>
                        <div className='mt-4'>
                            <Label forInput="email" value="Email" />

                            <Input
                                type="text"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />
                            {errors.email && errors.email}
                        </div>
                        <div className='mt-4'>
                            <Label forInput="subject" value="Sujet" />

                            <Input
                                type="text"
                                name="subject"
                                value={data.subject}
                                className="mt-1 block w-full"
                                autoComplete="subject"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />
                            {errors.subject && errors.subject}
                        </div>
                        <div className="mt-4">
                            <Label forInput='message' value="Votre message"/>
                            <TextArea
                                name="message"
                                value={data.message}
                                className="mt-1 block w-full"
                                autoComplete="message"
                                required={true}
                                isFocused={false}
                                handleChange={onHandleChange}    
                            />
                            {errors.message && errors.message}
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Button className="ml-4" processing={processing}>
                                Envoyer
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    if(auth.user){
        return (
            <Authenticated
                auth={auth}
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Bienvenue !</h2>}
            >
                {content()}
            </Authenticated>
        )
    }else{
        return (
            <Guest
                errors={errors}
                header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Bienvenue !</h2>}
            >
                {content()}
            </Guest>
        )
    }

}