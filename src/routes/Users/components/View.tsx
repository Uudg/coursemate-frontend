// import Props from "./Props";
// import PostPreview from "../Hub/Posts/PostPreview";
import { useEffect, useState } from "react";
import { get_post_user } from "../../../api/hub";

interface ProfileViewProps {
  setEdit: (value: boolean) => void;
  user: any; // Replace 'any' with the actual type of 'user'
}

const ProfileView: React.FC<ProfileViewProps> = ({setEdit, user}) => {
     console.log(user)
    const [posts, setPosts] = useState([]);
    const [validEdit, setValid] = useState(false);
    const get = () => { 
        if (user._id)
        get_post_user(user._id.toString())
            .then(res => {
                console.log(res.data)
                setPosts(res.data)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        get();
        const cuser = JSON.parse(localStorage.getItem('user') || '{}');
        if (cuser.id === user._id) setValid(true);
    }, [user]);

    return (
        <>
        <div className="user full column col col-sm-12">
            <div className="top">
                <div className="bg">
                    {/* {user.bg_img ? <img src={`${import.meta.env.VITE_API_URL}/public/bg/${user._id}.jpg`} alt="" /> : ''} */}
                </div>
                    {
                        user.profile_img
                        ?
                        <div className="avatar">
                                <img src={`${import.meta.env.VITE_API_URL}/public/profile/${user._id}.jpg`} alt="" />  
                        </div>
                        :
                        <div className="avatar placeholder">
                            🤨
                        </div>
                    }
            </div>
            <div className="body column">
                {validEdit ? <button className="edit" onClick={() => setEdit(true)}>Edit</button> : <button className="edit">Message</button>}
                <h3>
                    {user.fullname}
                </h3>
                <div className="uni">
                    <i></i>{user.university}
                </div>
                <div className="username">
                    @{user.username}
                </div>
                <div className="info">
                    <div className="mates">
                        <span>{user && user.mates ? user.mates.length : 0}</span> mates
                    </div>
                    <div className="status">
                        <span>{user.status}</span> status
                    </div>
                </div>
            </div>
        </div>
            {/* {posts && posts.length > 0 ? (
                posts.map((post: any, i: number) => (
                    <PostPreview key={i} post={post} />
                ))
            ) : (
                <div>No posts</div>
            )} */}
        </>
    );
}

export default ProfileView;