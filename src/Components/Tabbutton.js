import React, {useState} from 'react';
import {Button} from '@mui/material'
const Tabbutton = (props) => {
    return(
        <div>
            {props.selected==props.name
            ?<Button size="small" variant="contained" color="success">{props.name}</Button>
            :<Button size="small" variant="contained">{props.name}</Button>}
            
        </div>
    )
}

export default Tabbutton;