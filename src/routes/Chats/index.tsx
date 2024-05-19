import { useState } from "react";
import ChatList from "./components/ChatList";
import ChatView from "./components/ChatView";


const Chats = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const [chat, setChat] = useState('');

    const set = (id: string) => {
        setChat(id);
        setOpened(true);
    }

    return(
        <>
            <h1>Chats</h1>
            <div className={opened ? "active chats" : "chats" }>
                <ChatList setChat={set} />
                <ChatView chat={chat} />
            </div>
        </>
    )
}

export default Chats;