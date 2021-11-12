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
import { useTranslation } from 'react-i18next';
import '@/../../src/translations/i18n';
import * as ScrollMagic from 'scrollmagic'

export default function Home({auth}){

    const [errors, setErrors] = useState([]);

    const { data, setData, processing } = useForm({
        email: auth.user ? auth.user.email : '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        
    });

    const onVideoLoaded = () => {
        const intro = document.querySelector('.intro');
        const video = document.getElementById('video');
        const text = intro.querySelector('h1');

        const section = document.querySelector('section');
        const end = section.querySelector('h1');

        const controller = new ScrollMagic.Controller();

        // create a scene
        const scene = new ScrollMagic.Scene({
            duration: video.duration * 1000,
            triggerElement: intro,
            triggerHook: 0
        })
        .setPin(intro)
        .addTo(controller)

        let accelAmount = 0.1,
            scrollpos = 0,
            delay = 0;

        scene.on('update', e => {
            scrollpos = e.scrollPos / 1000;
        })

        setInterval(() => {
            delay += (scrollpos - delay) * accelAmount;
            console.log(delay);
            video.currentTime = delay;
            // console.log(video.currentTime)
        }, 33.3)
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(route('contact.post'), data)
        .then(data => {
            setErrors([]);
        })
        .catch(error => {
            setErrors(error.response.data.errors);
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


    const {t} = useTranslation();

    function content() {
        return (
            <div className="w-full">
                {/* <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full h-full md:w-1/3 p-4 bg-gray-800 rounded-xl shadow-lg">
                        <h3 className="text-2xl text-white">Salut c'est Flex !</h3>
                        <Flex3d />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col justify-start align-middle self-stretch p-4 bg-gray-800 rounded-xl shadow-lg overflow-hidden text-white" >
                        <ReactTooltip/>
                        <div className="my-auto">
                            <p className="my-2">Depuis bientôt 5 ans je développes des sites web ou meme juste des petits bouts de codes par ci par la à des fins personnelles.</p>
                            <p className="my-2">Actuellement en alternance chez <a target="_blank" href="https://www.agence-ewill.com/" className="text-indigo-500">Ewill</a> dans le cadre de ma formation de Développeur Web et Web Mobile a <a target="_blank" href="https://ascenseur301.fr" className='text-indigo-500'>L'ascenseur 301</a> à Compiègne.</p>
                            <p className="my-2">En plus de cette formation, j'essaye de mon coté d'apprendre le language <span className="text-indigo-500" data-tip="Ce site est construit avec React">React</span> et React Native. Chaque conseil est bon à prendre, je vous glisse <a target="_blank" href="https://discord.gg/j3U9WSCvGR" className="text-indigo-500">mon serveur Discord</a>.</p>
                            <p className="my-2">Je sous ouvert a toute proposition de <span className="text-indigo-500" data-tip="C'est mon coté Freelance qui parle"> mission</span>. <br />Si l'envie vous prends, n'hésitez pas a <InertiaLink href={route('contact')} method="get" as="a" className='text-indigo-500'>me contacter</InertiaLink>.</p>
                        </div>
                    </div>
                </div>
                <div className="md:my-12 md:h-1" ></div> */}
                <div className="intro">
                    <video className="w-full" id="video" controls onLoadedData={onVideoLoaded}>
                        <source src="/videos/pexels-rostislav-uzunov-5680034.mp4" type="video/mp4" />  
                    </video>
                </div>
                <section>
                    <h1>C'est stylé de fou j'trouve</h1>
                </section>
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