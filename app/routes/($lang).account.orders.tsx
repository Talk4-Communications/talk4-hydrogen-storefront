import DataGrid from "react-data-grid";
import {useTable} from "react-table"
import OrderHistory from "../components/account/Orders";


export default function getOrders(){

    const columnDef = [
        { Header: '#', accessor: 'Number'},
        { Header: 'OrderId', accessor: 'OrderId'},
        { Header: 'Date', accessor: 'Date'},
        { Header: 'OrderDetails', accessor: 'OrderDetails'},
        { Header: 'Status', accessor: 'Status'},
        { Header: 'Total', accessor: 'Total'},
        { Header: 'Action', accessor: 'Action'},
    ];

    const rowData = [
        {Number:1,OrderId:3504,Date:"03-27-2023",OrderDetails:"O2 5GB Data",Status:"Active",Total:"£15",Action:"View Order"},
        {Number:2,OrderId:3505,Date:"04-27-2023",OrderDetails:"O2 5GB Data",Status:"Active",Total:"£15",Action:"View Order"},
        {Number:3,OrderId:3506,Date:"05-27-2023",OrderDetails:"O2 5GB Data",Status:"Inactive",Total:"£15",Action:"View Order"}
    ];


    return(
        <div className="h-full w-full">
            <OrderHistory columns={columnDef} data={rowData} ></OrderHistory>
        </div>
    );
}