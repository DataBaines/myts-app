import React, { useEffect, useState } from 'react'
import BaseTable, { Styles } from "./BaseTable"
import axios from 'axios'
import {authHeader} from '../_helpers/authHelper'
import apiConf from '../_helpers/apiConf'


function SingleDeliveryInvTable( {senderRef, postcode} ) {

    const [data, setData] = useState( [] )
    const [query, setQuery] = useState(buildQuery)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
      const fetchData = async () => {
        setIsError(false)
        setIsLoading(true)
        setQuery(buildQuery())
        
        try {
          let authH = authHeader()
          const proxyurl = "https://cors-anywhere.herokuapp.com/";
          const result = await axios(apiConf.url + 'sp/GetInvBySRefPc' + query, {headers:authH})
          setData(result.data[0])
        } catch (error) {
          setIsError(true)
          setError(error.message + ' : ' + error.response.data.code)
        }

        setIsLoading(false)
      };
   
      fetchData()
    }, [senderRef, postcode])
       
    function buildQuery () {
        let qu ='?parSenderRef='
        qu += senderRef
        qu += '&parDelPostcode='
        qu += postcode

        return qu
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
                    Header: 'Del. Postcode',
                    accessor: 'DelPostcode',
                },
                {
                    Header: 'Order Ref',
                    accessor: 'SenderRef',
                },
                {
                    Header: 'Date',
                    accessor: d => {
                    return d.Date1.substring(0, 10)
                    },
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
                    Header: 'InvoiceNumber',
                    accessor: 'InvoiceNumber',
                },
                {
                    Header: 'ProductDesc',
                    accessor: 'ProductDesc',
                },
                {
                    Header: 'ServiceDesc',
                    accessor: 'ServiceDesc',
                },
                {
                    Header: 'CountryCode',
                    accessor: 'CountryCode',
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
                    <div className='tableparams'>Order Reference: '{senderRef}'  Delivery Postcode: '{postcode}'</div>
                    <div className='tableparams'>Invoice Details...</div>
                    <Styles>
                        <BaseTable 
                            columns={columns} 
                            data={data} 
                        />
                    </Styles>
                </div>
            </div>
            )}              
        </div>    
    )
}

export default SingleDeliveryInvTable

// const range = len => {
//     const arr: number[] = []
//     for (let i = 0; i < len; i++) {
//       arr.push(i)
//     }
//     return arr
//   }
  
// const newPerson = () => {
    
//     const statusChance = Math.random()
//     return {
//         firstName: "Ralph",
//         lastName: "Baines",
//         age: Math.floor(Math.random() * 30),
//         visits: Math.floor(Math.random() * 100),
//         progress: Math.floor(Math.random() * 100),
//         status:
//         statusChance > 0.66
//             ? 'relationship'
//             : statusChance > 0.33
//             ? 'complicated'
//             : 'single',
//     }
// }
  
// function makeData(...lens) {
//     const makeDataLevel = (depth = 0) => {
//         const len = lens[depth]
//         return range(len).map(d => {
//         return {
//             ...newPerson(),
//             subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//         }
//         })
//     }

//     return makeDataLevel()
// }
