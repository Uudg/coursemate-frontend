import { useEffect } from "react";
import Chat from "./Chat";

interface ChatViewProps {
    chat: string;
}
const ChatView = ({ chat }: ChatViewProps) => {
    useEffect(() => {
        console.log(chat)
    }, [chat])

    return (
        <>
            {chat && (
                <Chat id={chat}/>
            )}
        </>
    )
}

export default ChatView;