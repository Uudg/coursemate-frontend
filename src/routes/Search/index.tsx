import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Results from "./components/Results";
import SearchBar from "./components/SearchBar";
import { search } from "../../api/search";
import Filters from "./components/Filters";

const Search = () => {
    const [results, setResults] = useState<{ posts: [], users: [] } | null>(null);
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Parse the search query from the URL when the component mounts
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        if (query) {
            setInput(query);
        }
    }, [location.search]);

    // Update the URL when the search query changes
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        // Only update the URL if the input state is different from the search query in the URL
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

    useEffect(() => {
        console.table(results);
    }, [results]);

    return (
        <div className="search">
            <h1>Search</h1>
            <div className="grid">
                <SearchBar setInput={setInput} input={input} />
                <Filters/>
                {results && <Results results={results} />}
            </div>
        </div>
    );
};

export default Search;