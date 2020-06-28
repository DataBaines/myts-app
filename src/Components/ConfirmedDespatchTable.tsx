import React, { useEffect, useState } from 'react'
import BaseTable, { Styles } from "./BaseTable"
import axios from 'axios'
import moment from 'moment'
import { CSVLink, CSVDownload } from "react-csv"
import {authHeader} from '../_helpers/authHelper'
import apiConf from '../_helpers/apiConf'
import { getYearWeekString, getSaturdayFridayString } from '../_helpers/weekNumCalc'

function ConfirmedDespatchTable( {queryDate, matched, customer} ) {

    const [data, setData] = useState( [] )
    const [query, setQuery] = useState(buildQuery)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
      const fetchData = async () => {
        setIsError(false)
        setIsLoading(true)
   
        try {
          let authH = authHeader()
          //const proxyurl = "https://cors-anywhere.herokuapp.com/";
          const result = await axios(apiConf.url + 'sp/GetAllConfirmedDespatches' + query, {headers:authH})
          setData(result.data[0])
        } catch (error) {
          setIsError(true)
          setError(error.message)
        }

        setIsLoading(false)
      };
   
      fetchData()
    }, [query])
       

    function buildQuery () {
        let query ='?parYearWeek='
        query += getYearWeekString(queryDate)
        query += '&parMatched='
        query += matched
        query += '&parCustomer='
        query += customer

        return query
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
                accessor: 'Postcode',
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
                accessor: 'Cost',
                },
                {
                Header: 'Invoice Cost',
                accessor: 'TotalCost',
                },
            ],
          },
        ],
        []
    )
 
    return (
        <div>
            {isError && <div className='error'>Something went wrong ... {error}</div>}
    
            {isLoading ? (<div>Loading ...</div>) : 
            (
              <div className='tabletitle'>
                  <span className='tableparams'>Customer: {customer} Week: {getYearWeekString(queryDate)} ({getSaturdayFridayString(queryDate)})</span>
                  <span className='downloadlink'>
                      <CSVLink data={data} filename={"ConfirmedDespatch.csv"}>Download as a csv file</CSVLink>
                  </span>
                  <Styles>
                      <BaseTable columns={columns} data={data} />
                  </Styles>
              </div>
            )}
        </div>    
    )
}


const range = len => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
      arr.push(i)
    }
    return arr
  }
  
const newPerson = () => {
    const statusChance = Math.random()
    return {
        firstName: "Ralph",
        lastName: "Baines",
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
        statusChance > 0.66
            ? 'relationship'
            : statusChance > 0.33
            ? 'complicated'
            : 'single',
    }
}
  
function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map(d => {
        return {
            ...newPerson(),
            subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        }
        })
    }

    return makeDataLevel()
}

export default ConfirmedDespatchTable