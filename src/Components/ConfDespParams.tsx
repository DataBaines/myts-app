import React, {useEffect, useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";
import enGB from 'date-fns/locale/en-GB';
import { authHeader } from '../_helpers/authHelper';
import { getYearWeekString } from '../_helpers/weekNumCalc';
import ApiConf from '../_helpers/apiConf';
import axios from 'axios';
registerLocale('en-GB', enGB)


interface Props {
    spParameters: Array<string>,
    submitHandler: Function
}

function ConfDespParams ({spParameters, submitHandler}){

    setDefaultLocale('en-GB');    
    const [values, setValues] = useState(spParameters)
    const [customers, setCustomers] = useState( [] )

    useEffect(() => {
        fetchCustomers()
    }, [values.queryDate]  )

    const fetchCustomers = async () => { 
        try {
            let authH = authHeader()
            let yrWk = getYearWeekString(values.queryDate)
            let query = buildCustomerQuery(yrWk)
            let fullUrl= ApiConf.url + 'sp/GetCustomers' + query
            console.log(JSON.stringify(authH) + ':' + yrWk + ':' + fullUrl)
            let result = await axios(fullUrl, {headers:authH})
            setCustomers(result.data[0])
        } catch (error) {
            alert ('Error fetching customers:' + error)    
        }
    }

    function mySubmitHandler (event) {
        event.preventDefault();
        submitHandler(values.queryDate, values.matched, values.customer)
    }

    function buildCustomerQuery (yearWk) {
        let query ='?parYearWeek='
        query += yearWk
        return query
    }

    const clickCustomerHandler = function(e){
        e.preventDefault();
        let cus = e.target.getAttribute("data-index")
        console.log(cus); //will log the index of the clicked item
        setValues({...values, customer: cus})

    };

    let listCustomers = customers.map(function(item: any, index){
        return (
        <button 
            className='custbutton' 
            key={index} 
            data-index={item.Customer} 
            onClick={ clickCustomerHandler }>
                {item.Customer}
        </button>
        )
    });

    return (
        <form onSubmit={mySubmitHandler}>
            <h3>Confirmed Despatches Parameters: </h3>
            {customers ? (
                <div>
                    {listCustomers}
                </div>
            ) : (
                <div>
                    <p>No Customers to display</p>
                </div>
            )}
            <table className='paramtable'>
                <tbody>
                    <tr>
                        <td>
                            <p>Start Date:</p>
                        </td>
                        <td>
                            <DatePicker
                                selected={values.queryDate}
                                onChange={date => setValues({...values, queryDate: date})}
                                dateFormat="dd MMM yyyy"
                                className='datepicker'
                            />                                 
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Matches:</p>
                            <p>Filter on matched despatches to invoice</p>
                        </td>
                        <td>
                            <select value={values.matched} onChange={event => setValues({...values, matched: event.target.value})}>
                                <option value="*">All</option>
                                <option value="M">Matched</option>
                                <option value="P">Under Costed</option>
                                <option value="N">Not Matched</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Customer:</p>
                        </td>
                        <td>
                            <input
                                type='text'
                                value={values.customer}
                                onChange={event => setValues({...values, customer: event.target.value})}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type='submit' />
        </form>
    )  
}

export default ConfDespParams