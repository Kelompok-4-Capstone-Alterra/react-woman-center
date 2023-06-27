import React from "react";
import { useForm } from "react-hook-form";
import Calendar from "../components/Calendar";
import TableContainer from "../components/Dashboard/Tables/TableContainer"
import TableTitle from "../components/Dashboard/Tables/TableTitle"
import Tables from "../components/Dashboard/Tables/Tables"
import TableHeader from "../components/Dashboard/Tables/TableHeader"
import TableBody  from "../components/Dashboard/Tables/TableBody"
import TableRow  from "../components/Dashboard/Tables/TableRow";
import PaginationTable from "../components/PaginationTable";
import ButtonPrimary from "../components/ButtonPrimary";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import StatusTag from "../components/StatusTag";
import { useState, useEffect } from "react";
import { getReport } from "../api/transaction";
import { getReportDownload } from "../api/transaction";
import { formatCurrency } from "../helpers/formatCurrency";
import { convertDate } from "../helpers/convertDate";
import { convertTime } from "../helpers/converTime";
import { hideId } from "../helpers/hideId";
import { Skeleton } from "@mui/material";

const Report = () => {
  const { register, control, formState: { errors } } = useForm();
  const [transactions, setTransactions] = useState([]);
  const [searchParams, setSearchParams] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [notFoundMsg, setNotFoundMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTransactionPages, setCurrentTransactionPages] = useState("");
  const [totalTransactionPages, setTotalTransactionPages] = useState("");
  const [rowsPerTransactionPage, setRowsPerTransactionPage] = useState(10);

  const handleSelectStart = (startDate)=>{
    setStartDate(startDate);
  }

  const handleSelectEnd = (endDate)=>{
    setEndDate(endDate);
  }

  const handleTransactionSearch = (e) => {
    setSearchParams(e.target.value);
    setCurrentTransactionPages(1);
  };

  const handleTransactionSortBy = (e) => {
    setSortBy(e.target.value);
    setCurrentTransactionPages(1);
  };
  
  const fetchReports = async (params = {}) => {
    setIsLoading(true);
    try {
      const {transaction,current_pages, total_pages } = await getReport(params);
      setTransactions(transaction);
      setCurrentTransactionPages(current_pages);
      setTotalTransactionPages(total_pages);
      setIsLoading(false);
      if (response.length < 1) {
        setNotFoundMsg("What you are looking for doesn't exist");
      }
    } catch (error) {
      setIsLoading(false);
    }
    setNotFoundMsg("What you are looking for doesn't exist");
  };

  const fetchReportDownload = async () => {
    setIsLoading(true);
    try {
      const response = await getReportDownload({
        start_date: startDate,
        end_date: endDate,
        sort_by: sortBy,
        search: searchParams,});
        setIsLoading(false);
        const csvContent = `data:text/csv;charset=utf-8,${response.data}`;
        const encodedURI = encodeURI(csvContent);
        
        window.open(encodedURI);
    } catch (error) {
      setIsLoading(false);
      console.log("err")
    }
  };
  
 
  useEffect (()=>{
    fetchReports({
      start_date: startDate,
      end_date: endDate,
      sort_by: sortBy,
      search: searchParams,
      limit: rowsPerTransactionPage,
      page: currentTransactionPages,
    })
    
  },[ startDate,endDate,sortBy,searchParams]);

  return (
    <>
    <div className="flex relative w-full">
      <div className="w-1/2 mr-4">
        <Calendar
        control ={control}
        type="calendar-input"
        name="datecalender"
        label="Start Date"
        errors={errors}
        register={register}
        handleSelect={handleSelectStart}
        />
      </div>
      <div className="w-1/2">
        <Calendar
        control ={control}
        type="calendar-input"
        name="datecalender"
        label="End Date"
        errors={errors}
        register={register}
        handleSelect={handleSelectEnd}/>
      </div>
    </div>
      <ButtonPrimary 
        className="my-4 w-[140px] h-10 text-base"
        onClick={fetchReportDownload}>
        <FileDownloadRoundedIcon className="mr-[10px]" />Export File
      </ButtonPrimary>
    <TableContainer>
        <TableTitle 
        title={"Counseling Report"}
        onChange={(e)=>
          handleTransactionSearch(e)
        }
        sortBy={sortBy}
        onSelect={(e) => 
          handleTransactionSortBy(e)
        }
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
          {transactions.length >= 1 ? (
            transactions.map((transaction,index) => (
            <TableRow key={index} >
              {isLoading ? (
                  <td colSpan={12}>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width="100%"
                      height={50}
                  />
                </td>
              ) : (
                <>
                  <td className="w-[130px]">{convertDate(transaction.created_at, " / ", true)}</td>
                  <td className="w-[130px]">{hideId(transaction.id)}</td>
                  <td className="w-[130px]">{hideId(transaction.user_id)}</td>
                  <td className="w-[130px]">{hideId(transaction.counselor_data.id)}</td>
                  <td className="w-[130px]">{transaction.counselor_data.name}</td>
                  <td className="w-[130px]">{transaction.consultation_method}</td>
                  <td className="w-[130px]">{transaction.counselor_data.topic}</td>
                  <td className="w-[130px]">{convertTime(transaction.time_start)}</td>
                  <td className="w-[130px]">{formatCurrency(transaction.counselor_data.price)}</td>
                  <td className="w-[130px]"><StatusTag type={transaction.status} /></td>
                </>
              ) }
              </TableRow>
            ))
             ) : (
              <TableRow>
              <td colSpan={7}>{notFoundMsg}</td>
            </TableRow>
             )}                         
          </TableBody>
        </Tables>
      {transactions.length >= 1 && (
          <PaginationTable
            page={currentTransactionPages}
            rows={totalTransactionPages}
            rowsPerPage={rowsPerTransactionPage}
            handleChangePage={(event, currentTransactionPages) => {
              setCurrentTransactionPages(currentTransactionPages);
              fetchReports({
                page: currentTransactionPages,
                sort_by: sortBy,
                limit: rowsPerTransactionPage,
                start_date: startDate,
                end_date: endDate,
              });
            }}
            handleChangeRowsPerPage={(event) => {
              setRowsPerTransactionPage(parseInt(event.target.value, 10));
              setCurrentTransactionPages(1);
              setSearchParams("");
              fetchReports({
                limit: parseInt(event.target.value, 10),
                page: currentTransactionPages,
                sort_by: sortBy,
                start_date: startDate,
                end_date: endDate,
              });
            }}
          />
        )}  
      </TableContainer>
    </>
  )
};

export default Report