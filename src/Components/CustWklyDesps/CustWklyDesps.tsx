import React, { useState, useEffect } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import ApiConf from '../../_helpers/apiConf'
import axios from 'axios'
import {authHeader} from '../../_helpers/authHelper'
import { getYearWeekString } from '../../_helpers/weekNumCalc'
import DatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";
import CustWklyDespsTable from './CustWklyDespsTable'
import CustWklyDespsParams from './CustWklyDespsParams'

function CustWklyDesps () {

    const [apiParams, setapiParams] = useState(initialState)
    const [paramFormOpen, setparamFormOpen] = useState(true)

    function initialState(){

        let lastweek = new Date(); //Now
        lastweek.setDate(lastweek.getDate() - 7); //Minus a week
        let yrWk = getYearWeekString(lastweek)
        return {yearWeek: yrWk, queryDate: lastweek, customer: 'SARAM'}
    }


    function paramSubmit(cust, qDate, yearWk){
        setapiParams({yearWeek: yearWk, queryDate: qDate, customer: cust})
        setparamFormOpen(false)
    }

    function openParams(){
        setparamFormOpen(true)
    }
    
    return (
        <div className='mainbody'>
            <h3>Customer Weekly Despatches</h3>   
            <p className='reportdescr'>Summary and detail of charges for a customer's weekly despatches</p>   
            {paramFormOpen ? (
                <div>
                    <CustWklyDespsParams spParameters={apiParams} selectedHandler={paramSubmit} />
                </div>
            ) : (
                <div>
                    <span> 
                        <IconButton size='medium' color="primary" onClick={openParams}>
                            Parameters<ExpandLessIcon fontSize='large' /> 
                        </IconButton>
                    </span>
                    <CustWklyDespsTable yearWeek={apiParams.yearWeek} customer={apiParams.customer} selDate={apiParams.queryDate} />                
                </div>
          )}

        </div>
    )



    // const fetchCustomers = async () => { 
    //     try {
    //         let authH = authHeader()
    //         let yrWk = apiParams.yearWeek
    //         let query = buildCustomerQuery(yrWk)
    //         let fullUrl= ApiConf.url + 'sp/GetCustomers' + query
    //         console.log(authH + ':' + yrWk + ':' + fullUrl)
    //         let result = await axios(fullUrl, {headers:authH})
    //         setCustomers(result.data[0])
    //     } catch (error) {
    //         alert ('Error fetching customers:' + error)    
    //     }
    // }

    // function buildCustomerQuery (yearWk) {
    //     let query ='?parYearWeek='
    //     query += yearWk
    //     return query
    // }
    
    // function getAllCustomers(yearWk: string) {
    //   fetch(ApiConf.url + 'sp/GetCustomers' + buildCustomerQuery(yearWk))
    //     .then(response => {
    //       response.blob().then(blob => {
    //         let url = window.URL.createObjectURL(blob);
    //         let a = document.createElement('a');
    //         a.href = url;
    //         a.download = 'employees.json';
    //         a.click();
    //       });
    //       //window.location.href = response.url;
    //   });
    // }

    // function jsonToCsv(json3){
    //     var json = json3.items
    //     var fields = Object.keys(json[0])
    //     var replacer = function(key, value) { return value === null ? '' : value } 
    //     var csv = json.map(function(row){
    //     return fields.map(function(fieldName){
    //         return JSON.stringify(row[fieldName], replacer)
    //     }).join(',')
    //     })
    //     csv.unshift(fields.join(',')) // add header column
    //     csv = csv.join('\r\n');
    //     return csv
    // }

    // const downloadCustomerCsv = async (customer: string) =>{
    //     let authH = authHeader()
    //     let yrWk = weekNumberCalculation(queryDate)
    //     let filename = 'WeeklyDespatches_'+customer+'_'+yrWk+'.csv'
    //     let query = buildCustomerQuery(yrWk)
    //     let fullUrl= ApiConf.url + 'sp/GetCustWeeklyDespatchSummary' + query
    //     console.log(authH + ':' + yrWk + ':' + fullUrl)

    //     axios({
    //         url: fullUrl, //your url
    //         method: 'GET',
    //         responseType: 'arraybuffer', // important
    //         headers: authH,
    //       }).then((response) => {
    //         var buffer = new Buffer(response.data, 'binary');
    //         var jsondata = buffer.toJSON()

    //         const csv = jsonToCsv(jsondata)
    //         const url = window.URL.createObjectURL(new Blob([csv]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', filename); //or any other extension
    //         document.body.appendChild(link);
    //         link.click();
    //       });
    // }

}

export default CustWklyDesps