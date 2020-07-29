import React, { useState, useEffect } from 'react'
import ApiConf from '../_helpers/apiConf'
import axios from 'axios'
import {authHeader} from '../_helpers/authHelper'
import DatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";
import { getYearWeekString, getSaturdayFridayString, getDateString } from '../_helpers/weekNumCalc'

function InvoiceExceptionParams ({apiParams, mode, submitHandler}) {

    const {startDate, endDate, isOrphan, isMultiline, customer} = apiParams

    const [parStartDate, setParStartDate] = useState<Date>(apiParams.startDate)
    const [parEndDate, setParEndDate] = useState<Date>(apiParams.endDate)
    const [parCustomer, setParCustomer] = useState( apiParams.customer)
    const [invMode, setinvMode] = useState(mode)
    const [customers, setCustomers] = useState( [] )

    useEffect(() => {
        setinvMode(mode)
        if( mode==='orphan' ){
            setCustomers([])
            console.log('param page clearing Customers')
        }
        else{
            fetchCustomers()
            console.log('param page Setting Customers')
        }
    }, [mode]  )

    const fetchCustomers = async () => { 
        try {
            let authH = authHeader()
            let yrWk = getYearWeekString(offsetTodayByDays(-7))
            let query = buildCustomerQuery(yrWk)
            let fullUrl= ApiConf.url + 'sp/GetCustomers' + query
            console.log(JSON.stringify(authH) + ':' + yrWk + ':' + fullUrl)
            let result = await axios(fullUrl, {headers:authH})
            setCustomers(result.data[0])
        } catch (error) {
            alert ('Error fetching customers:' + error)    
        }
    }

    function isOrphanMode(){
        return mode === 'orphan'
    }

    function buildCustomerQuery (yearWk) {
        let query ='?parYearWeek='
        query += yearWk
        return query
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

   const cusHandler = function(e){
        e.preventDefault();
        let cus = e.target.getAttribute("data-index")
        console.log(cus); //will log the index of the clicked item
        submitHandler(parStartDate, parEndDate, cus)
        setParCustomer(cus)
        console.log(customer) //will log the index of the clicked item
    }

    const allCustMultiHandler = function(e){
        e.preventDefault();
        submitHandler(parStartDate, parEndDate, '*')
        setParCustomer('*')
    }

    const orphanHandler = function(e){
        e.preventDefault();

        submitHandler(parStartDate, parEndDate, '*')
        console.log('param page orphan submit'); //will log the index of the clicked item
    }

    let listCustomers = customers.map(function(item: any, index){
        return (
        <button 
            className='custbutton' 
            key={index} 
            data-index={item.Customer} 
            onClick={ cusHandler }>
                {item.Customer}
        </button>
        )
    });

    //let range = getSaturdayFridayString(queryDate)

    return (
        <div className='mainbody'>           
            <div>Start Date : </div>
            <DatePicker
                selected={parStartDate}
                onChange={(date: Date) => setParStartDate(date) }
                dateFormat="dd MMM yyyy"
                className='datepicker'
            /> 
            <div>End Date : </div>
            <DatePicker
                selected={parEndDate}
                onChange={(date: Date) => setParEndDate(date) }
                dateFormat="dd MMM yyyy"
                className='datepicker'
            /> 
            {isOrphanMode() ? (
            <div>
                <button className='custbutton' onClick={ orphanHandler }>Submit</button>
            </div>
            ) : (          
            <div>
                {customers && listCustomers}
                <div>
                    <button 
                        className='custbutton' 
                        onClick={ allCustMultiHandler }>
                            All Customers
                    </button>
                </div>
            </div>
            
        )}
        </div>
    )
}

export default InvoiceExceptionParams