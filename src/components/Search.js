import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

const Search = props => {

    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = e => {
        setSearchValue(e.target.value)
    }

    const resetInputField = () => {
        setSearchValue("")
    }

    const callSearchFunction = e => {
        e.preventDefault()
        props.search(searchValue)
        resetInputField()
    }

    return (
        <form className="search">
            <input
            value={searchValue}
            onChange={handleSearchInputChanges}
            type="text"
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={callSearchFunction} 
                type="submit" 
                value="SEARCH"
            >SEARCH</Button>
       </form>
    )

}

export default Search;