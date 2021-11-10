import React, {useEffect, useState} from 'react';
import {Button, Box, ButtonGroup, Grid, Paper, IconButton, Typography, Modal} from '@mui/material';
import Tabbutton from './Tabbutton'
import SyncIcon from '@mui/icons-material/Sync'
import LoadModal from './LoadModal'
import Dgrid from './Dgrid'
import axios from 'axios';
export const Tabsheet = (props) => {
    const [selected, setSelected] = useState("GOOG"); //Currently selected stock
    const [loading, setLoading] = useState(false); //State for rendering "still loading"-info
    const [builtRows, setBuiltRows] = useState([]); //Current datarows for Dgrid-element
    const [errorOnFetch, setErrorOnFetch] = useState(false); //State for rendering error alert when needed
    
    //1st get the "Global quote"-data, and if all goes well, then fetch the "Time series"
    //Data from both calls are put to the 'rows'-variable, and finally pushed to the state hook builtRows.
    useEffect(()=> {
        setLoading(true);
        var failedOnGlobalQuote = false;
        var rows = []
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${selected}&apikey=${process.env.REACT_APP_API_KEY}`)
             .then((response)=>{
                try{
                    var dataIn = response.data["Global Quote"];
                    var rowToday = {id:1, day:"Today", price:dataIn["05. price"], change:"-",vol:dataIn["06. volume"]};
                    rows.push(rowToday)
                    setLoading(false);
                    setErrorOnFetch(false);
                }
                catch{
                    setErrorOnFetch(true);
                    failedOnGlobalQuote = true;
                }
             })
        if(!failedOnGlobalQuote){
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selected}&apikey=${process.env.REACT_APP_API_KEY}`)
                 .then((response)=> {
                    try{
                        var dataIn = response.data["Time Series (Daily)"];                    
                        var today = new Date();
                        var previousDates = 0;
                        while (previousDates<7){ //Getting last 7 days, so there is room for discarding non-trading days
                            today.setDate(today.getDate()-1);
                            previousDates++;
                            try{
                                var dateToGet = today.toISOString().split("T")[0];
                                var rowOfDay = {id:previousDates+2, day:dateToGet, price:dataIn[dateToGet]["4. close"], change:"-",vol:dataIn[dateToGet]["5. volume"]};
                                rows.push(rowOfDay);
                            }
                            catch {
                            } //just skip day with no trading
                        }
                        rows[1]["day"]="Yesterday"; //Call first day after 'today' as 'yesterday'. Problem: if today and yesterday 'are the same'.
                        setBuiltRows(rows);
                        setLoading(false);
                        setErrorOnFetch(false);
                    }
                    catch{
                        setErrorOnFetch(true);
                        setLoading(false);
                    }
                
            })
        } else {setBuiltRows([])}
    }, [selected]);
    

    const changeSelected = (i) => {
        setSelected(props.stocksToFollow[i]);
    }

    return(
        <div className="tabsheet">
            {loading?<LoadModal open={true}/>:<LoadModal open={false}/>}
            <Grid container spacing={1} alignItems="center" justifyContent="center">
                {props.stocksToFollow.map((x,i)=> <Grid item key={i} xs={2} md={1} onClick={()=>changeSelected(i)}><Tabbutton name={x} index={i} selected={selected}>{x}</Tabbutton></Grid>)}
                <Button xs={2} md={1}><SyncIcon fontSize="small"/></Button>
            </Grid>
            <br/>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                
                {(!errorOnFetch || builtRows.length>1)
                    ?<Dgrid r={builtRows}/>
                    :alert("Error on fetching data. Please try again later. Remeber that API calls are limited to 5 per minute and 500 per day.")}
                
            </Grid>
            
        </div>
    )
}

export default Tabsheet;