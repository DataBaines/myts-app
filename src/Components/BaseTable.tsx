import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//import makeData from './makeData'

export const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      :nth-child(even) {background-color: #f2f2f2;}
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      font-size: 12px;

      :last-child {
        border-right: 0;
      }
    }

    th {
      background-color: dimgray;  
      color: azure;
    }
  }
`
// Create a default prop getter
const defaultPropGetter = () => ({})

function BaseTable({ columns, data, getRowProps = (row) => ({}) }) {
  // Use the state and functions returned from useTable to build your UI
 
  const tableInstance= useTable({
    columns,
    data,
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
 
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps( getRowProps(row) )}>
              {row.cells.map(cell => {
                return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}


export default BaseTable