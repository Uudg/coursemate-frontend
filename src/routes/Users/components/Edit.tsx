import { useRef, useState } from "react";
// import Props from "./Props";
import { update_user } from "../../../api/user";
import { statuses } from "../../../data";

interface Props {
    setEdit: (value: boolean) => void;
    data: any;
}

const Edit = ({setEdit, data}: Props) => {

    const [user, setUser] = useState(data);

    const bgFileInputRef = useRef<HTMLInputElement>(null);
    const avatarFileInputRef = useRef<HTMLInputElement>(null);
    const [selectedBgImage, setSelectedBgImage] = useState<string | null>(null);
    const [selectedAvatarImage, setSelectedAvatarImage] = useState<string | null>(null);
    // const [imageUpdateTime, setImageUpdateTime] = useState(Date.now());

    const handleBgFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const localImageUrl = URL.createObjectURL(file);
            setSelectedBgImage(localImageUrl);
        }
    };

    const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const localImageUrl = URL.createObjectURL(file);
            setSelectedAvatarImage(localImageUrl);
        }
    };

    const handleBgClick = () => {
        bgFileInputRef.current?.click();
    };

    const handleAvatarClick = () => {
        avatarFileInputRef.current?.click();
    };

    const save = async () => {
        const bgFile = bgFileInputRef.current?.files?.[0];
        const avatarFile = avatarFileInputRef.current?.files?.[0];

        const formData = new FormData();
        if (bgFile) {
            formData.append('bg', bgFile);
            await setUser((prev: any) => ({
                ...prev,
                bg_img: true
            }))
        }
        if (avatarFile) {
            formData.append('avatar', avatarFile);
            await setUser((prev: any) => ({
                ...prev,
                profile_img: true
            }))
        }

        const data = {
            status: user.status,
            bg_img: user.bg_img,
            profile_img: user.profile_img
        }

        update_user(user._id.toString(), data, formData)
            .then(() => {
                setEdit(false)
                window.location.reload();
            })
            .catch(err => console.error(err));
    }

    return(
        <>
        <div className="edit user column col col-sm-12">
            <div className="top">
                <input type="file" ref={bgFileInputRef} onChange={handleBgFileChange} style={{ display: 'none' }} />
                <input type="file" ref={avatarFileInputRef} onChange={handleAvatarFileChange} style={{ display: 'none' }} />
                <div className="bg" onClick={handleBgClick}>
                    <img src={selectedBgImage || `${import.meta.env.VITE_API_URL}/public/bg/${user._id}.jpg` || "#"} alt="" />
                </div>
                <div className="avatar" onClick={handleAvatarClick}>
                    <img src={selectedAvatarImage || `${import.meta.env.VITE_API_URL}/public/profile/${user._id}.jpg`} alt="" />
                </div>
            </div>
            <div className="body column">
                <div className="btns row">
                    <button className="edit" onClick={() => setEdit(false)}>
                        Cancel
                    </button>
                    <button onClick={save}>
                        Save
                    </button>
                </div>
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
                        <select value={user.status} onChange={(e) => setUser({...user, status: e.target.value})}>
                            {statuses.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Edit;