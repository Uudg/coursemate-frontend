import { FormEvent, useEffect, useRef, useState } from "react";
interface ChatProps {
    id: string;
}


type MessageType = {
    _id: string;
    body: string;
    author: {
        _id: string;
        username: string;
    }
}

import { get_chat } from "../../../api/chats";
import { useNavigate } from "react-router-dom";

const Chat: React.FC<ChatProps> = ({ id }) => {

    const navigate = useNavigate();
    const connection = useRef<WebSocket | null>(null)

    const [messages, setMessages] = useState<MessageType[]>([]);
    const [message, setMessage] = useState('');
    const [currentUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))

    const send = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() !== '' && connection.current) { 
            const newMessage: MessageType = {
                _id: id, // Generate a temporary ID
                body: message,
                author: {
                    _id: currentUser.id,
                    username: currentUser.username
                }, // Use the current user as the author
            };


            setMessages((prevMessages) => [...prevMessages, newMessage]);

            connection.current.send(JSON.stringify({ type: 'message', body: message }));
            setMessage('');
        }
    }
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
     
    useEffect(() => {
        if (connection.current) connection.current.close()
        connection.current = get_chat(id);
        setMessages([])
        
        if (connection.current) {
            connection.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'message_deleted') {
            // If a message was deleted, remove it from the msgs state
            setMessages((prevMessages) => prevMessages.filter(message => message._id !== data.messageId));
        } else {
            // Otherwise, add the new message(s) to the msgs state
            const new_data = data.messages ? data.messages : [data];
            setMessages((prevMessages) => {
                const newMessages = new_data.filter(
                    (newMessage: MessageType) => !prevMessages.some((prevMessage) => prevMessage._id === newMessage._id)
                );
                return [...prevMessages, ...newMessages];
            });
        }
        };
        }
    }, [id]);


    useEffect(() => {
        scrollToBottom()
    }, [messages])
    return(
        <div className="chat column">
            <div className="messages">
                {messages.map((message, i) => (
                    <div key={i} className={`message ${currentUser.id === message.author._id ? 'active' :    ''}`}>
                        <div className="row a-center top">
                                {currentUser.id !== message.author._id ? <div className="username" onClick={() => navigate('/users/'+message.author._id)}> 
                                @{message.author.username}
                            </div> : ''}
                            <div className="date">
                                {new Date(parseInt(message._id.substring(0, 8), 16) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <div className="body">
                            {message.body}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="post">
                <form autoComplete="off" onSubmit={(e) => send(e)}>
                    <label htmlFor="reply-input" className="row">
                        <input 
                            type="file" 
                            id="file-input" 
                            style={{ display: 'none' }} 
                        />
                        <button type="button" onClick={() => document.getElementById('file-input')?.click()}>
                            <i id="attach"></i>
                        </button>
                        
                <input value={message} type="text" placeholder="Type a message..." onChange={(e) => setMessage(e.target.value)}/>
                        <button className="row a-center"><span>Send</span> <i id="send"></i></button>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Chat;