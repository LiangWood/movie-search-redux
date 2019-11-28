import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    header : {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    }
})

const Header = props => {

    const classes = useStyles()

    return (
        <header className={`App-header ${classes.header}`}>
            <h2 onClick={props.refresh}>{props.text}</h2>
        </header>
    )
}

export default Header;