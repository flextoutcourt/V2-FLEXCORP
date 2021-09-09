import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';

export default function NavLink({ href, active, children }) {
    return (
        <InertiaLink
            href={href}
            className={
                active
                    ? 'px-3 inline-flex items-center pt-1 border-b-4 border-indigo-500 text-sm font-medium leading-5 text-indigo-500 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                    : 'px-3 inline-flex items-center border-b border-indigo-500 pt-1 text-sm font-medium leading-5 text-gray-100 hover:text-indigo-500 hover:border-indigo-500 hover:border-b-2 focus:outline-none focus:text-indigo-500 focus:border-gray-300 transition duration-150 ease-in-out'
            }
        >
            {children}
        </InertiaLink>
    );
}
