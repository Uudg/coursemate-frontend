import { FormEvent, useEffect, useState } from "react"
import useAuth from "../../auth/useAuth"
// import ReactMarkdown from 'react-markdown'
import Markdown from "react-markdown"
import { chat } from "../../api/ai"


interface Message {
    role: string,
    content: string
}

const AI = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    useEffect(() => {
        setMessages([
            {role: 'assistant', content: 'Hello, how can I help you?'}
        ])
    }, [])

    const [input, setInput] = useState('')

    const {user} = useAuth()
    if (!user) return null;

    const send = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (input.trim() === '') return
        setMessages([...messages, {role: 'user', content: input}])
        setInput('')
    }

    useEffect(() => {
        if (messages.length !== 0 && messages[messages.length - 1].role === 'user') {
            setIsLoading(true);
            chat(messages).then((response) => {
                setMessages([...messages, response.data]);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
        }
    }, [messages]);


    return (
        <div className="ai column">
            <h1>Helpy AI</h1>
            <div className="col col-sm-12 chat-window">
                <div className="block row">
                    <div className="history">
                    </div>
                    <div className="chat column">
                        <div className="messages">
                            {
                                messages && messages.map((message) => (
                                    <div className={`message row ${message.role === 'assistant' ? 'assistant' : 'user'}`}>
                                        {
                                            message.role === 'assistant' && 
                                                <div className='profile-img'>
                                                    <div className="placeholder"></div>
                                                </div>
                                        }
                                        <div className="body">
                                            <Markdown>
                                                {message.content}
                                            </Markdown>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="post">
                            <form autoComplete="off" onSubmit={(e) => send(e)}>
                                <label htmlFor="reply-input" className="row">
                                    <input 
                                        type="file" 
                                        id="file-input" 
                                        style={{ display: 'none' }} 
                                    />
                                    <button type="button" onClick={() => document.getElementById('file-input')?.click()}>
                                        <i id="attach"></i>
                                    </button>
                                    <input 
                                        id="reply-input" 
                                        placeholder="Send a message..."
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <button className="row a-center"><span>Send</span> <i id="send"></i></button>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AI;