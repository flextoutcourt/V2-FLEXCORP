import React from 'react'
import './slideshow.css'

export default function SlideShow({props}) {

    const languages = [
        {
            title: 'HTML',
            icon: 'https://picsum.photos/45',
            color: '#DD4B25',
            description: 'test',
        },
        {
            title: 'CSS',
            icon: 'https://picsum.photos/45',
            color: '#254BDD',
            description: 'test',
        },
        {
            title: 'JS',
            icon: 'https://picsum.photos/45',
            color: '#EFD81D',
            description: 'test',
        },
        {
            title: 'PHP',
            icon: 'https://picsum.photos/45',
            color: "#8993be",
            description: 'test',
        },
        {
            title: 'React',
            icon: 'https://picsum.photos/45',
            color: '#61dbfb',
            description: 'test',
        },
        {
            title: 'Laravel',
            icon: 'https://picsum.photos/45',
            color: '#fb503b',
            description: 'test',
        },
        {
            title: 'React Native',
            icon: 'https://picsum.photos/45',
            color: '#61dbfb',
            description: 'test',
        },
        {
            title: 'Bootstrap',
            icon: 'https://picsum.photos/45',
            color: '#7310EF',
            description: 'test',
        },
        {
            title: 'TailwindCss',
            icon: 'https://picsum.photos/45',
            color: '#15B3C0',
            description: 'test',
        },
        {
            title: 'Jquery',
            icon: 'https://picsum.photos/45',
            color: '#0769AD',
            description: 'test',
        },
        {
            title: 'Mysql',
            icon: 'https://picsum.photos/45',
            color: '#00758F',
            description: 'test',
        },
        {
            title: 'Typo3',
            icon: 'https://picsum.photos/45',
            color: '#F49800',
            description: 'test',
        },
        {
            title: 'NodeJS',
            icon: 'https://picsum.photos/45',
            color: '#026E00',
            description: 'test',
        },
    ]

    return (
        <div>
            <div class="slideshow mt-4">
            {languages.map((item, key) => (
                <div class="slideshow-item bg-gray-900" key={key}>
                    <a href="{https://developer.mozilla.org/fr/docs/Web/HTML}" target="_blank" title={item.title} class="purple-text">
                        <img src="/img/html5.svg" alt={item.title} class=" pic-sm lazyload" title="HTML 5" />
                        <p>{item.title}</p>
                    </a>
                </div>
            ))}
                {/* <div class="slideshow-item">
                    <a href="https://developer.mozilla.org/fr/docs/Web/CSS" target="_blank" title="CSS 3" class="purple-text">
                        <img src="/img/css3.svg" alt="CSS 3" class=" pic-sm lazyload" title="CSS 3" />
                        <p>CSS</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript" target="_blank" title="JavaScript" class="purple-text">
                        <img src="/img/js.svg" alt="JavaScript" class=" pic-sm lazyload" title="JavaScript" />
                        <p>JavaScript</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://api.jquery.com/" target="_blank" title="Jquery" class="purple-text">
                        <img src="/img/jquery.svg" alt="Jquery" class=" pic-sm lazyload" title="Jquery" />
                        <p>Jquery</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://getbootstrap.com/" target="_blank" title="Bootstrap" class="purple-text">
                        <img src="/img/bootstrap.svg" alt="Bootstrap" class=" pic-sm lazyload" title="Bootstrap" />
                        <p>Bootstrap</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://tailwindcss.com/" target="_blank" title="TailwindCSS" class="purple-text">
                        <img src="/img/tailwindcss.svg" alt="TailwindCSS" class=" pic-sm lazyload" title="TailwindCSS" />
                        <p>TailwindCss</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://dev.mysql.com/" target="_blank" title="MySQL" class="purple-text">
                        <img src="/img/Mysql.svg" alt="MySQL" class=" pic-sm lazyload" title="MySQL" />
                        <p>MySQL</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://php.net" target="_blank" title="PHP" class="purple-text">
                        <img src="/img/PHP.svg" alt="PHP" class=" pic-sm lazyload" title="PHP" />
                        <p>PHP</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://reactnative.dev/" target="_blank" title="React Native" class="purple-text">
                        <img src="/img/RN.svg" alt="React Native" class=" pic-sm lazyload" title="React Native" />
                        <p>React Native</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://fr.reactjs.org/" target="_blank" title="React" class="purple-text">
                        <img src="/img/RN.svg" alt="React" class=" pic-sm lazyload" title="React" />
                        <p>React</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://laravel.com/" target="_blank" title="Laravel" class="purple-text">
                        <img src="/img/laravel.svg" alt="Laravel" class=" pic-sm lazyload" title="Laravel" />
                        <p>Laravel</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://nextjs.com/" target="_blank" title="nextjs" class="purple-text">
                        <img src="/img/nextjs.png" alt="nextjs" class=" pic-sm lazyload" title="nextjs" />
                        <p>Next JS</p>
                    </a>
                </div>
                <div class="slideshow-item">
                    <a href="https://wordpress.org/" target="_blank" title="Wordpress" class="purple-text">
                        <img src="/img/wp-logo.png" alt="Wordpress" class=" pic-sm lazyload" title="Wordpress" />
                        <p>Wordpress</p>
                    </a>
                </div> */}
            </div>
        </div>
      )
}
