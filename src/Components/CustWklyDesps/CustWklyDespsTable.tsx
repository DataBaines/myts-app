import React, { useEffect, useState } from 'react'
import BaseTable, { Styles } from "../BaseTable"
import axios from 'axios'
import moment from 'moment'
import { CSVLink, CSVDownload } from "react-csv"
import {authHeader} from '../../_helpers/authHelper'
import apiConf from '../../_helpers/apiConf'
import { getSaturdayFridayString } from '../../_helpers/weekNumCalc'

function CustWklyDespsTable( {yearWeek, customer, selDate} ) {

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
          const proxyurl = "https://cors-anywhere.herokuapp.com/";
          const result = await axios(apiConf.url + 'sp/GetCustWeeklyDespatchSummary' + query, {headers:authH})
          setData(result.data[0])
        } catch (error) {
          setIsError(true)
          setError(error.message + ' : ' + error.response.data.code)
        }

        setIsLoading(false)
      };
   
      fetchData()
    }, [query])
       

    function buildQuery () {
        let qu ='?parYearWeek='
        qu += yearWeek
        qu += '&parCustomer='
        qu += formatCust(customer)

        return qu
    }

    function formatCust(cus: string){
        let replaced = cus.split('&').join('%26')
        return replaced
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
                    Header: 'Order Ref',
                    accessor: 'OrderRef',
                },
                {
                    Header: 'Ref1',
                    accessor: 'Ref1',
                },
                {
                    Header: 'Despatch Date',
                    accessor: d => {
                    return d.DespDate.substring(0, 10)
                    },
                },
                {
                    Header: 'Orders',
                    accessor: 'Orders',
                },
                {
                    Header: 'Products',
                    accessor: 'Products',
                },
                {
                    Header: 'Items',
                    accessor: 'Items',
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
                    accessor: 'ServiceName',
                },
                {
                    Header: 'Order Price',
                    accessor: d => {
                        return d.OrderPrice ? d.OrderPrice.toFixed(2) : '0.00'
                        },
                },            
                {
                    Header: 'Additions',
                    accessor: d => {
                        return d.Additions ? d.Additions.toFixed(2) : '0.00'
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
                    <span className='tableparams'>Customer: {customer} Week: {yearWeek} ({getSaturdayFridayString(selDate)})</span>
                    <span className='downloadlink'>
                        <CSVLink data={data} filename={'WeeklyDespatches_'+ customer +'_'+ yearWeek +'.csv'}>Download as a csv file</CSVLink>
                    </span>
                    <Styles>
                        <BaseTable columns={columns} data={data}  />
                    </Styles>
                </div>
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

export default CustWklyDespsTable