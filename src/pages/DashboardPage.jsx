import { useEffect, useState } from "react";
import Card from "../components/Card";
import TableContainer from "../components/Dashboard/Tables/TableContainer";
import TableTitle from "../components/Dashboard/Tables/TableTitle";
import Tables from "../components/Dashboard/Tables/Tables";
import TableHeader from "../components/Dashboard/Tables/TableHeader";
import TableBody from "../components/Dashboard/Tables/TableBody";
import TableRow from "../components/Dashboard/Tables/TableRow";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PaginationTable from "../components/Pagination";
import StatusTag from "../components/StatusTag";
import { getAllTransactions } from "../api/transaction";
import { formatCurrency } from "../helpers/formatCurrency";
import { convertDate } from "../helpers/convertDate";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
   // Function to handle the sorting
    const handleSort = () => {
    const sortedData = [...transactions];
    sortedData.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortBy === 'Newest' ? dateA - dateB : dateB - dateA;
    });
    setTransactions(sortedData);
    setSortBy(sortBy === 'Newest' ? 'Oldes' : 'Newest');
    };
    
  
  useEffect(() => {
    getAllTransactions({ sort_by: sortBy }).then((data) => {
      setTransactions(data);
      console.log(data);
    });
  }, [sortBy]);


  return (
    <>
      <div className="flex gap-5 mb-10">
        <Card
          title="Total Users"
          amount="123.456.789"
          icon={<GroupsIcon style={{ fontSize: "45px" }} />}
        ></Card>
        <Card
          title="Total Counselors"
          amount="123.456.789"
          icon={<GroupsIcon style={{ fontSize: "45px" }} />}
        ></Card>
        <Card
          title="Total Transactions"
          amount="123.456.789"
          icon={<ShoppingBagRoundedIcon style={{ fontSize: "45px" }} />}
        ></Card>
      </div>
      <TableContainer>
        <TableTitle 
        title={"Recent Counseling Transaction"}
        onChange={(e)=>(
          console.log(e.target.value)
        )}
        sortBy={sortBy}
        onSelect={(event) => setSortBy(event.target.value)}
         />
        <Tables scroll>
          <TableHeader>
            <th className="w-[130px]">Date</th>
            <th className="w-[130px]">Transaction id</th>
            <th className="w-[130px]">User id</th>
            <th className="w-[130px]">Counselor id</th>
            <th className="w-[130px]">Counselor's Name</th>
            <th className="w-[130px]">Method</th>
            <th className="w-[130px]">Topic</th>
            <th className="w-[130px]">Time</th>
            <th className="w-[130px]">Price</th>
            <th className="w-[130px]">Status</th>
          </TableHeader>
          <TableBody>          
            {transactions.map((transaction,index) => (
            <TableRow key={index} >
              <td className="w-[130px]">{convertDate(transaction.created_at)}</td>
              <td className="w-[130px]">{transaction.id}</td>
              <td className="w-[130px]">{transaction.user_id}</td>
              <td className="w-[130px]">{transaction.counselor_data.id}</td>
              <td className="w-[130px]">{transaction.counselor_data.name}</td>
              <td className="w-[130px]">{transaction.consultation_method}</td>
              <td className="w-[130px]">{transaction.counselor_data.topic}</td>
              <td className="w-[130px]">{transaction.time_start}</td>
              <td className="w-[130px]">{formatCurrency(transaction.counselor_data.price)}</td>
              <td className="w-[130px]"><StatusTag type={transaction.status} /></td>
            </TableRow>
            ))} 
          </TableBody>
        </Tables>
      </TableContainer>     
    </>
  );
};

export default DashboardPage;
