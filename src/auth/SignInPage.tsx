import { FormEvent, useState } from "react";
import useAuth from "./useAuth";
import { Navigate } from "react-router";

const SignInPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {user, signIn} = useAuth()

    if (user) return <Navigate to="/dashboard"/>

    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signIn(username, password)
    }

    return(
        <div className="auth center">
            <div className="form column a-center">
                <h2>Sign in</h2>
                <form onSubmit={(e) => handleForm(e)}>
                    <label htmlFor="username">
                        <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label htmlFor="password">
                        <input type="password" id="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <div className="msg">

                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="signup">
                    Don't have an account? <a href="/sign-up">Sign up</a>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;