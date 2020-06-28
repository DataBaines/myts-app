import React, { useEffect, useState } from 'react';
//import ReactTable from 'react-table';

//import 'react-data-grid/dist/react-data-grid.css';

const defaultColumnProperties = {
  sortable: true
};

const cols = [
  { accessor: 'id', Header: 'ID' },
  { accessor: 'customer', Header: 'Customer' },
  { accessor: 'despdate', Header: 'Desp Date' },
  { accessor: 'weight', Header: 'Weight', Cell: props => <span className='number'>{props.value}</span>},
  { accessor: 'reg_date', Header: 'Reg Date' } 
]//.map(c => ({ ...c, ...defaultColumnProperties }));;

const columns = [
  {
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  },
  {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }
];

function DataGridBasic(props) {
  const {data} = props

  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://7k7zi7zooe.execute-api.eu-west-2.amazonaws.com/dev/basics", {
          method: 'get',
          headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
          }
        }
      )
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  if (error) {
    return <div>Error: {error?.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {/* <ReactTable
          data={rows}
          columns={cols}
          showPagination={false}
          defaultPageSize={2}
        /> */}
        <p>{JSON.stringify(items)}</p>
        <p>{items.length}</p>
      </div>
    );
  }
}

const ROW_COUNT = 2;


//Test data
const rows = [{id: 0, customer: 'C1', despdate: '2020-05-21', weight: 26.1, reg_date: '2020-05-21'}, 
{id: 1, customer: 'C2', despdate: '2020-05-22', weight: 214.1, reg_date: '2020-05-23'}];

export default DataGridBasic