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

export default function Home({auth}){

    const [errors, setErrors] = useState([]);
    
    const { data, setData, processing } = useForm({
        email: auth.user ? auth.user.email : '',
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
                <div className="w-full mt-4">
                    <h3 className="text-2xl py-4 sticky top-16 bg-gray-900 z-40 text-white">Les langages que j'utilise</h3>
                    <SlideShow />
                </div>
                <div className="md:my-12 md:h-1" ></div>
                <div className="w-full mt-4 text-white">
                <div className="py-4 sticky top-16 bg-gray-900">
                    <h3 className="text-2xl">{t("home.chooseMe")}</h3>
                    <p>{t("home.goodKnowledge")}</p>
                </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-start my-2 px-3">
                                    <img src="/storage/img/html5.svg" className="max-h-8" alt="HTML5" />
                                    <h4 className="text-xl ml-3">HTML 5</h4>
                                </div>
                                <div className="progress"></div>
                                <p>J'ai commencé par apprendre le HTML 5 il y a 6 ans par curiosité et grâce a des tutos Youtube sur la chaîne de <a href="https://grafikart.fr" className="text-indigo-500" target="_blank">Grafikart</a>. J'ai tout de suite eu envie d'approfondir ma connaissance du web.</p>
                            </div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-start my-2 px-3">
                                    <img src="/storage/img/css3.svg" className="max-h-8" alt="CSS3" />
                                    <h4 className="text-xl ml-3">CSS 3</h4>
                                </div>
                                <div className="progress"></div>
                                <p>Idemn que pout le HTML, en regardant un nombre conséquent de vidéos youtube, j'ai connu le plaisir de créer quelque chose de A à Z.</p>
                            </div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-between my-2 px-3">
                                    <img src="/storage/img/js.svg" alt="Javascript" />
                                    <h4>Javascript</h4>
                                    <p>&</p>
                                    <h4>Jquery</h4>
                                    <img src="/storage/img/jquery.svg" className="max-h-8" alt="Jquery" />
                                </div>
                                <div className="progress"></div>
                                <p>Pour ce qui est du JavaScript, j'ai appris les bases en meme temps que le HTML et le CSS cependant je n'était pas tant attiré par ce langage, mais plutôt par le <a href="#php" className="txet-indigo-500">#PHP</a>, ce n'est qu'il y a environ 2/3 années que je me suis mis en tête d'apprendre en profondeur ce langage plus que puissant.</p>
                            </div>
                        </div>
                        <div className="h-full hidden md:block">
                            <img src="/storage/img/illustrations/illustration1.svg" className="my-auto w-full" alt="" style={{maxHeight: 450}} />
                        </div>
                    </div>
                    <div className="md:my-12 md:h-1" ></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="hidden md:block">
                            <img src="/storage/img/illustrations/design.svg" alt="Design" className="my-auto w-full" style={{maxHeight: 450}} />
                        </div>
                        <div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-start my-2 px-3">
                                    <img src="/storage/img/bootstrap.svg" className="max-h-8" alt="HTML5" />
                                    <h4 className="text-xl ml-3">Bootstrap</h4>
                                </div>
                                <div className="progress"></div>
                                <p>Mon apprentissage de bootstrap à débuté en même temps que le HTML et le CSS et ce toujours grâce à des vidéos youtube qui montrait la simplicité de ce "FrameWork". J'envisage dans un futur proche d'apprendre d'autre FraweWorks.</p>
                            </div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-start my-2 px-3">
                                    <img src="/storage/img/tailwindcss.svg" className="max-h-8" alt="CSS3" />
                                    <h4 className="text-xl ml-3">Tailwind CSS</h4>
                                </div>
                                <div className="progress"></div>
                                <p>En commançant les projets <a href="#React" className="text-indigo-500">#React</a> et <a href="#ReactNative" className="text-indigo-500">#React Native</a> j'ai essayé de trouver une alternative viable a bootstrap. En feuilletant les documentations, j'ai découvert que TailwindCss etait compatible avec React. J'ai donc approfondi le sujet et commencé l'apprentissage de ce FrameWork CSS.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:my-12 md:h-1" ></div>
                <div className="w-full mt-4 text-white">
                    <div className="py-4 sticky top-16 bg-gray-900">
                        <h3 className="text-2xl">Mais encore...</h3>
                        <p>Toute la partie Back-End (ma spécialité)</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-start my-2 px-3">
                                    <img src="/storage/img/php.svg" className="max-h-8" alt="HTML5" />
                                    <h4 className="text-xl ml-3">PHP</h4>
                                </div>
                                <div className="progress"></div>
                                <p>J'ai appris le PHP il y à 5 ans par pur plaisir. Pour mon projet de Baccalauréat je devais monter un site web dynamique ( <a href="https://speedauto-garage.fr" className="text-indigo-500" target="_blank">Nouvelle version SpeedAuto (2021)</a> ). J'ai donc utilisé le PHP et cela n'a fait que renforcer mes connaissances dans ce langage.</p>
                            </div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-start my-2 px-3">
                                    <img src="/storage/img/mysql.svg" className="max-h-8" alt="CSS3" />
                                    <h4 className="text-xl ml-3">Mysql</h4>
                                </div>
                                <div className="progress"></div>
                                <p>Lorsque l'on commence le PHP en essyant de créer un système de membres, il faut bien apprendre un minimum de SQL afin de pouvoir gérer ses bases de données.</p>
                            </div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-between my-2 px-3">
                                    <img src="/storage/img/rn.svg" className="max-h-8" alt="Javascript" />
                                    <h4>React</h4>
                                    <p>&</p>
                                    <h4>React Native</h4>
                                    <img src="/storage/img/rn.svg" className="max-h-8" alt="Jquery" />
                                </div>
                                <div className="progress"></div>
                                <p>Pendant le confinement du mois de Mars 2020 (c'était long) je me  suis mis en tete de creer une application dans le meme style que Spotify, j'ai donc opté pour la solution React Native. Je maitrise désormais les bases ainsi que quelques subtilités de ce langage, cependant il me reste énormément de chemin avant de pouvoir dire que je maitrise réelement ce langage.</p>
                                <p>Quand au React, ce site est construit uniquement en <a href="#React" className="text-indigo-500">#React</a> x <a href="#Laravel" className="text-indigo-500">#Laravel</a>, ce qui peut montrer une certaine maitrise du langage.</p>
                            </div>
                        </div>
                        <div className="h-full hidden md:block">
                            <img src="/storage/img/illustrations/building.svg" className="my-auto w-full" alt="Building" style={{maxHeight: 450}} />
                        </div>
                    </div>
                    <div className="md:my-12 md:h-1" ></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-full hidden md:block">
                            <img src="/storage/img/illustrations/progress.svg" alt="progress" className="w-full my-auto" style={{maxHeight: 450}} />
                        </div>
                        <div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-start my-2 px-3">
                                    <img src="/storage/img/nodejs.svg" className="max-h-8" alt="HTML5" />
                                    <h4 className="text-xl ml-3">Node JS</h4>
                                </div>
                                <div className="progress"></div>
                                <p>Pareil que pour Prestashop, le paragraphe est pas encore fini fini (j'ai pas commencé pour être honnête). </p>
                            </div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-start my-2 px-3">
                                    <img src="/storage/img/laravel.svg" className="max-h-8" alt="CSS3" />
                                    <h4 className="text-xl ml-3">Laravel</h4>
                                </div>
                                <div className="progress"></div>
                                <p>Dans ma formation a <a href="https://ascenseur301.fr">L'ascenseur 301</a> il est prévu que j'apprenne Laravel. On va dire que je suis impatient, j'ai donc jeté un coup d'oeil avant de commencer a le voir en cours. J'ai très vite été emporté dans l'apprentissage tant le FrameWork est facile à comprendre.</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:my-12 md:h-1" ></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-start my-2 px-3">
                                    <img src="/storage/img/wordpress.svg" className="max-h-8" alt="HTML5" />
                                    <h4 className="text-xl ml-3">WordPress</h4>
                                </div>
                                <div className="progress"></div>
                                <p>J'ai découvert Wordpress lors de ma formation NDRC au Pole supérieur de Baudimont sans vraiment accrocher a l'outil. Puis cette année avec l'ascenseur 301, j'ai réelement découvert la puissance et surtout compris que la plupart des grosses entreprises s'en servent pour concevoir leurs site.</p>
                            </div>
                            <div className="mt-4 bg-gray-800 shadow-lg rounded-md p-4">
                                <div className="flex align-middle justify-start my-2 px-3">
                                    <img src="/storage/img/prestashop.svg" className="max-h-8" alt="CSS3" />
                                    <h4 className="text-xl ml-3">Prestashop</h4>
                                </div>
                                <div className="progress"></div>
                                <p>Pour l'instant j'ai pas encore prévu le paragraphe qui en parle mais il est la, on sait jamais si je trouve la motivation de le remplir au lieu de développer de nouvelles fonctionnalités sur un de mes projets.</p>
                            </div>
                        </div>
                        <div className="h-full hidden md:block">
                            <img src="/storage/img/illustrations/wordpress.svg" className="my-auto w-full" alt="CMS" style={{maxHeight: 450}} />
                        </div>
                    </div>
                </div>
                <div className="md:my-12 md:h-1" ></div>
                <div className="w-full bg-gray-800 p-4 rounded-md shadow-lg mt-4" id="contact">
                    <h3 className="text-2xl text-white">Nous contacter</h3>
                    <ValidationErrors errors={errors} className="mt-4" />
                    <div className="grid md:grid-cols-2 gap-4">
                        <form onSubmit={submit}>
                            <div className='mt-4'>
                                <Label forInput="email" value="Email" />

                                <Input
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={false}
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
                                    isFocused={false}
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
                        <div className="align-middle justify-center hidden md:flex">
                            <img src="/storage/img/illustrations/desk.svg" alt="Contact" className="w-full max-h-96"/>
                        </div>
                    </div>
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