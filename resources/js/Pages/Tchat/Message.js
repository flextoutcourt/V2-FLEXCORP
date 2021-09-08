export default function Message ({message, auth}){
    return (
        (message.user
        ?
            (auth.user.id === message.user_id 
            ?
                <div className="bg-gray-800 rounded-xl rounded-br-none self-end max-w-3/4 text-gray-100 p-4 my-2 message-gradient">
                    <h3>{auth.user.name}</h3>
                    <p>{message.message}</p>
                </div>
            :
                <div className="bg-gray-800 rounded-xl rounded-bl-none self-start max-w-3/4 text-gray-100 p-4 my-2 message-gradient">
                    <h3>{message.user[0].name ?? message.user.name}</h3>
                    <p>{message.message}</p>
                </div>
            )
        :
            (message.auth.id === auth.user.id)
            ?
                <div className="bg-gray-800 rounded-xl rounded-br-none self-end max-w-3/4 text-gray-100 p-4 my-2 message-gradient">
                    <h3>{message.auth.name}</h3>
                    <p>{message.message}</p>
                </div>
            :
                <div className="bg-gray-800 rounded-xl rounded-bl-none self-start max-w-3/4 text-gray-100 p-4 my-2 message-gradient">
                    <h3>{message.auth.name}</h3>
                    <p>{message.message}</p>
                </div>
        )
    )
}