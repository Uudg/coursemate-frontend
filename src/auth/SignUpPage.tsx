import { statuses, universities, faculties } from '../data';
import { FocusEvent, FormEvent, useState } from 'react';
// import { check_username, generate_code, confirm_code, signup } from '../../api/auth';
import { check_username, sign_up} from '../services/auth.service'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    // const [code, setCode] = useState('');
    // const [ifCode, setIfCode] = useState(false);
    // const [codeConfirmed, setCodeConfirmed] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({
        username: false,
        email: false,
        fullname: false,
        password: false,
    })
    const [user, setUser] = useState({
        email: '',
        fullname: '',
        username: '',
        password: '',
        university: universities[0],
        faculty: faculties[0],
        status: statuses[0]
    })
    const [ifUsername, setIfUsername] = useState<boolean>();

    const check = (val: string) => {
        check_username(val)
        .then(response => {
            setIfUsername(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const save = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sign_up(user)
            .then(() => {
                setMessage('Welcome to Coursemate!')
                setTimeout(() => {
                    navigate('/sign-in')
                }, 2000)
            })
            .catch(err => {
                console.log(err);
            })

        // if (code) {
        //     confirm_code(user.email, code)
        //     .then(() => {
        //         setCodeConfirmed(true);
        //         signup(user)
        //         .then(response => {
        //             console.log(response.data);
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        // }else {
        
        const newErrors = {
            email: user.email === '',
            fullname: user.fullname === '',
            username: user.username === '',
            password: user.password === '', // Add this line
        };

        setErrors(newErrors);

        //     // Only log the user data if all fields are filled
        //     if (!Object.values(newErrors).includes(true)) {
        //         console.log(user);
        //     }

        //     generate_code(user.email)
        //     .then(() => {
        //         setIfCode(true);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        
        // }
    }

    return(
        <div className="auth column center">
            <div className="form column">
                <a href="/sign-in">Back to login</a>
                <h2>Sign up</h2>
                <form onSubmit={(e) => save(e)}>
                    <label htmlFor="email">
                        Email:
                        <input type="email" id="email" className={errors.email ? 'error' : ''} onChange={(e) => setUser({...user, email: e.target.value})} />
                    </label>
                    <label htmlFor="fullname">
                        Full name:
                        <input type="text" id="fullname" className={errors.fullname ? 'error' : ''} onChange={(e) => setUser({...user, fullname: e.target.value})} />
                    </label>
                    <label htmlFor="username" >
                        Username:
                        <input type="text" id="username" className={errors.username ? 'error' : ''} onChange={(e) => {
                            check(e.target.value)
                            setUser({...user, username: e.target.value})
                        }}/>
                        {ifUsername === false && <div className="error">Username already taken</div>}
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input type="password" id="password" className={errors.password ? 'error' : ''} onChange={(e) => setUser({...user, password: e.target.value})} />
                    </label>
                    <label htmlFor="uni">
                        University:
                        <select id="uni" onChange={(e) => setUser({...user, university: e.target.value})}>
                            {universities.map((uni, i) => <option key={i}>{uni}</option>)}
                        </select>
                    </label>
                    <label htmlFor="faculty">
                        Faculty:
                        <select id="faculty" onChange={(e) => setUser({...user, faculty: e.target.value})}>
                            {faculties.map((faculty, i) => <option key={i}>{faculty}</option>)}
                        </select>
                    </label>
                    <label htmlFor="status">
                        Status:
                        <select id="status" onChange={(e) => setUser({...user, status: e.target.value})}>
                            {statuses.map((status, i) => <option key={i}>{status}</option>)}
                        </select>
                    </label>
                    <div className="msg">
                        {message}
                    </div>
                    {/* <div className="code">
                        {ifCode && <input type="text" onChange={(e) => setCode(e.target.value)} />}
                    </div> */}
                    <button>
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;