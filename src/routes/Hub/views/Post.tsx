import { useParams } from "react-router-dom";
import { get_post } from "../../../api/hub";
import { useEffect, useState } from "react";
// import { PostProps } from "./interfaces";
import { useNavigate } from "react-router-dom";
import {formatDistanceToNow} from 'date-fns'
import Replies from "../components/Replies";

interface PostProps {
    _id: string,
    author: {
        _id: string,
        fullname: string,
        username: string,
        university: string
    },
    title: string,
    content: string,
    tags: string[],
    created_at: string,
    likes: string[],
    dislikes: string[],
    replies: number

} 

const Post = () => {
    const { id = '' } = useParams();
    const [post, setPost] = useState<PostProps>()
    const navigate = useNavigate()

    useEffect(() => {
        get_post(id)
        .then(res => {
            setPost(res.data)
            console.log(res.data)
        })
        .catch(err => console.error(err));
    }, [])

    

    return (
        <>
        {post ? (
            <div className="post col col-sm-12">
                <div className="row user-data a-center">
                    <div className="avatar">
                        <img src={`${import.meta.env.VITE_API_URL}/public/profile/${post.author._id}.jpg`} alt="Avatar image" />
                    </div>
                    <div className="column">
                        <div className="row a-center">
                            <div className="name" onClick={() => navigate('/users/' + post.author._id)}>{post.author.fullname}</div>
                            <div className="date">
                                {post.created_at ? formatDistanceToNow(new Date(post.created_at), {addSuffix: true}) : ''}
                            </div>
                        </div>
                        <div className="uni">{post.author.university}</div>
                    </div>
                    <button onClick={() => navigate('/hub')}>Back to Hub</button>
                </div>
                <h3>{post.title}</h3>
                <div className="body">
                    {post.content}
                </div>
                <div className="tags">
                    <h5>Tags</h5>
                    {post.tags.map((tag, i) => <span key={i}>#{tag}</span>)}
                </div>
            <div/>
            <Replies _id={post._id}/>
            
        </div>
            ) : (
            'Loading...'
            )}
        </>
    );
}

export default Post;