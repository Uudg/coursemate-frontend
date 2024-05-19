interface ReplyProps {
    reply: {
        _id: string;
        body: string;
        author: {
            _id: string;
            fullname: string;
        }
    },
    del_reply: (id: string) => void;
}

import { useNavigate } from "react-router-dom";

    const Reply: React.FC<ReplyProps> = ({ reply, del_reply }) => {
    const user = localStorage.getItem('user');
    let id;
    if (user) {
        id = JSON.parse(user).id;
    }

    const navigate = useNavigate();
    return(
        <div className="reply row">
            <div className="avatar" onClick={() => navigate(`/users/${reply.author._id}`)}>
                <img src={`${import.meta.env.VITE_API_URL}/public/profile/${reply.author._id}.jpg`} alt="" />
            </div>
            <div className="column">
                <div className="name" onClick={() => navigate(`/users/${reply.author._id}`)}>{reply.author.fullname}</div>
                <div className="body">{reply.body}</div>
            </div>
            {reply.author._id === id && (
                <button onClick={() => del_reply(reply._id)}>Delete</button>
            )}
        </div>
    )
}

export default Reply;