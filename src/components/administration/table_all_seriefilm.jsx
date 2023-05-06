import React, { Component, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable, useRowSelect } from 'react-table';
import BTable from 'react-bootstrap/Table';
import {Button} from "react-bootstrap";

export default function TableAllSerieFilm(props) {
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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns: props.columns,
            data: props.films,
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

    // const validate = () => {
    //     //console.log(selectedFlatRows);
    //     onSelectedRows(selectedFlatRows);
    // };

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
                <tbody>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </BTable>
            {/*<p>Selected Rows: {Object.keys(selectedRowIds).length}</p>*/}
            {/*<pre>*/}
            {/*    <code>*/}
            {/*      {JSON.stringify(*/}
            {/*          {*/}
            {/*              selectedRowIds: selectedRowIds,*/}
            {/*              'selectedFlatRows[].original': selectedFlatRows.map(*/}
            {/*                  d => d.original*/}
            {/*              ),*/}
            {/*          },*/}
            {/*          null,*/}
            {/*          2*/}
            {/*      )}*/}
            {/*    </code>*/}
            {/*</pre>*/}
            <br/>
            {/*<Button onClick={validate}>Valider</Button>*/}
        </div>
    );
}
