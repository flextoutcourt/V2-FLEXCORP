import React, { Component, useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Guest from '@/Layouts/Guest';

const Index = ({auth, errors}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        _get_users().then(val => setUsers(val));
    }, []);

    async function _get_users(){
        const promise = axios.get(route('api.get_users'));
        const responseData = promise.then(data => data.data);
        return responseData;
    }

    let content = () => {
        return (
            <div className="w-full">
                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group">
                        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                            <th className="bg-gray-800 p-2 text-white font-bold text-left block md:table-cell">#</th>
                            <th className="bg-gray-800 p-2 text-white font-bold text-left block md:table-cell">Name</th>
                            <th className="bg-gray-800 p-2 text-white font-bold text-left block md:table-cell">Email Address</th>
                            <th className="bg-gray-800 p-2 text-white font-bold text-left block md:table-cell">Role</th>
                            <th className="bg-gray-800 p-2 text-white font-bold text-left block md:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                    {
                        users.map((user, key) => (
                            <tr className="bg-gray-900 block md:table-row text-white" key={key}>
                                <td className="p-2 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name</span>{user.id}</td>
                                <td className="p-2 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">User Name</span>{user.name}</td>
                                <td className="p-2 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Email Address</span>{user.email}</td>
                                <td className="p-2 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Role</span>{user.role}</td>
                                <td className="p-2 text-left grid grid-cols-3 gap-2 md:table-cell">
                                    <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded">Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                                </td>
                            </tr>		
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-100 leading-tight">Administration</h2>}
        >
            {content()}
        </Authenticated>
    )
}

export default Index;
