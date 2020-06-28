import React, {useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale, setDefaultLocale } from  "react-datepicker";
import enGB from 'date-fns/locale/en-GB';
registerLocale('en-GB', enGB)


interface Props {
    spParameters: Array<string>,
    submitHandler: Function
}

function ConfDespParams ({spParameters, submitHandler}){

    // const handleInputChange = e => {
    //     const {name, value} = e.target
    //     setValues({...values, [name]: value})
    // }

    // const addItem = () => {
    //     const {name, quantity, unitCost} = values

    //     if(!name || !quantity || !unitCost) return

    //     saveItem(values)
    // }

    setDefaultLocale('en-GB');    
    const [values, setValues] = useState(spParameters)

    function mySubmitHandler (event: { preventDefault: () => void; }) {
        event.preventDefault();
        submitHandler(event, values)
    }

    return (
        <form onSubmit={mySubmitHandler}>
            <h3>Confirmed Despatches Parameters: </h3>
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
            <input
                type='submit'
            />
        </form>
    )  
}

export default ConfDespParams