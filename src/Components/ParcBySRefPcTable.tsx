import React, { useEffect, useState } from 'react'
import BaseTable, { Styles } from "./BaseTable"
import axios from 'axios'
import {authHeader} from '../_helpers/authHelper'
import apiConf from '../_helpers/apiConf'


function ParcBySRefPcTable( {senderRef, postcode} ) {

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
          const result = await axios(apiConf.url + 'sp/GetParcBySRefPc' + query, {headers:authH})
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
                    Header: 'Customer',
                    accessor: 'Customer',
                },
                {
                    Header: 'Order Ref',
                    accessor: 'OrderRef',
                },
                {
                    Header: 'Consignment',
                    accessor: 'Consignment',
                },
                {
                    Header: 'Desp. Date',
                    accessor: d => {
                    return d.DespDate.substring(0, 10)
                    },
                },
                {
                    Header: 'Qty',
                    accessor: 'Qty',
                },
                {
                    Header: 'Unit Price',
                    accessor: d => {
                        return d.UnitPrice.toFixed(2)
                        },
                },                  
                {
                    Header: 'Total Price',
                    accessor: d => {
                        return d.TotalPrice.toFixed(2)
                        },
                },                                  
                {
                    Header: 'WeightRange',
                    accessor: 'WeightRange',
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
                    Header: 'Service Name',
                    accessor: 'ServiceName',
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
                    <span className='tableparams'>Parcel Details...</span>
                    <Styles>
                        <BaseTable columns={columns} data={data} />
                    </Styles>
                </div>
            </div>
            )}              
        </div>    
    )
}

export default ParcBySRefPcTable