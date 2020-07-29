import React, { useEffect, useState } from 'react'
import BaseTable, { Styles } from "./BaseTable"
import axios from 'axios'
import {authHeader} from '../_helpers/authHelper'
import apiConf from '../_helpers/apiConf'

function InvoiceExceptionTable({apiParams, selectHandler, backHandler}) {

  const {startDate, endDate, isOrphan, isMultiline, customer} = apiParams

  const [parStartDate, setParStartDate] = useState<Date>(apiParams.startDate)
  const [parEndDate, setParEndDate] = useState<Date>(apiParams.endDate)
  const [parIsOrphan, setParIsOrphan] = useState( apiParams.isOrphan)
  const [parIsMultiline, setParIsMulti] = useState( apiParams.isMultiline)
  const [parCustomer, setParCustomer] = useState( apiParams.customer)
  const [data, setData] = useState( [] )
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
 
      try {
        setParStartDate(apiParams.startDate)
        setParEndDate(apiParams.endDate)
        setParIsOrphan(apiParams.isOrphan)
        setParIsMulti(apiParams.isMultiline)
        setParCustomer(apiParams.customer)
        console.log('cus='+customer + 'parcus ' + parCustomer)
        let authH = authHeader()
        let query = buildQuery()
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const result = await axios(apiConf.url + 'sp/GetInvExceptions' + query, {headers:authH})
        setData(result.data[0])
      } catch (error) {
        setIsError(true)
        setError(error.message + ' : ' + error.response.data.code)
      }
      setIsLoading(false)
    };
 
    fetchData()
  },[apiParams]
  )
     
  function buildQuery () {
    let qu ='?parStartDate='
    qu += formattedDate(parStartDate)
    qu += '&parEndDate='
    qu += formattedDate(parEndDate)
    qu += '&parIsOrphan='
    qu += parIsOrphan?'1':'0'
    qu += '&parIsMultiLine='
    qu += parIsMultiline?'1':'0'
    qu += '&parCustomer='
    qu += formatCust(parCustomer)
    console.log('Inv Exc Table BuildQuery: ' + qu)
    return qu
  }

  function formatCust(cus: string){
    let replaced = cus.split('&').join('%26')
    return replaced
  }

  function formattedDate(d: Date) {
    const year = String(d.getFullYear())
    let month = String(d.getMonth() + 1)
    let day = String(d.getDate())
  
    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
  
    return year + '-' + month + '-' + day
  }

  function selectLine(delPostcode:string, senderRef:string) {
    console.log('link to postcode:' + delPostcode + ' and sender Ref:' + senderRef)
    selectHandler(senderRef, delPostcode)
  }

  const columns = React.useMemo(
      () => [
        {
          Header: 'Name',
          columns: [
              //none    
          ],
        },
        {
          Header: 'Info',
          columns: [
              {
                  Header: 'Delivery Postcode',
                  accessor: d => {
                    return <div className='link' onClick={() => selectLine(d.DelPostcode, d.SenderRef)}>{d.DelPostcode}</div>
                    },
                  
              },
              {
                  Header: 'Sender Ref',
                  accessor: 'SenderRef',
              },
              {
                  Header: 'Customer',
                  accessor: 'Customer',
              },
              {
                  Header: 'Total Cost',
                  accessor: d => {
                      return d.TotalCost.toFixed(2)
                      },
              },            
              {
                  Header: 'Revenue Cost',
                  accessor: d => {
                      return d.RevenueCost.toFixed(2)
                      },
              },            
              {
                  Header: 'Fuel Surcharge',
                  accessor: d => {
                      return d.FuelSurcharge.toFixed(2)
                      },
              },            
              {
                  Header: 'No. of Inv. Lines',
                  accessor: 'InvLinesCount',
              },
              {
                  Header: 'Last Inv. Date',
                  accessor: d => {
                  return d.LastInvDate.substring(0, 10)
                  },
              },
          ],
        },
      ],
      []
  )

  return (
      <div>
          {isError && (<div className='error'>The API call failed with error: {error}</div>)}

          {isLoading ? (<div>Loading ...</div>) : 
          (
          <div>                     
              <div className='tabletitle'>
                  <span className='tableparams'>
                    <button 
                        className='custbutton' 
                        onClick={ backHandler }>
                        Back
                    </button>
                    {/* {parIsOrphan ? 'Orphan Invoices.' : 'All Invoices with Multiple Lines for: '} */}
                    {parIsMultiline ? parCustomer: ''}
                  </span>
                  <Styles>
                      <BaseTable columns={columns} data={data} />
                  </Styles>
              </div>
          </div>
          )}
             
      </div>    
  )
}


export default InvoiceExceptionTable