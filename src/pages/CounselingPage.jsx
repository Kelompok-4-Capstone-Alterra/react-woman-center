import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import TableTitle from "../components/Dashboard/Tables/TableTitle";
import TableContainer from "../components/Dashboard/Tables/TableContainer";
import TableHeader from "../components/Dashboard/Tables/TableHeader";
import Tables from "../components/Dashboard/Tables/Tables";
import TableBody from "../components/Dashboard/Tables/TableBody";
import TableRow from "../components/Dashboard/Tables/TableRow";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import Dropdown from "../components/Dropdown";

const CounselingPage = () => {
  const [isSchedule, setIsSchedule] = useState(true);

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const handleSelect = () => {
    const formData = getValues();
    const dropdownValue = formData.pageStatus;
    setIsSchedule(dropdownValue.value);
    console.log("isShedule : ", isSchedule);

    console.log("Value: ", dropdownValue.value);
  };

  return (
    <div className="">
      <div className="flex px-[40px] items-center py-[26px] justify-between border-b-primaryBorder border-b-[0.25px] mb-10">
        <div className="flex items-center text-primaryMain">
          <PersonIcon className="me-4" />{" "}
          <p className="text-lg font-medium ">Admin</p>
        </div>
        {isSchedule && (
          <Button className="flex items-center justify-center text-sm">
            <AddIcon /> Add Schedule
          </Button>
        )}
      </div>

      <div className="px-[40px]">
        <div>
          <form className="w-[360px]">
            <Dropdown
              control={control}
              name={"pageStatus"}
              label={"Choose Sub Menu : "}
              placeholder={"Counseling's Schedule"}
              handleSelect={handleSelect}
            >
              <option value={true} label="Counseling's Schedule" />
              <option value={false} label="Counseling's Transaction" />
            </Dropdown>
          </form>
        </div>
        <TableContainer>
          <TableTitle
            title={`Counseling's ${isSchedule ? "Schedule" : "Transaction"}`}
          />
          <Tables scroll={!isSchedule}>
            {isSchedule ? (
              <TableHeader>
                <th className="w-[130px]">Counselor Id</th>
                <th className="w-[130px]">Counselor's Name</th>
                <th className="w-[130px]">Status</th>
                <th className="w-[130px]">Topic</th>
                <th className="w-[130px]">Update</th>
                <th className="w-[130px]">View</th>
                <th className="w-[130px]">Delete</th>
              </TableHeader>
            ) : (
              <TableHeader>
                <th className="w-[130px]">Date</th>
                <th className="w-[130px]">Transaction Id</th>
                <th className="w-[130px]">User Id</th>
                <th className="w-[130px]">Counselor Id</th>
                <th className="w-[130px]">Counselor's Name</th>
                <th className="w-[130px]">Method</th>
                <th className="w-[130px]">Topic</th>
                <th className="w-[130px]">Time</th>
                <th className="w-[130px]">Price</th>
                <th className="w-[130px]">Status</th>
                <th className="w-[130px]">Link</th>
                <th className="w-[130px]">Cancel</th>
              </TableHeader>
            )}

            <TableBody>
              {isSchedule ? (
                <TableRow>
                  <td className="w-[130px]">123456</td>
                  <td className="w-[130px]">John Doe</td>
                  <td className="w-[130px]">Available</td>
                  <td className="w-[130px]">Mental Health</td>
                  <td className="w-[130px]">Update</td>
                  <td className="w-[130px]">View</td>
                  <td className="w-[130px]">Delete</td>
                </TableRow>
              ) : (
                <TableRow>
                  <td className="w-[130px]">12 / 05 / 23</td>
                  <td className="w-[130px]">1234567</td>
                  <td className="w-[130px]">1234567</td>
                  <td className="w-[130px]">1234567</td>
                  <td className="w-[130px]">John Doe</td>
                  <td className="w-[130px]">Chat</td>
                  <td className="w-[130px]">Mental Health</td>
                  <td className="w-[130px]">12 : 00</td>
                  <td className="w-[130px]">Rp. 120.000</td>
                  <td className="w-[130px]">Ongoing</td>
                  <td className="w-[130px]">Go send link</td>
                  <td className="w-[130px]">cancel</td>
                </TableRow>
              )}
            </TableBody>
          </Tables>
        </TableContainer>
      </div>
    </div>
  );
};

export default CounselingPage;
