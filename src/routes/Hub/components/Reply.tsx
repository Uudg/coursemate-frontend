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
import useAuth from "../../../auth/useAuth";

const Reply: React.FC<ReplyProps> = ({ reply, del_reply }) => {
    
    const {user} = useAuth();

    const navigate = useNavigate();

    const len = 30;
    const words = reply.body.split(' ');
    const displayBody = words.length > len ? words.slice(0, len).join(' ') + '...' : reply.body;

    return(
        <div className="reply row">
            <div className="avatar" onClick={() => navigate(`/users/${reply.author._id}`)}>
                <div>
                    <img src={`${import.meta.env.VITE_API_URL}/public/profile/${reply.author._id}.jpg`} alt="" />
                </div>
            </div>
            <div className="column">
                <div className="name" onClick={() => navigate(`/users/${reply.author._id}`)}>{reply.author.fullname}</div>
                <div className="body">{displayBody}</div>
            </div>
            {user && reply.author._id === user._id && (
                <button onClick={() => del_reply(reply._id)}><i></i></button>
            )}
        </div>
    )
}

export default Reply;