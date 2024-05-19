import { useState } from "react";
import useAuth from "../../auth/useAuth";
import Alert from "../../layouts/Alert";

const Settings = () => {
    const {signOut, changePasword} = useAuth()

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleChangePassword = async (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            changePasword(currentPassword, newPassword)
                .then(() => {
                    setAlertMessage('Password changed successfully');
                    setAlertType('success');
                    setAlert(true);
                    setCurrentPassword('');
                    setNewPassword('');

                    setTimeout(hideAlert, 3000)
                })
                .catch(err => {
                    setAlert(true);
                    setAlertMessage(err.response.data.error);
                    setAlertType('error');
                    setTimeout(hideAlert, 3000)
                })
    };

    
    const hideAlert = () => {
        setAlert(false);
        setAlertMessage('');
        setAlertType('');
    }


    return(
        <div className="settings column">
            {alert && <Alert message={alertMessage} type={alertType}/>}
            <h1>Settings</h1>
            <form onSubmit={handleChangePassword} className="column">
                <label>
                    Current Password:
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                </label>
                <label>
                    New Password:
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </label>
                <button type="submit" className="changepassword">Change Password</button>
            </form>
            <button onClick={signOut} className="logout">Logout</button>
        </div>
    )
}

export default Settings;