import {Order, OrderLineItemConnection} from "@shopify/hydrogen/dist/storefront-api-types";
import {useMemo, useRef, useState} from "react";
import {flattenConnection} from "@shopify/hydrogen";
import {
    DataEditor,
    GridColumn,
    GridCellKind,
    Item,
    GridCell
} from "@glideapps/glide-data-grid";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import {useTable} from "react-table";


type OrderWithNodes = Omit<Order, 'lineItems'> & {
    lineItems: {
        nodes: OrderLineItemConnection['nodes'];
    };
};

type Props = {
    // orders?: OrderWithNodes[];
    data:any;
    columns:any;
};

export default function OrderHistory({data,columns}:Props){

    // const columnDef = [
    //     { name: 'Name', key: 'Number'},
    //     { name: 'OrderId', key: 'OrderId'},
    //     { name: 'Date', key: 'Date'},
    //     { name: 'OrderDetails', key: 'OrderDetails'},
    //     { name: 'Status', key: 'Status'},
    //     { name: 'Total', key: 'Total'},
    //     { name: 'Action', key: 'Action'},
    // ];
    //
    // const rowData = [
    //     {Number:1,OrderId:3504,Date:"03-27-2023",OrderDetails:"O2 5GB Data",Status:"Active",Total:"£15",Actions:"View Order"},
    //     {Number:2,OrderId:3505,Date:"04-27-2023",OrderDetails:"O2 5GB Data",Status:"Active",Total:"£15",Actions:"View Order"},
    //     {Number:3,OrderId:3506,Date:"05-27-2023",OrderDetails:"O2 5GB Data",Status:"Inactive",Total:"£15",Actions:"View Order"}
    // ];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });
    return(
        <div className="mt-4">

            <div className="h-32 w-20">
                <table {...getTableProps()} style={{ border: '1px solid black', width: '100%' }}>
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} style={{ borderBottom: 'solid 3px red', background: 'aliceblue', color: 'black', fontWeight: 'bold' }}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px gray', background: 'whitesmoke' }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/*{!orders?.length && <p>You haven&apos;t placed any orders yet.</p>}*/}

            {/*{!!orders?.length &&*/}
            {/*    <div className="ag-theme-alpine" style={{height:400, width:600}}>*/}
            {/*        <AgGridReact*/}
            {/*            columnDefs={columnDef}*/}
            {/*            rowData={rowData}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*}*/}

        </div>
    )

}
// function Orders({orders}: {orders: OrderWithNodes[]}) {
//     if (!order?.id) return null;
//     const [legacyOrderId, key] = order!.id!.split('/').pop()!.split('?');
//     const lineItems = flattenConnection(order?.lineItems);
//     return (
//         <ul className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-3">
//             {orders.map((order) => (
//
//             ))}
//         </ul>
//     );
// }