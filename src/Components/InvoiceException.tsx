import React, { useState, useEffect } from 'react'
import InvoiceExceptionTable from './InvoiceExceptionTable'
import InvoiceExceptionParams from './InvoiceExceptionParams'
import InvoiceExceptionDetail from './InvoiceExceptionDetail'

type DisplayPage = 'Params' | 'Invoices' | 'Details'


function InvoiceException ({mode}) {

    const [parStartDate, setParStartDate] = useState<Date>(offsetTodayByDays(-28))
    const [parEndDate, setParEndDate] = useState<Date>(offsetTodayByDays(0))
    const [parCustomer, setParCustomer] = useState('*')
    const [senderRef, setSenderRef] = useState('none-yet')
    const [postcode, setPostcode] = useState('none-yet')
    const [invMode, setinvMode] = useState(mode)
    const [toDisplay, setToDisplay] = useState<DisplayPage>('Params')

    useEffect(() => {
        setinvMode(mode)
    }, [mode]  )

    function isOrphanMode(){
        return invMode === 'orphan'
    }

    function offsetTodayByDays(d: number)
    {
        var ourDate = new Date() //Now
 
        //Adjust the days
        var newDate = ourDate.getDate() + d
        ourDate.setDate(newDate)
        ourDate.setHours(0,0,0,0)
        return ourDate
    }

    const backSelected = function(e){
        e.preventDefault();
        setToDisplay('Invoices')
    }

    const tableBackSelected = function(e){
        e.preventDefault();
        setToDisplay('Params')
    }

    function invoiceSelected(sref, pcode){
        setSenderRef(sref)
        setPostcode(pcode)
        setToDisplay('Details')
    }

    function paramsSubmitted(sDate:Date, eDate:Date, cus:string) {
        setParStartDate(sDate)
        setParEndDate(eDate)
        setParCustomer(cus)
        setToDisplay('Invoices')
    }
    
    const buildApiParams = function(){
        let reply = {
            startDate: parStartDate, 
            endDate: parEndDate, 
            isOrphan: isOrphanMode(), 
            isMultiline: !isOrphanMode(),
            customer: parCustomer
        }

        return reply
    }

    function page() {
        return (
            <div>
              {(() => {
                switch (toDisplay) {
                    case 'Invoices':   
                    return <InvoiceExceptionTable apiParams={buildApiParams()} selectHandler={invoiceSelected} backHandler={tableBackSelected} />
                  case 'Details':   
                    return <InvoiceExceptionDetail SenderRef={senderRef} Postcode={postcode} Mode={invMode} backHandler={backSelected}/>
                  case 'Params': 
                    return <InvoiceExceptionParams  apiParams={buildApiParams()} mode={invMode} submitHandler={paramsSubmitted}/>  
                  default:      
                    return <h1>No project match</h1>
                }
              })()}
            </div>
        );
    }

    return (
        <div className='mainbody'>
            <h3>{isOrphanMode()?'Orphan Invoices':'Multi-line Invoices'}</h3>     
            {/* <div>{toDisplay}</div> */}
            {page()}
        </div>
    )

}

export default InvoiceException