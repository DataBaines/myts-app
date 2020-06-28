import React, { useState, useEffect } from 'react'
import ConfirmedDespatchTable from './ConfirmedDespatchTable'
import ConfDespParams from './ConfDespParams'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { getYearWeekString } from '../_helpers/weekNumCalc'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
  },
}))

function ConfDesp () {

    const [apiParams, setapiParams] = useState(initialState)
    const [paramFormOpen, setparamFormOpen] = useState(true)
    const classes = useStyles()

    function initialState(){

        let lastweek = new Date(); //Now
        lastweek.setDate(lastweek.getDate() - 7); //Minus a week
        let yrWk = getYearWeekString(lastweek)
        return {yearWeek: yrWk, queryDate: lastweek, matched: 'N', customer: 'SARAM'}
    }

    function paramSubmit(newParams: React.SetStateAction<{ yearWeek: string; queryDate: Date; matched: string; customer: string }>){
      setapiParams(newParams)
      setparamFormOpen(false)
    }

    function openParams(){
      setparamFormOpen(true)
    }
    
    return (
      <div className='mainbody'>
          <h3>Confirmed Despatches</h3>   
          <p>Confirmed Despatches and their related DPD invoice price.</p>   
          {paramFormOpen ? (
            <div>
              <ConfDespParams spParameters={apiParams} submitHandler={paramSubmit} />
            </div>
          ) : (
            <div>
              <span>Parameters 
              <IconButton size='medium' color="primary" onClick={openParams}>
                <ExpandLessIcon fontSize='large' /> 
              </IconButton>
              </span>
              <ConfirmedDespatchTable queryDate={apiParams.queryDate} matched={apiParams.matched} customer={apiParams.customer} />                
            </div>
          )}
      </div>
    )
}

export default ConfDesp