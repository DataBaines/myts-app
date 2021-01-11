import React, { useState, useEffect } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import ApiConf from '../../_helpers/apiConf'
import axios from 'axios'
import {authHeader} from '../../_helpers/authHelper'
import { getYearWeekString, getSaturdayFridayString, getDateString } from '../../_helpers/weekNumCalc'
import DatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";

function CustWklyDespsParams ({spParameters, selectedHandler}) {

    const [queryDate, setQueryDate] = useState<Date>(spParameters.queryDate)
    const [customers, setCustomers] = useState( [] )
    const [customer, setCustomer] = useState( '' )

    useEffect(() => {
        fetchCustomers()
    }, [queryDate]  )

    const fetchCustomers = async () => { 
        try {
            let authH = authHeader()
            let yrWk = getYearWeekString(queryDate)
            let query = buildCustomerQuery(yrWk)
            let fullUrl= ApiConf.url + 'sp/GetCustomers' + query
            console.log(JSON.stringify(authH) + ':' + yrWk + ':' + fullUrl)
            let result = await axios(fullUrl, {headers:authH})
            setCustomers(result.data[0])
        } catch (error) {
            alert ('Error fetching customers:' + error)    
        }
    }

    function buildCustomerQuery (yearWk) {
        let query ='?parYearWeek='
        query += yearWk
        return query
    }

    const handler = function(e){
        e.preventDefault();
        let cus = e.target.getAttribute("data-index")
        console.log(cus); //will log the index of the clicked item
        selectedHandler(cus, queryDate, getYearWeekString(queryDate))
        setCustomer(cus)
        console.log(customer); //will log the index of the clicked item
    };

    let listCustomersA = customers.map(function(item: any, index){
        return (
        <button 
            className='custbutton' 
            key={index} 
            data-index={item.Customer} 
            onClick={ handler }>
                {item.Customer}
        </button>
        )
    });

    let range = getSaturdayFridayString(queryDate)

    return (
        <div className='mainbody'>
            <span>Date : </span>
            <DatePicker
                selected={queryDate}
                onChange={(date: Date) => setQueryDate(date) }
                dateFormat="dd MMM yyyy"
                className='datepicker'
            /> 
            <p className='datedetail'> Year/Week : {getYearWeekString(queryDate)} : ({range})</p>
            {customers ? (
                <div>
                    {listCustomersA}
                </div>
            ) : (
                <div>
                    <p>No Customers to display</p>
                </div>
            )}
        </div>
    )
}

export default CustWklyDespsParams