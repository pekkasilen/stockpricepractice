import React, {useState} from 'react';
import {Button, ButtonGroup, Grid, Paper, IconButton, Typography} from '@mui/material';
import Tabbutton from './Tabbutton'
import SyncIcon from '@mui/icons-material/Sync'
import { DataGrid } from '@mui/x-data-grid';


const Dgrid = (props) => {

    const columns = [
        { field:'day', headerName: 'Day',flex:1, align:"center", headerAlign: "center", headerClassName: "cols"},
        { field:'price', headerName: 'Price',flex:1,align:"center",headerAlign: "center",headerClassName: "cols"},
        { field:'change', headerName: 'Change%',flex:1,align:"center",headerAlign: "center",headerClassName: "cols"},
        { field:'vol', headerName: 'Vol',flex:1,align:"center",headerAlign: "center",headerClassName: "cols"},
    ]

    return (
        <DataGrid showCellRightBorder={true} hideFooter={true} disableColumnMenu={true} rows={props.r} columns={columns}/>
    )

}

export default Dgrid;

