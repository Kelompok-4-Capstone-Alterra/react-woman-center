import React from "react";
import TableContainer from "../components/Dashboard/Tables/TableContainer"
import TableTitle from "../components/Dashboard/Tables/TableTitle"
import Tables from "../components/Dashboard/Tables/Tables"
import TableHeader from "../components/Dashboard/Tables/TableHeader"
import TableBody  from "../components/Dashboard/Tables/TableBody"
import TableRow  from "../components/Dashboard/Tables/TableRow"
import Button from "../components/Button";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

const Report = () => {
  return (
    <>
    <Button className="m-4 w-[140px] h-10 text-sm"><FileDownloadRoundedIcon className="mr-[10px]" />Export File</Button>
    <TableContainer>
      <TableTitle title={"Counseling Report"}/>
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
};

export default Report