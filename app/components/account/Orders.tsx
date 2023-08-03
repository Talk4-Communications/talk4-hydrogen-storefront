import {Order, OrderLineItemConnection} from "@shopify/hydrogen/dist/storefront-api-types";
import {useMemo, useState} from "react";
import {flattenConnection} from "@shopify/hydrogen";
import {
    DataEditor,
    GridColumn,
    GridCellKind,
    Item,
    GridCell
} from "@glideapps/glide-data-grid";


type OrderWithNodes = Omit<Order, 'lineItems'> & {
    lineItems: {
        nodes: OrderLineItemConnection['nodes'];
    };
};

type Props = {
    orders?: OrderWithNodes[];
};

export default function OrderHistory(){

    const columnDef = [
        { headerName: '#', field: 'Number', width:140 },
        { field: 'OrderId', width:140 },
        { field: 'Date', width:140 },
        { field: 'OrderDetails', width:140 },
        { field: 'Status', width:140 },
        { field: 'Total', width:140 },
        { field: 'Action', width:140 },
    ]

    const rowData = [{Number:1,OrderId:3504,Date:"03-27-2023",OrderDetails:"O2 5GB Data",Status:"Active",Total:"£15",Actions:"View Order"}]

    return(
        <div className="mt-4">
            {/*{!orders?.length && <p>You haven&apos;t placed any orders yet.</p>}*/}

            {/*{!!orders?.length &&*/}
            {/*    <div className="ag-theme-alpine" style={{height:400, width:600}}>*/}
            {/*        <AgGridReact*/}
            {/*            columnDefs={columnDef}*/}
            {/*            rowData={rowData}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*}*/}

            {/*<div className="ag-theme-balham" style={{height:"50vh", width:"100%"}}>*/}
            {/*    <AgGridReact*/}
            {/*        columnDefs={columnDef}*/}
            {/*        rowData={rowData}*/}
            {/*    />*/}
            {/*</div>*/}

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