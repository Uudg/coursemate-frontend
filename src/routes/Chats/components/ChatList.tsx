// ChatList.tsx
import { useEffect, useState } from "react";
import { get_chats } from "../../../api/chats";
import ChatPreview from "./ChatPreview";

interface Props {
    setChat: (id: string) => void;
}

const ChatList = ({ setChat } : Props) => {
    const [chats, setChats] = useState<Object[]>()
    let user = localStorage.getItem('user');
    if (user) user = JSON.parse(user);

    const get = () => {
        if (user)
        get_chats()
        .then(res => {
            setChats(res.data)
        })
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <div className="list">
            {chats ? (
                <>
                    {chats.map((chat: any, i: number) => (
                        <ChatPreview key={i} chat={chat} setChat={setChat} />
                    ))}
                </>
            ): 'Loading...'}
        </div>
    )
}

export default ChatList;