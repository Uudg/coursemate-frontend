// useHub.ts
import { useEffect, useState } from "react";
import { get } from "../api/hub";
import { useLocation } from 'react-router-dom';
import { Post } from "../models/Hub";

export const useHub = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState('trending');
    const location  = useLocation();
    const [hasFetched, setHasFetched] = useState(false);

    const set_type = (type : string) => {
        setType(type);
        setHasFetched(false);
    }

    useEffect(() => {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1))
            if (elem) {
                elem.scrollIntoView({behavior: "smooth"})
            }
        } else {
            window.scrollTo({top: 0, left: 0, behavior: "smooth"})
        }
    }, [location,]);

    useEffect(() => {
        setPosts([]);
        setLoading(true);
    }, [type]);

    useEffect(() => {
        get(type)
        .then(res => {
            setPosts(res.data)
            setLoading(false)
            setHasFetched(true)
        })
        .catch(err => console.error(err));
    }, [type])

    return { posts, loading, set_type, type, hasFetched };
}