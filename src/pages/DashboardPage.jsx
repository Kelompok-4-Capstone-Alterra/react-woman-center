import React from "react";
import Card from "../components/Card";
import TableContainer from "../components/Dashboard/Tables/TableContainer"
import TableTitle from "../components/Dashboard/Tables/TableTitle"
import Tables from "../components/Dashboard/Tables/Tables"
import TableHeader from "../components/Dashboard/Tables/TableHeader"
import TableBody  from "../components/Dashboard/Tables/TableBody"
import TableRow  from "../components/Dashboard/Tables/TableRow"
import GroupsIcon from '@mui/icons-material/Groups';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';

const DashboardPage =()=> {
  return(
    <>
    <div className="flex flex-row">
      <Card title="Total Users" amount="123.456.789" icon={<GroupsIcon style={{fontSize: '45px'}}/>}></Card>
      <Card title="Total Counselors" amount="123.456.789" icon={<GroupsIcon style={{fontSize: '45px'}}/>}></Card>
      <Card title="Total Transactions" amount="123.456.789"  icon={<ShoppingBagRoundedIcon style={{fontSize: '45px'}}/>}> </Card>
    </div>
    <TableContainer>
      <TableTitle title={"Recent Counseling Transaction"}/>
        <Tables>
          <TableHeader>
            <th>Date</th>
            <th>Transaction id</th>
            <th>User id</th>
            <th>Counselor id</th>
            <th>Counselor's Name</th>
            <th>Method</th>
            <th>Topic</th>
            <th>Time</th>
            <th>Price</th>
            <th>Status</th>
          </TableHeader>
          <TableBody>
            <TableRow>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            </TableRow>
          </TableBody>
        </Tables>
      </TableContainer>
    </>
  )
}

export default DashboardPage;