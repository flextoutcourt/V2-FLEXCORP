import React from 'react'
import ReactTooltip from 'react-tooltip';
import './slideshow.css'

export default function SlideShow({props}) {

    const languages = [
        {
            title: 'HTML',
            icon: 'img/html5.svg',
            color: '#DD4B25',
            tooltip: 'HTML 5',
            link: '',
        },
        {
            title: 'CSS',
            icon: 'img/css3.svg',
            color: '#254BDD',
            tooltip: 'CSS 3',
            link: '',
        },
        {
            title: 'JS',
            icon: 'img/js.svg',
            color: '#EFD81D',
            tooltip: 'Javascript',
            link: '',
        },
        {
            title: 'PHP',
            icon: 'img/php.svg',
            color: "#8993be",
            tooltip: 'PHP',
            link: '',
        },
        {
            title: 'React',
            icon: 'img/rn.svg',
            color: '#61dbfb',
            tooltip: 'React',
            link: '',
        },
        {
            title: 'Laravel',
            icon: 'img/laravel.svg',
            color: '#fb503b',
            tooltip: 'Laravel 8',
            link: '',
        },
        {
            title: 'React Native',
            icon: 'img/rn.svg',
            color: '#61dbfb',
            tooltip: 'React Native',
            link: '',
        },
        {
            title: 'Bootstrap',
            icon: 'img/bootstrap.svg',
            color: '#7310EF',
            tooltip: 'Bootstrap',
            link: '',
        },
        {
            title: 'Tailwind Css',
            icon: 'img/tailwindcss.svg',
            color: '#15B3C0',
            tooltip: 'TailwindCss',
            link: '',
        },
        {
            title: 'Jquery',
            icon: 'img/jquery.svg',
            color: '#0769AD',
            tooltip: 'JQuery',
            link: '',
        },
        {
            title: 'Mysql',
            icon: 'img/mysql.svg',
            color: '#00758F',
            tooltip: 'MySQL',
            link: '',
        },
        {
            title: 'Typo3',
            icon: 'img/typo3.svg',
            color: '#F49800',
            tooltip: 'Typo 3',
            link: '',
        },
        {
            title: 'NodeJS',
            icon: 'img/nodejs.svg',
            color: '#026E00',
            tooltip: 'Node JS 14',
            link: '',
        },
        {
            title: 'Wordpress',
            icon: 'img/wordpress.svg',
            color: '#21759b',
            tooltip: 'Wordpress',
            link: '',
        },
        {
            title: 'Prestashop',
            icon: 'img/prestashop.svg',
            color: '#21759b',
            tooltip: 'Prestashop',
            link: '',
        }
    ]

    const Item = ({item, key}) => {
        return (
            <div className="slideshow-item bg-gray-900" key={key} data-tip={item.tooltip}>
                <a href="{https://developer.mozilla.org/fr/docs/Web/HTML}" target="_blank" title={item.title} className="text-indigo-500">
                    <img src={'storage/'+item.icon} alt={item.title} className="h-16 w-full" title={item.title} />
                    <p>{item.title}</p>
                </a>
            </div>
        )
    }

    const SlideShowItem = () => {
        return (
            <div className="slideshow mt-4">
                {languages.map((item, key) => (
                    <Item item={item} key={key} />
                ))}
            </div>
        )
    }

    return (
        <div className="flex">
            <ReactTooltip/>
            <SlideShowItem/>
            <SlideShowItem/>
        </div>
      )
}
