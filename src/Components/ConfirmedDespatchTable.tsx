import React, { useEffect, useState } from 'react'
import BaseTable, { Styles } from "./BaseTable"
import axios from 'axios'
import moment from 'moment'
import { CSVLink, CSVDownload } from "react-csv"
import {authHeader} from '../_helpers/authHelper'
import apiConf from '../_helpers/apiConf'
import { getYearWeekString, getSaturdayFridayString } from '../_helpers/weekNumCalc'
import { blue } from '@material-ui/core/colors'

function ConfirmedDespatchTable( {queryDate, matched, customer, selectHandler} ) {

    const [data, setData] = useState( [] )
    const [qDate, setQDate] = useState<Date>(queryDate)
    const [matchd, setMatchd] = useState<string>(matched)
    const [cust, setCust] = useState<string>(customer)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
      setQDate(queryDate)
      setMatchd(matched)
      setCust(customer)
      
      const fetchData = async () => {
        setIsError(false)
        setIsLoading(true)
   
        try {
          let authH = authHeader()
          //const proxyurl = "https://cors-anywhere.herokuapp.com/";
          let query = buildQuery()
          const result = await axios(apiConf.url + 'sp/GetAllConfirmedDespatches' + query, {headers:authH})
          setData(result.data[0])
        } catch (error) {
          setIsError(true)
          setError(error.message + ' : ' + error.response.data.code)
        }

        setIsLoading(false)
      };
   
      fetchData()
    }, [queryDate, matched, customer])
       

    function buildQuery () {
      let query ='?parYearWeek='
      query += getYearWeekString(qDate)
      query += '&parMatched='
      query += matchd
      query += '&parCustomer='
      query += formatCust(cust)

      return query
    }
 
    //Fix the error for 'SKA&SOUL'
    function formatCust(cus: string){
      let replaced = cus.split('&').join('%26')
      return replaced
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
                Header: 'Customer',
                accessor: 'Customer',
              },
              {
                Header: 'Ref1',
                accessor: 'Ref1',
              },
              {
                Header: 'Ref2',
                accessor: 'Ref2',
              },
              {
                Header: 'Ref3',
                accessor: 'Ref3',
              },
              {
                Header: 'Despatch Date',
                accessor: d => {
                  return moment(d.DespDate)
                    .local()
                    .format("DD-MM-YYYY")
                  },
              },
              {
                Header: 'Packages',
                accessor: 'Packages',
              },
              {
                Header: 'Products',
                accessor: 'Products',
              },
              {
                Header: 'Total Qty',
                accessor: 'Totalqty',
              },
              {
                Header: 'Postcode',
                accessor: d => {
                  return <div className='link' onClick={() => selectLine(d.PostcodeIx, d.Ref2)}>{d.Postcode}</div>
                },
              },
              {
                Header: 'Delivery Name',
                accessor: 'DeliveryName',
              },
              {
                Header: 'Postage Carrier',
                accessor: 'PostageCarrier',
              },
              {
                Header: 'Postage Service',
                accessor: 'PostageService',
              },
              {
                Header: 'RegDate',
                accessor: d => {
                  return moment(d.RegDate)
                    .local()
                    .format("DD-MM-YYYY")
                  },
                },
              {
                Header: 'Cost',
                accessor: d => {
                  return d.Cost.toFixed(2)
                  },
              },
              {
                Header: 'Invoice Cost',
                accessor: d => {
                  return d.TotalCost == null ? null: d.TotalCost.toFixed(2)
                  },
              },
              {
                Header: 'Inv.+ 12.5%',
                id: 'Inv125pc',
                accessor: d => { 
                  return d.TotalCost == null ? null: (d.TotalCost * 1.125).toFixed(2)
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
              <div className='tabletitle'>
                  <span className='tableparams'>Customer: {cust} Week: {getYearWeekString(qDate)} ({getSaturdayFridayString(qDate)})</span>
                  <span className='downloadlink'>
                      <CSVLink data={data} filename={"ConfirmedDespatch.csv"}>Download as a csv file</CSVLink>
                  </span>

                  <Styles>
                      <BaseTable 
                        columns={columns} 
                        data={data} 
                        getRowProps={(row) => ({
                          // onClick: () => alert(JSON.stringify(row.values)),
                          style: {
                            cursor: 'pointer',
                            background: Number(row.values.Inv125pc) > Number(row.values.Cost) ? 'pink' : null,
                          }
                        })}
                      />
                  </Styles>
              </div>
            )}
        </div>    
    )

}

export default ConfirmedDespatchTable