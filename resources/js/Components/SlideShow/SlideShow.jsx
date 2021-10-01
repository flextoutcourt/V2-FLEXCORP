import React from 'react'
import ReactTooltip from 'react-tooltip';
import './slideshow.css'

export default function SlideShow({props}) {


    // const [languages, setLanguages] = useState([]);
    
    // useEffect(() => {
    //     _get_languages().then(data => setTweets(data));
    // }, []);
    
    // async function _get_languages(){
    //     const promise = axios.get(route('api.get_tweets'));
    //     const responseData = promise.then((data) => data.data);
    //     return responseData;
    // }

    const languages = [
        {
            title: 'HTML',
            icon: 'img/html5.svg',
            color: '#DD4B25',
            tooltip: 'HTML 5',
            link: 'https://developer.mozilla.org/fr/docs/Web/HTML',
        },
        {
            title: 'CSS',
            icon: 'img/css3.svg',
            color: '#254BDD',
            tooltip: 'CSS 3',
            link: 'https://developer.mozilla.org/fr/docs/Web/CSS',
        },
        {
            title: 'JS',
            icon: 'img/js.svg',
            color: '#EFD81D',
            tooltip: 'Javascript',
            link: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
        },
        {
            title: 'PHP',
            icon: 'img/php.svg',
            color: "#8993be",
            tooltip: 'PHP',
            link: 'https://php.net',
        },
        {
            title: 'React',
            icon: 'img/rn.svg',
            color: '#61dbfb',
            tooltip: 'React',
            link: 'https://reactjs.org',
        },
        {
            title: 'Laravel',
            icon: 'img/laravel.svg',
            color: '#fb503b',
            tooltip: 'Laravel 8',
            link: 'https://laravel.com',
        },
        {
            title: 'React Native',
            icon: 'img/rn.svg',
            color: '#61dbfb',
            tooltip: 'React Native',
            link: 'https://reactnative.dev',
        },
        {
            title: 'Bootstrap',
            icon: 'img/bootstrap.svg',
            color: '#7310EF',
            tooltip: 'Bootstrap',
            link: 'https://getbootstrap.com',
        },
        {
            title: 'Tailwind Css',
            icon: 'img/tailwindcss.svg',
            color: '#15B3C0',
            tooltip: 'TailwindCss',
            link: 'https://tailwindcss.com',
        },
        {
            title: 'Jquery',
            icon: 'img/jquery.svg',
            color: '#0769AD',
            tooltip: 'JQuery',
            link: 'https://jquery.com',
        },
        {
            title: 'Mysql',
            icon: 'img/mysql.svg',
            color: '#00758F',
            tooltip: 'MySQL',
            link: 'https://mysql.com',
        },
        {
            title: 'Typo3',
            icon: 'img/typo3.svg',
            color: '#F49800',
            tooltip: 'Typo 3',
            link: 'https://typo3.fr',
        },
        {
            title: 'NodeJS',
            icon: 'img/nodejs.svg',
            color: '#026E00',
            tooltip: 'Node JS 14',
            link: 'https://nodejs.org',
        },
        {
            title: 'Wordpress',
            icon: 'img/wordpress.svg',
            color: '#21759b',
            tooltip: 'Wordpress',
            link: 'https:/wordpress.com',
        },
        {
            title: 'Prestashop',
            icon: 'img/prestashop.svg',
            color: '#21759b',
            tooltip: 'Prestashop',
            link: 'https://prestashop.com',
        }
    ]

    const Item = ({item, k}) => {
        return (
            <div className="slideshow-item bg-gray-900" key={k} data-tip={item.tooltip}>
                <a href={item.link} target="_blank" title={item.title} className="text-indigo-500">
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
        <div className="flex max-w-screen">
            <ReactTooltip/>
            <SlideShowItem/>
            <SlideShowItem/>
        </div>
      )
}
