import React, { Component, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useRowSelect, useTable} from 'react-table';
import BTable from 'react-bootstrap/Table';
import {InputGroup, FormControl, Button} from "react-bootstrap";
import './table.css';

export default function TableAllSerieFilm(props) {
    const { onSaveChanges } = props;
    const { onSelectedRows } = props;

    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef

            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])

            return (
                <>
                    <input type="checkbox" ref={resolvedRef} {...rest} />
                </>
            )
        }
    );

    const tableInstance = useTable(
        {
            columns: props.columns,
            data: props.films
        },
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows, state: { selectedRowIds } } = tableInstance;

    const handleSaveChanges = () => {
        onSaveChanges(tableInstance.rows.map((row) => row.original));
    };

    const handleDelete = () => {
        console.log(selectedFlatRows);
        onSelectedRows(selectedFlatRows);
    };

    return (
        <div>
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
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell, index) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {index === 0 ? cell.render('Cell') : (
                                            <input type="text" defaultValue={cell.value} onChange={(e) => {
                                                const newValue = e.target.value;
                                                row.original[cell.column.id] = newValue;
                                            }} />
                                        )}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </BTable>
            <br/>
            <Button onClick={handleSaveChanges}>Valider les changements</Button>  <Button onClick={handleDelete}>Supprimer les lignes sélectionnées</Button>
            <br/>
        </div>
    );
}
