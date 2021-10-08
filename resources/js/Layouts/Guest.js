import ApplicationLogo from '../Components/ApplicationLogo';
import Dropdown from '../Components/Dropdown';
import NavLink from '../Components/NavLink';
import React, { useState } from 'react';
import ResponsiveNavLink from '../Components/ResponsiveNavLink';
import { InertiaLink } from '@inertiajs/inertia-react';
import Footer from './Footer';
import HeroBanner from '@/Components/Home/HeroBanner';


const navigation = [
  {
    'name': 'Mes projets',
    'link': 'projects'
  },
  {
    'name': 'Mes réalisations',
    'link': 'realisations',  
  },
  {
    'name': 'Actualité',
    'link': 'actus'
  },
  {
    'name': 'Tchat',
    'link': 'tchat'
  }
]
const profile = ['Your Profile', 'Settings', 'Sign out']

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Guest({children, header, errors}) {

  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
        {route().current('home')
            ?
                <HeroBanner/>
            :
            null
        }
        <nav className="bg-gray-800 border-b border-indigo-500 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <InertiaLink href={route('home')} as="button">
                                <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                            </InertiaLink>
                        </div>

                        <div className={"hidden bg-gray-800 sm:-my-px sm:flex"}>
                            {navigation.map((item, key) => (
                                <NavLink href={route(item.link)} key={key} active={route().current(item.link)} as="button">
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="ml-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex bg-indigo-500 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-100 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            Utilisateur

                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('login')} method="get" as="a">
                                        Connexion
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('register')} method="get" as="a">
                                        Inscription
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                <div className="pt-2 pb-3 space-y-1">
                    {navigation.map((item, key) => (
                        <ResponsiveNavLink
                            key={key}
                            method="get"
                            href={route(item.link)}
                            active={route().current(item.link)}
                        >
                            <div className="text-white">
                                {item.name}
                            </div>
                        </ResponsiveNavLink>
                    ))}
                    
                </div>

                <div className="pb-1 border-t bg-gray-800 border-gray-200">
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink method="get" href={route('login')} active={route().current('login')}>
                            <div className="text-white px-2 py-1 w-full">
                                Connexion
                            </div>
                        </ResponsiveNavLink>
                        <ResponsiveNavLink method="get" href={route('register')} active={route().current('register')}>
                            <div className="text-white px-2 py-1 w-full">
                                Inscription
                            </div>
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>

        {header && (
            <header className="bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-gray-100">
                    <div className="bg-yellow-600 rounded-md shadow-lg p-4"><i className="fas fa-exclamation-circle"></i> Cette version est une version de développement, les accès a votre compte peuvent etre supprimés lors d'un import d'une nouvelle base de données ! Dernière maj des données : 06/10/2021 20:59 (si vous avez créé votre compte après cette date, il n'a pas été supprimé :) )</div>
                    {/* {header} */}
                </div>
            </header>
        )}
        
        <main className="max-w-7xl mx-auto py-6 pb-0 px-4 sm:px-6 lg:px-8">{children}</main>
        <Footer />
    </div>
);
}
