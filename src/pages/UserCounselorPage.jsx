import React, { useState } from "react";
import TableContainer from "../components/Dashboard/Tables/TableContainer"
import TableTitle from "../components/Dashboard/Tables/TableTitle"
import Tables from "../components/Dashboard/Tables/Tables"
import TableHeader from "../components/Dashboard/Tables/TableHeader"
import TableBody  from "../components/Dashboard/Tables/TableBody"
import TableRow  from "../components/Dashboard/Tables/TableRow"
import Dropdown from "../components/Dropdown";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonOutline from "../components/ButtonOutline";
import { useForm } from "react-hook-form";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

const UserCounselorPage = () => {
  const { control, getValues } = useForm();
  const [isCounselor, setIsCounselor] = useState(true);

  const handleSelect = () => {
    const formData = getValues();
    const dropdownValue = formData.pageStatus;
    setIsCounselor(dropdownValue.value);
    console.log("isCounselor : ", isCounselor);

    console.log("Value: ", dropdownValue.value);
  };

  return(
    <>
      <div className="flex px-[40px] items-center py-[26px] justify-between border-b-primaryBorder border-b-[0.25px] mb-10">
        <div className="flex items-center text-primaryMain">
          <PersonIcon className="me-4" />{" "}
          <p className="text-lg font-medium ">Admin</p>
        </div>
        {isCounselor && (
          <ButtonPrimary className="flex items-center justify-center text-sm">
            <AddIcon /> Add Counselor
          </ButtonPrimary>
        )}
      </div>
      <div className="mx-6">
          <form className="w-[360px]">
            <Dropdown
              control={control}
              name={"pageStatus"}
              label={"Choose Sub Menu : "}
              placeholder={"Counselors"}
              handleSelect={handleSelect}
            >
              <option value={true} label="Counselors" />
              <option value={false} label="Users" />
            </Dropdown>
          </form>
        </div>
    <div className="ms-6">
    <TableContainer>
      <TableTitle title={`${isCounselor ? "Counselors" : "Users"}`}/>
        <Tables>
        {isCounselor ? (
          <TableHeader>
            <th>Counselor ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Topic</th>
            <th>View</th>
            <th>Delete</th>
          </TableHeader>
        ) : (
          <TableHeader>
            <th>User ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>View</th>
            <th>Delete</th>
          </TableHeader>
        )}
          <TableBody>
          {isCounselor ? (
            <TableRow>
            <td>123</td>
            <td>Not John Doe</td>
            <td>notjohndoe123</td>
            <td>notjohndoe123@gmail.com</td>
            <td>Mental Health</td>
            <td><ButtonPrimary>View</ButtonPrimary></td>
            <td><ButtonOutline>Delete</ButtonOutline></td>
            </TableRow>) : (
            <TableRow>
            <td>123</td>
            <td>John Doe</td>
            <td>johndoe123</td>
            <td>johndoe@gmail.com</td>
            <td><ButtonPrimary>View</ButtonPrimary></td>
            <td><ButtonOutline>Delete</ButtonOutline></td>
            </TableRow>
            )}
          </TableBody>
        </Tables>
      </TableContainer>
    </div>
    </>
  )
}

export default UserCounselorPage;