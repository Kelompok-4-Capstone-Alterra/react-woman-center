import React, { useState } from "react";
import TableContainer from "../components/Dashboard/Tables/TableContainer"
import TableTitle from "../components/Dashboard/Tables/TableTitle"
import Tables from "../components/Dashboard/Tables/Tables"
import TableHeader from "../components/Dashboard/Tables/TableHeader"
import TableBody  from "../components/Dashboard/Tables/TableBody"
import TableRow  from "../components/Dashboard/Tables/TableRow"
import Dropdown from "../components/Dropdown";
import Modal from "../components/Modal";
import ModalConfirm from "../components/ModalConfirm";
import InputField from "../components/InputField";
import ImageUploader from "../components/ImageUploader";
import ImageThumbnail from "../components/ImageUploader/ImageThumbnail";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonOutline from "../components/ButtonOutline/index.jsx";
import { useForm } from "react-hook-form";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

const UserCounselorPage = () => {
  const { control, getValues, register, handleSubmit, formState: { errors } } = useForm();
  const [isCounselor, setIsCounselor] = useState(true);
  const [isAdd, setisAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isView, setisView] = useState(false);


  const handleSelect = () => {
    const formData = getValues();
    const dropdownValue = formData.pageStatus;
    setIsCounselor(dropdownValue.value);
    console.log("isCounselor : ", isCounselor);

    console.log("Value: ", dropdownValue.value);
  };

  const handleEdit = () =>  {
    setisAdd(!isAdd);
  }

  const handleView = () =>  {
    setisView(!isView);
  }

  const handleDelete = () =>  {
    setIsDelete(!isDelete);
  }

  return(
    <>
      <div className="flex px-[40px] items-center py-[26px] justify-between border-b-primaryBorder border-b-[0.25px] mb-10">
        <div className="flex items-center text-primaryMain">
          <PersonIcon className="me-4" />{" "}
          <p className="text-lg font-medium ">Admin</p>
        </div>
        {isCounselor && (
          <ButtonPrimary className="flex items-center justify-center text-sm" onClick={handleEdit}>
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
            <td>
            <ButtonPrimary onClick={handleView}>
            View
            </ButtonPrimary>
            </td>
            <td><ButtonOutline onClick={handleDelete}>Delete</ButtonOutline></td>
            </TableRow>) : (
            <TableRow>
            <td>123</td>
            <td>John Doe</td>
            <td>johndoe123</td>
            <td>johndoe@gmail.com</td>
            <td><ButtonPrimary onClick={handleView}>View</ButtonPrimary></td>
            <td><ButtonOutline onClick={handleDelete}>Delete</ButtonOutline></td>
            </TableRow>
            )}
          </TableBody>
        </Tables>
      </TableContainer>
    </div>
    <Modal isOpen={isAdd} type={'addCounselor'}>
              <Modal.Title title={'New Counselor'} />
              <div>
              <form className="mb-3">
              <ImageUploader>
                <ImageThumbnail/>
                <AddIcon />
              </ImageUploader>
              <InputField name="username" label="Name" type="text" placeholder="johndoe" errors={errors} register={register}  />
              <InputField name="username" label="Email" type="text" placeholder="johndoe" errors={errors} register={register}  />
              <InputField name="username" label="Username" type="text" placeholder="johndoe" errors={errors} register={register}  />
              <InputField name="username" label="Topic" type="text" placeholder="Choose counselor's topic" errors={errors} register={register}  />
              <InputField name="username" label="Description" type="text" placeholder="Ex : Counselor work to empower women to make positive changes" errors={errors} register={register}  />
              <InputField name="username" label="Counseling Price" type="number" placeholder="johndoe" errors={errors} register={register}  />
              <ButtonPrimary>+ Add New Counselor</ButtonPrimary>
              </form>
              <ButtonOutline onClick={handleEdit}>Not Now</ButtonOutline>
              </div>
      </Modal>
      <Modal isOpen={isView} type={'viewUser'}>
              <Modal.Title title={'View User'} />
              <div>
              <form className="mb-3">
              <ImageUploader>
                <ImageThumbnail/>
                <AddIcon />
              </ImageUploader>
              <InputField name="username" label="Name" type="text" placeholder="johndoe" errors={errors} register={register}  />
              <InputField name="username" label="Email" type="text" placeholder="johndoe" errors={errors} register={register}  />
              <InputField name="username" label="Username" type="text" placeholder="johndoe" errors={errors} register={register}  />
              <InputField name="username" label="Topic" type="text" placeholder="Choose counselor's topic" errors={errors} register={register}  />
              <InputField name="username" label="Description" type="text" placeholder="Ex : Counselor work to empower women to make positive changes" errors={errors} register={register}  />
              <InputField name="username" label="Counseling Price" type="number" placeholder="johndoe" errors={errors} register={register}  />
              </form>
              <ButtonPrimary onClick={handleView}>Close</ButtonPrimary>
              </div>
      </Modal>
      <ModalConfirm
      isConfirm={isDelete}
      messages="Are you sure you want to delete this item?"
      onSure={handleDelete}
      onClose={handleDelete}
      />
    </>
  )
}

export default UserCounselorPage;