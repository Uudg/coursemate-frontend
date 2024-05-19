import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../../auth/useAuth';

const Navbar = () => {
    const navigate = useNavigate();
    const location  = useLocation();

    const {user} = useAuth();
    if (!user) return null;

    useEffect(() => {
        setMobile(false)
    }, [location])

    const [mobile, setMobile] = useState(false);

return(
        <div className={`navbar fixed ${mobile ? 'mobile' : ''}`}>
            <div className="profile column a-center" onClick={() =>  navigate('/users/' + user.id)}>
                <div className="avatar">
                    <img src={`${import.meta.env.VITE_API_URL}/public/profile/${ user.id}.jpg`} alt="Avatar image" />
                </div>
                <div className="fullname">{user ? user.fullname : 'Loading...'}</div>
                <div className="username">@{ user.username}</div>
            </div>
            <div className="navs">
                <NavLink to="/dashboard"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id='dashboard'></i>
                    Dashboard
                </NavLink>
                <NavLink to="/chats"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id="chats"></i>
                    Chats
                </NavLink>
                <NavLink to="/ai"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id="ai"></i>
                    HelpyAI
                </NavLink>
                <NavLink to="/search" className={({isActive, isPending}) => isPending ? "pending" : isActive ? "active" : ""}>
                    <i id="search"></i>
                    Search
                </NavLink>
                <NavLink to="/hub"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id="hub"></i>
                    Mate Hub
                </NavLink>
                <NavLink to={`/users/${ user.id}`}
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id="profile"></i>
                    Profile
                </NavLink>
                <NavLink to="/settings"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id="settings"></i>
                    Settings
                </NavLink>
            </div>
            <div className="mobile-btn center" onClick={() => setMobile(!mobile)}>
                <div></div>
            </div>

            <div className="profile-mobile" onClick={() =>  navigate('/users/' + user.id)}>
                <div className="avatar">
                    <img src={`${import.meta.env.VITE_API_URL}/public/profile/${ user.id}.jpg`} alt="Avatar image" />
                </div>
                <div className="username">@{ user.username}</div> 
            </div>
            {mobile && <div className="mobile navs column">

                <NavLink to="/dashboard"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id='dashboard'></i>
                    Dashboard
                </NavLink>
                <NavLink to="/chats"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id="chats"></i>
                    Chats
                </NavLink>
                <NavLink to="/ai"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id="ai"></i>
                    HelpyAI
                </NavLink>
                <NavLink to="/search" className={({isActive, isPending}) => isPending ? "pending" : isActive ? "active" : ""}>
                    <i id="search"></i>
                    Search
                </NavLink>
                <NavLink to="/hub"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id="hub"></i>
                    Mate Hub
                </NavLink>
                <NavLink to="/settings"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    <i id="settings"></i>
                    Settings
                </NavLink>
            </div> }

        </div>
    )
}

export default Navbar;