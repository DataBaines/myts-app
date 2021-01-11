import React, { useState, useEffect } from 'react'
import ConfirmedDespatchTable from './ConfirmedDespatchTable'
import ConfDespParams from './ConfDespParams'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { getYearWeekString } from '../_helpers/weekNumCalc'
import InvoiceExceptionDetail from './SingleDeliveryDetail'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
  },
}))

type DisplayPage = 'Params' | 'ConfDespatches' | 'Details'

function ConfDesp () {

    const [apiParams, setapiParams] = useState(initialState)
    //const [paramFormOpen, setparamFormOpen] = useState(true)
    const [senderRef, setSenderRef] = useState('none-yet')
    const [postcode, setPostcode] = useState('none-yet')
    const [toDisplay, setToDisplay] = useState<DisplayPage>('Params')
    const classes = useStyles()

    function initialState(){

        let lastweek = new Date(); //Now
        lastweek.setDate(lastweek.getDate() - 7); //Minus a week
        let yrWk = getYearWeekString(lastweek)
        return {yearWeek: yrWk, queryDate: lastweek, matched: 'M', customer: 'ICECREAM'}
    }

    function paramSubmit(queryDate, matched, customer ){
      let yrwk = getYearWeekString(queryDate)
      setapiParams({yearWeek: yrwk, queryDate: queryDate, matched: matched, customer: customer})
      setToDisplay('ConfDespatches')
    }

    function openParams(){
      setToDisplay('Params')
    }
  
    function invoiceSelected(sref, pcode){
      setSenderRef(sref)
      setPostcode(pcode)
      setToDisplay('Details')
    }

    const backSelected = function(e){
      e.preventDefault();
      setToDisplay('ConfDespatches')
    }


    function page() {
      return (
          <div>
            {(() => {
              switch (toDisplay) {
                case 'Params':   
                  return  (           
                    <div>
                      <ConfDespParams spParameters={apiParams} submitHandler={paramSubmit} />
                    </div>
                  )
                case 'Details':   
                  return  <InvoiceExceptionDetail SenderRef={senderRef} Postcode={postcode} Mode={"ConfDesp"} backHandler={backSelected}/>
                case 'ConfDespatches': 
                  return  (          
                    <div>
                      <span>Parameters 
                      <IconButton size='medium' color="primary" onClick={openParams}>
                        <ExpandLessIcon fontSize='large' /> 
                      </IconButton>
                      </span>
                      <ConfirmedDespatchTable queryDate={apiParams.queryDate} matched={apiParams.matched} customer={apiParams.customer} selectHandler={invoiceSelected}/>                
                    </div>
                  )
                default:      
                  return <h1>No project match</h1>
              }
            })()}
          </div>
      );
    }

    return (
      <div className='mainbody'>
          <h3>Confirmed Despatches</h3>   
          <p>Confirmed Despatches and their related DPD invoice price.</p>   
          { page() }
          {/* {paramFormOpen ? (
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
              <ConfirmedDespatchTable queryDate={apiParams.queryDate} matched={apiParams.matched} customer={apiParams.customer} selectHandler={invoiceSelected}/>                
            </div>
          )} */}
      </div>
    )
}

export default ConfDesp