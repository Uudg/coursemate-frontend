import { Post } from '../../../models/Hub';
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router'
import { like, dislike } from "../../../api/hub";
import { useState } from 'react';

const PostPreview = ({ post }: { post: Post }) => {
    const navigate = useNavigate();
    const { _id, liked: initialLiked, disliked: initialDisliked, likes: initialLikes, dislikes: initialDislikes, user_id, fullname, created_at, university, title, content, replies } = post;
    const [liked, setLiked] = useState(initialLiked);
    const [disliked, setDisliked] = useState(initialDisliked);
    const [likes, setLikes] = useState(initialLikes ? initialLikes.length : 0);
    const [dislikes, setDislikes] = useState(initialDislikes ? initialDislikes.length : 0);

    const handleLike = async () => {
        try {
            if (liked) {
                setLiked(false);
                setLikes(likes - 1);
            } else {
                await like(_id);
                setLiked(true);
                setLikes(likes + 1);
                if (disliked) {
                    setDisliked(false);
                    setDislikes(dislikes - 1);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleDislike = async () => {
        try {
            if (disliked) {
                setDisliked(false);
                setDislikes(dislikes - 1);
            } else {
                await dislike(_id);
                setDisliked(true);
                setDislikes(dislikes + 1);
                if (liked) {
                    setLiked(false);
                    setLikes(likes - 1);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='post-preview column col col-sm-12'>
            <div className={`top row`}>
                <div className="user-view row">
                    <div className="user-img">
                        <img src={`${import.meta.env.VITE_API_URL}/public/profile/${user_id}.jpg`} alt="" />
                    </div>
                    <div className="column">
                        <div className="row a-center">
                            <div className="name" onClick={() => navigate('/users/' + user_id)}>{fullname}</div>
                            <div className="date">
                                {created_at ? formatDistanceToNow(new Date(created_at), { addSuffix: true }) : ''}
                            </div>
                        </div>
                        <div className="uni">
                            {university}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`body column`} onClick={() => navigate('/hub/' + _id)}>
                <div className="title">
                    {title}
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
            <div className={`bot row`}>
                <div className={`data row`}>
                    <button className={`likes ${liked ? 'active' : ''}`} onClick={handleLike}>
                        <i id="likes"> </i>
                        <div className="number">
                            {likes ? likes : 0}
                        </div>
                    </button>
                    <button className={`dislikes ${disliked ? 'active' : ''}`} onClick={handleDislike}>
                        <i id="dislikes"> </i>
                        <div className="number">
                            {dislikes ? dislikes : 0}
                        </div>
                    </button>
                    <button className="replies" onClick={() => navigate(`/hub/${_id}`)}>
                        <i id="replies"> </i>
                        <div className="number">
                            {replies}
                        </div>
                    </button>
                </div>
                <button className="reply">
                    Reply
                </button>
            </div>
        </div>
    )
}

export default PostPreview;