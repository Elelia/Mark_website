import React, { Component, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable } from 'react-table';
import BTable from 'react-bootstrap/Table';
import {InputGroup, FormControl} from "react-bootstrap";

export default function TableAllSerieFilm(props) {

    const Cell = ({ row, column: { id } }) => {
        const [value, setValue] = useState(row?.original[id]);

        const handleOnChange = (e) => {
            setValue(e.target.value);
        };

        return (
            <InputGroup className="m-5">
                <FormControl value={value} onChange={handleOnChange} />
            </InputGroup>
        );
    };

    const {
        getTableProps, headerGroups, rows, prepareRow
    } = useTable(
        {
            columns: props.columns,
            data: props.films,
        },
        // useRowSelect,
        // hooks => {
        //     hooks.visibleColumns.push(columns => [
        //         {
        //             id: 'selection',
        //             Cell: ({ row }) => (
        //                 <div>
        //                     <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        //                 </div>
        //             ),
        //         },
        //         ...columns,
        //     ])
        // }
    );

    return (
        <BTable striped bordered hover size="sm" {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td {...cell.getCellProps()}>
                                    <input>{cell.render('Cell')}</input>
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </BTable>
    )
}
