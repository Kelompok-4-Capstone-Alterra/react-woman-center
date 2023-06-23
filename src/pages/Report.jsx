import React from "react";
import { useForm } from "react-hook-form";
import Calendar from "../components/Calendar";
import TableContainer from "../components/Dashboard/Tables/TableContainer"
import TableTitle from "../components/Dashboard/Tables/TableTitle"
import Tables from "../components/Dashboard/Tables/Tables"
import TableHeader from "../components/Dashboard/Tables/TableHeader"
import TableBody  from "../components/Dashboard/Tables/TableBody"
import TableRow  from "../components/Dashboard/Tables/TableRow"
import ButtonPrimary from "../components/ButtonPrimary";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import StatusTag from "../components/StatusTag";
import { CSVLink } from "react-csv";
import { useState, useEffect } from "react";
import { getReport } from "../api/transaction";
import { formatCurrency } from "../helpers/formatCurrency";
import { convertDate } from "../helpers/convertDate";

const Report = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [transactions, setTransactions] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  }
  const handleSelect=(startDate)=>{
    console.log("Start Date : ",startDate);
    setStartDate(startDate);
  }

  const handleSelect2=(endDate)=>{
    console.log("End Date : ", endDate);
    setEndDate(endDate);
  }

  const headers = [
    { label: 'Date', key: 'created_at'},
    { label: 'Transaction id', key: 'id'},
    { label: 'User id', key: 'user_id'},
    { label: 'Counselor id', key: 'counselor_data.id'},
    { label: 'Counselors name', key: 'counselor_data.name'},
    { label: 'Method', key: 'consultation_method'},
    { label: 'Topic', key: 'counselor_data.topic'},
    { label: 'Time', key: 'time_start'},
    { label: 'Price', key: 'counselor_data.price'},
    { label: 'Status', key: 'status'},
  ];
 
  useEffect (()=>{
    getReport({ start_date: startDate, end_date: endDate, sort_by: sortBy}).then((data) => {
      setTransactions(data);
      console.log(data);
    });
  },[ startDate,endDate,sortBy]);

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex relative w-full m-4">
      <div className="w-1/2 mr-4">
        <Calendar
        control ={control}
        type="calendar-input"
        name="datecalender"
        label="Start Date"
        errors={errors}
        register={register}
        handleSelect={handleSelect}
        />
      </div>
      <div className="w-1/2 mr-4">
        <Calendar
        control ={control}
        type="calendar-input"
        name="datecalender"
        label="End Date"
        errors={errors}
        register={register}
        handleSelect={handleSelect2}/>
      </div>
    </div>
    </form>
    <ButtonPrimary className="m-4 w-[140px] h-10 text-sm">
      <FileDownloadRoundedIcon className="mr-[10px]" />
      <CSVLink 
      data={transactions}
      headers={headers}
      filename={"Counseling Report.csv"}
      >Export
      </CSVLink>
    </ButtonPrimary>
    <TableContainer>
        <TableTitle 
        title={"Counseling Report"}
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
            {transactions.map((transaction) => (
            <TableRow key={transaction.id} >
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
  )
};

export default Report