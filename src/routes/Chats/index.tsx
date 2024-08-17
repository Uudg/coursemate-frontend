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
        <div className="chats column">
            <h1>Chats</h1>
            <div className="chat-window">
                <div className={`block ${opened ? 'active' : ""}`}>
                    <ChatList setChat={set} />
                    <ChatView chat={chat} />
                </div>
            </div>
        </div>
    )
}

export default Chats;