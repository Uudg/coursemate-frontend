import { useParams } from "react-router-dom";
import { get_post } from "../../../api/hub";
import { useEffect, useState } from "react";
// import { PostProps } from "./interfaces";
import { useNavigate } from "react-router-dom";
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
        {post ? (<div className="post grid">
            <div className="col col-sm-12">
                <div className="btns">
                    <button onClick={() => navigate(-1)} >
                        <i id="back"></i>
                    </button>
                </div>
                <div className="block">
                    <div className="grid">
                        <div className="col col-md-2 col-xl-1 col-sm-12">
                            <div className="avatar" onClick={() => navigate('/users/' + post.author._id)}>
                                <img src={`${import.meta.env.VITE_API_URL}/public/profile/${post.author._id}.jpg`} alt="Avatar image" />
                            </div>
                        </div>
                        <div className="col col-md-7 col-xl-8 col-sm-12 row a-center">
                            <div className="column">
                                <div className="row a-center">
                                    <div className="name" onClick={() => navigate('/users/' + post.author._id)}>{post.author.fullname}</div>
                                </div>
                                <div className="uni"
                                onClick={() => navigate('/search/?q=' + encodeURIComponent(post.author.university))}
                                >{post.author.university}</div>
                            </div>
                        </div>
                        <div className="col col-sm-12 col-md-3 column j-center">
                            <div className="date">
                                {post.created_at ? new Date(post.created_at).toLocaleString([], {month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                            </div>
                        </div>
                        <div className="col col-sm-12">
                            <h3>
                                {post.title}
                            </h3>
                        </div>
                        <div className="content col col-sm-12">
                            {post.content}
                        </div>
                        <div className="tags col col-sm-12">
                            <h5>Tags</h5>
                            {post.tags.map((tag, i) => (
                            <span 
                                key={i} 
                                onClick={() => navigate('/search/?q=' + encodeURIComponent('#' + tag))}
                            >
                                #{tag}
                            </span>
                        ))}
                        </div>
                    </div>
                    
            <Replies _id={post._id}/>
                </div>
            </div>
        </div>
            ) : (
            'Loading...'
            )}
        </>
    );
}

export default Post;