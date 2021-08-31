export default function Message ({message}){
    return (
        <div className="bg-gray-800 rounded-md rounded-br-none self-end w-3/4 text-gray-100 p-4">
            <h3>{message.auth}</h3>
            <p>{message.message}</p>
        </div>
    )
}