import { useState } from "react";
import { create_post } from "../../../api/hub";
import Alert from "../../../layouts/Alert";

const CreatePost = () => {

    const [active, setActive] = useState(false);
    const placeholder = 'Write your post here...';
    const [content, setContent] = useState(placeholder);
    const [title, setTItle] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const cancel = () => {
        setContent(placeholder);
        setTItle(placeholder);
        setTags([]);
        setActive(false);
        console.log(active)
    }

    const handleFocus = () => {
        if (content === placeholder) {
            setContent('');
        }
    }

    const [error] = useState('')

    const handleBlur = () => {
        const textContent = document.getElementById('editor')?.innerText || '';
        if (textContent.trim() === '') {
            setContent(placeholder);
        } else {
            setContent(textContent);
        }
    };

    const save = () => {
        const textContent = document.getElementById('editor')?.innerText || ''
        create_post({title, content: textContent, tags})
            .then(() => {
                setAlertMessage('Post created successfully');
                setAlertType('success');
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                    setAlertMessage('');
                    setAlertType('');
                }, 3000)
                cancel();
            })
            .catch(err => console.error(err));
        cancel();
    }

    const removeTag = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return(
        <div className="col col-sm-12 preview">
            {alert && <Alert message={alertMessage} type={alertType} />}
        {!active ?
            <div className="row a-center top" onClick={() => setActive(!active)}>
                <div className="avatar">
                    <img src={`${import.meta.env.VITE_API_URL}/public/profile/${user.id}.jpg`} alt="" />
                </div>
                <p>What's happening?</p>
            </div>
        :
            <div className="create column">
                <div className="row a-center">
                    <div className="avatar">
                        <img src={`${import.meta.env.VITE_API_URL}/public/profile/${user.id}.jpg`} alt="" />
                    </div>
                    <input type="text" placeholder="Title" className="title" onChange={(e) => setTItle(e.target.value)}/>
                </div>
                <div id="editor" contentEditable={true} onFocus={handleFocus} onBlur={handleBlur}>
                    {content}
                </div>
                <div className="column">
                    <div className="tags row">
                        {tags.map((tag, i) => (
                            <span key={i} onClick={() => removeTag(i)}>#{tag}</span>
                        ))}
                    </div>
                        {tags[0] ? <p>To remove tags click on them</p> : ''}
                        <input 
                            type="text" 
                            placeholder="Add tags" 
                            onKeyUp={(e) => {
                                if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                                    setTags([...tags, e.currentTarget.value]);
                                    e.currentTarget.value = '';
                                }
                            }}
                        />
                </div>
                {error && <p className="error">{error}</p>}
                {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
                <div className="row a-center btns">
                    <button onClick={cancel} className="cancel">Cancel</button>
                    <button onClick={save} className="save">Post</button>
                </div>
            </div>    
        }
    </div>
    )
}

export default CreatePost;