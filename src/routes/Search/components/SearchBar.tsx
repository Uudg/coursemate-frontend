import { useState, useEffect } from "react";

interface Props {
    input: string;
    setInput: (value: string) => void;
}

const SearchBar = ({input, setInput}: Props) => {
    const [localInput, setLocalInput] = useState(input);

    // useEffect(() => {
    //     setLocalInput(input);
    // }, []) // Added input as a dependency

    useEffect(() => {
        const timer = setTimeout(() => {
            setInput(localInput);
        }, 200); // 500ms delay

        return () => clearTimeout(timer); // this will clear Timeout if localInput changes within 500ms.
    }, [localInput]); // this effect runs whenever localInput changes

    return(
        <div className="col col-sm-12 ">
            <div className="block searchBar center">
                <label htmlFor="searchBar">
                    <input type="text" id="searchBar" placeholder="Search Here" autoComplete="off" value={localInput} onChange={(e) => setLocalInput(e.target.value)}/>
                </label>
            </div>
        </div>
    )
}

export default SearchBar;