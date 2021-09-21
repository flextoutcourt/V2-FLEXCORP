import React from 'react';

const Language = ({data, className}) => {
    return (
        <div className={{className}, 'rounded-full flex justify-center align-middle border-4 h-full w-full text-gray-900'} style={{borderColor: data.color, backgroundColor: data.color}}>
            <div className="my-auto">
                <img src={data.icon} className="rounded-md mx-auto" alt={data.title} />
                <p class="text-center">{data.title}</p>
                <div className="relative pt-1 w-full">
                    <div className={"overflow-hidden h-2 mb-4 text-xs flex rounded bg-"+data.color+"-200"}>
                        <div style={{ width: "30%" }} className={"shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-"+data.color+"-700"}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Language;
