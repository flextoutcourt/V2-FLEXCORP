import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, active = false, children }) {
    return (
        <InertiaLink
            method={method}
            as={as}
            href={href}
            className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
                active
                    ? 'border-indigo-400 text-white bg-indigo-500 focus:outline-none focus:text-white '
                    : 'border-transparent text-gray-600 hover:text-white hover:bg-indigo-500 focus:text-white'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-400 hover:border-indigo-300 focus:bg-indigo-400 focus:border-indigo-300`}
        >
            {children}
        </InertiaLink>
    );
}
