import React, { useState, useEffect } from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { IconButton } from '@material-ui/core'
import InvBySRefPcTable from './InvBySRefPcTable'
import ParcBySRefPcTable from './ParcBySRefPcTable'


function InvoiceExceptionDetail ( {SenderRef, Postcode, Mode, backHandler} ) {

    const [apiParams, setapiParams] = useState({senderRef: SenderRef, postcode: Postcode, mode: Mode})

    useEffect(() => {
        console.log('InvoiceExceptionDetail use effect')
        setapiParams({senderRef: SenderRef, postcode: Postcode, mode: Mode})
    }, [SenderRef, Postcode, Mode] )
   
    return (
        <div className='mainbody'>
            {/* <h3>{apiParams.mode === 'orphan' ? 'Orpan Invoice Exception Details' : 'Multiline Invoice Exception Details'}</h3>      */}
            <div>

                <button 
                    className='custbutton' 
                    onClick={ backHandler }>
                    Back
                </button>

                <InvBySRefPcTable senderRef={apiParams.senderRef} postcode={apiParams.postcode} />
                <ParcBySRefPcTable senderRef={apiParams.senderRef} postcode={apiParams.postcode} />
            </div>
        </div>
    )
}

export default InvoiceExceptionDetail