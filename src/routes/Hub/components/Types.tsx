interface TypesProps {
    set_type: (type: string) => void;
    activeType: string;
}


const Types = ({set_type, activeType} : TypesProps) => {
    return(
        <div className={'types row col col-sm-12'}>
            <button 
                onClick={() => set_type('trending')} 
                className={`type center ${activeType === 'trending' ? 'active' : ''}`}
            >
                Trending
            </button>
            <button 
                onClick={() => set_type('following')} 
                className={`type center ${activeType === 'following' ? 'active' : ''}`}
            >
                Following
            </button>
            <button 
                onClick={() => set_type('new')} 
                className={`type center ${activeType === 'new' ? 'active' : ''}`}
            >
                New
            </button>
        </div>
    )
}

export default Types;