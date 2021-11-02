import React from 'react'
import {Parallax} from 'react-parallax';
import Flex3d from '@/Components/Flex3d';
import ReactTooltip from 'react-tooltip';
import { InertiaLink } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

export default function HeroBanner() {

    const {t} = useTranslation();

    return (
        <div>
            <Parallax 
                blur={{min: -10, max: 10}} 
                bgImage={'/storage/img/illustrations/herobanner.png'} 
                bgImageAlt={'Bannière'} 
                strength={-150} 
                bgImageStyle={{minWidth: 1920}} 
                className="rounded-md shadow-lg"
            >
                <div className="max-w-7xl md:mx-auto md:py-36 py-2 md:my-auto mx-2">
                    <div className="flex flex-col md:flex-row gap-4 my-auto">
                        <div className="w-full h-full md:w-1/3 p-4 my-2 md:my-0 bg-transparent">
                            {/* <h3 className="text-2xl text-white">Salut c'est Flex !</h3> */}
                            <Flex3d />
                        </div>
                        <div className="w-full md:w-2/3 flex flex-col justify-start align-middle self-stretch bg-opacity-80 p-4 bg-gray-800 rounded-xl shadow-lg overflow-hidden text-white" >
                            <ReactTooltip/>
                            <div className="my-auto">
                                <p className="my-2">{parse(t("hero.paragraph1"))}</p>
                                <p className="my-2">{parse(t('hero.paragraph2'))}</p>
                                <p className="my-2">En plus de cette formation, j'essaye de mon coté d'apprendre le language <span className="text-indigo-500" data-tip="Ce site est construit avec React">React</span> et React Native. Chaque conseil est bon à prendre, je vous glisse <a target="_blank" href="https://discord.gg/j3U9WSCvGR" className="text-indigo-500">mon serveur Discord</a>.</p>
                                <p className="my-2">{parse(t('hero.paragraph4'))} <InertiaLink href={"#contact"} method="get" as="a" className='text-indigo-500'>{t('contactMe')}</InertiaLink>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    )
}
