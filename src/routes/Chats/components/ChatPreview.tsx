interface ChatPreviewProps {
    chat: any; // Replace 'any' with the actual type of the chat
    setChat: (id: string) => void;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ chat, setChat }) => {
    return ( 
        chat && (
            <div className="chat-preview row a-center" onClick={() => setChat(chat._id)}>
                <div className="avatar">
                    <div className="members">{chat.members.length}</div>
                    <div className="img">
                        <img src="https://via.placeholder.com/150" alt="Avatar" />
                    </div>
                </div>
                <div className="column">
                    <div className="title">
                        {chat.title}
                    </div>
                    <div className="last">
                        {chat.messages[chat.messages.length - 1] ? `@${chat.messages[chat.messages.length - 1].author.username}: ${chat.messages[chat.messages.length - 1].body}` : ''}
                    </div>
                </div>
                <div className="info">
                    <div className="time"></div>
                    <div className="unread center">
                        1
                    </div>
                </div>
            </div>
        )
    )
}

export default ChatPreview;