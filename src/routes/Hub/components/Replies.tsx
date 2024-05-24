import { useEffect, useState } from "react";
import { get_replies, save_reply, del_reply } from "../../../api/hub";
import Reply from "./Reply";

interface Props {
    _id: string
}

interface ReplyProps {
    _id: string;
    body: string;
    author: {
        _id: string;
        fullname: string;
    }
}


const Replies: React.FC<Props> = ({_id}) => {

    const [replies, setReplies] = useState<ReplyProps[] | null>(null);
    const [reply, setReply] = useState<string>('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        get()
    }, [])

    const get = () => {
        if (!replies) {
            setLoading(true)
        }
        get_replies(_id)
        .then(res => {
            setReplies(res.data)
            setLoading(false)
        })
        .catch(err => console.error(err));
    }

    const del = (id: string) => {
        del_reply(id)
            .then(() => {
                if (replies) {
                    setReplies(replies.filter(reply => reply && reply._id !== id));
                }
            })
            .catch(err => console.error(err));
    } 

    const save = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        save_reply(_id, reply)
            .then(() => {
                get()
                setReply('');
            })
            .catch(err => console.error(err));
    }

    return(
        <div className="column col col-sm-12" id="replies">
                    <form onSubmit={save} autoComplete="off">
                        <label htmlFor="reply-input" className="row">
                            <input 
                                id="reply-input" 
                                placeholder="Reply..."
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            />
                            <button className="row a-center"><span>Reply</span> <i className="center"></i></button>
                        </label>
                    </form>
                <div className="replies column">
                    {!loading && replies && replies.length > 0 ? (
                        replies.map((reply: ReplyProps, i: number) => (
                            <Reply key={i} reply={reply} del_reply={del}/>
                        ))
                    ) : !loading && replies && replies.length === 0 ? (
                        <div className="no"> No replies yet </div>
                    ) : (
                        'Loading...'
                    )}
                </div>
        </div>
    )
}

export default Replies;