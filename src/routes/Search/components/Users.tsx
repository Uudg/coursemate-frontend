import { useNavigate } from "react-router"

interface Props {
    users: []
}

const Users = ({users}: Props) => {
    const navigate = useNavigate()
    return(
        <div className="block col col-sm-12 users grid">
            <h2>People</h2>
            {
                users.map((user: any, i: number) => {
                    return(
                        <div key={i} className="user col col-sm-12 grid" onClick={() => navigate('/users/' + user._id)}>
                            <div className="col col-sm-10 col-lg-10 column j-center">
                                <div className="row wrap">      
                                    <div className="user-img">
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
                                    <div className=" column j-center">
                                        <div className="name">{user.fullname}</div>
                                        <div className="location row a-center">
                                            <i></i>
                                            {user.location}
                                        </div>
                                        <div className="uni row a-center">
                                            <i></i>{user.university}
                                        </div>
                                        <div className="caption">We are still a long way from real technologies that can change our lives</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-sm-12 col-lg-2 center">
                                <button className="friend">
                                    <i></i>
                                    MateList +
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Users;