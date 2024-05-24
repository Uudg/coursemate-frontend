import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Results from "./components/Results";
import SearchBar from "./components/SearchBar";
import { search } from "../../api/search";
import Filters from "./components/Filters";

const Search = () => {
    const [results, setResults] = useState<{ posts: [], users: [] } | null>(null);
    const [input, setInput] = useState('');
    const [localInput, setLocalInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        if (query) {
            setLocalInput(query);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInput(localInput);
        }, 200);

        return () => clearTimeout(timer); 
    }, [localInput]); 

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');  
        if (input !== query) {
            navigate(`?q=${encodeURIComponent(input)}`);
        }
    }, [input]);

    useEffect(() => {
        if (input) {
            search(input).then((res: any) => {
                setResults(res.data);
            });
        }
    }, [input]);

    return (
        <div className="search">
            <h1>Search</h1>
            <div className="grid">
                <SearchBar setInput={setLocalInput} input={localInput} />
                <Filters/>
                {results && <Results results={results} />}
            </div>
        </div>
    );
};

export default Search;