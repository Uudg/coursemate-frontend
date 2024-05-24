interface Props {
    input: string;
    setInput: (value: string) => void;
}

const SearchBar = ({input, setInput}: Props) => {

    

    return(
        <div className="col col-sm-12 ">
            <div className="block searchBar center">
                <label htmlFor="searchBar">
                    <input type="text" id="searchBar" placeholder="Search Here" autoComplete="off" value={input} onChange={(e) => setInput(e.target.value)}/>
                </label>
            </div>
        </div>
    )
}

export default SearchBar;