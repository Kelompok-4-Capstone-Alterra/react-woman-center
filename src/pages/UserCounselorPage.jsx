import React, { useState, useEffect } from "react";
import axios from 'axios';
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
import AddIcon from "@mui/icons-material/Add";
import { getAllCounselors, getAllUsers, deleteCounselorById, deleteUserById, getUserById, getCounselorById } from "../api/usercounselor";
import { getAuthCookie } from "../utils/cookies";
import { Alert, MenuItem, Select, Skeleton, Snackbar } from "@mui/material";
const { VITE_API_BASE_URL } = import.meta.env;

const UserCounselorPage = () => {
  const { control, getValues, register, handleSubmit, formState: { errors } } = useForm();
  const [isCounselor, setIsCounselor] = useState(true);
  const [isAdd, setisAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isView, setisView] = useState(false);
  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [user, setUser] = useState(null);
  const [counselor, setCounselor] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  const onSubmit = async (counselorData) => {
    const formData = new FormData();
        formData.append('name', counselorData.name);
        formData.append('email', counselorData.email);
        formData.append('username', counselorData.username);
        formData.append('topic', counselorData.topic.value);
        formData.append('description', counselorData.description);
        formData.append('price', counselorData.price);
        formData.append('profile_picture', selectedImage);

        try {
          const token = getAuthCookie();
      
          const config = {
            method: "POST",
            baseURL: VITE_API_BASE_URL,
            url: `/admin/counselors`,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
            data: formData
          };
      
          const response = await axios(config);
      
          return response.data.meta;
      } catch (error) {
        throw error.response.meta;
      }
  };

  useEffect(() => {
    const fetchDataCounselors = async () => {
      try {
        const counselorsData = await getAllCounselors();
        setData(counselorsData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    const fetchDataUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setData(usersData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    if (isCounselor) {
      fetchDataCounselors();
    } else {
      fetchDataUsers();
    }
  }, [isCounselor]);

  const deleteCounselor = async (counselorId) => {
    try {
      const response = await deleteCounselorById(counselorId);
      getAllCounselors();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await deleteUserById(userId);
      getAllUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (userId) => {
    setisView(!isView);
    try {
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const getCounselor = async (userId) => {
    setisView(!isView);
    try {
      const counselorData = await getCounselorById(userId);
      setCounselor(counselorData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleImageChange = (file) => {
    setSelectedImage(file);
    const fileURL = URL.createObjectURL(file);
    setImagePreview(fileURL);
  };


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

  const handleSearchCounselor= (event) => {
    const keyword = event.target.value;

    getAllCounselors({ search: keyword });
  };

  return(
    <>
    <div className="px-[40px]">
    <div className="flex flex-row justify-between items-center">
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
          <div>
          {isCounselor && (
          <ButtonPrimary className="flex items-center justify-center text-sm" onClick={handleEdit}>
            <AddIcon /> Add Counselor
          </ButtonPrimary>
          )}
          </div>
    </div>
    <div className="flex justify-end items-center gap-4 mb-4">
          <span className="text-base">Sort By</span>
          <Select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            sx={{
              ".MuiSelect-select": {
                padding: "0.325rem 0.75rem",
              },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#9E9494 !important",
                borderWidth: "1px",
              },
            }}
            MenuProps={{
              sx: {
                "&& .Mui-selected": {
                  backgroundColor: "#AF1582 !important",
                  color: "#FFF",
                },
                "&& .Mui-selected:hover": {
                  backgroundColor: "#954E80 !important",
                },
              },
            }}
          >
            <MenuItem
              value="newest"
              sx={{
                "&:checked": {
                  backgroundColor: "#AF1582 !important",
                  color: "#FFF",
                },
              }}
            >
              Newest
            </MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
          {/* <span className="text-base">Sort By</span>
          <FilterDropdown>
            <FilterDropdown.Option>Newest</FilterDropdown.Option>
            <FilterDropdown.Option>Oldest</FilterDropdown.Option>
          </FilterDropdown> */}
        </div>
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
          data && Array.isArray(data) ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.topic}</td>
                <td>
                <ButtonPrimary onClick={() => getCounselor(item.id)}>View</ButtonPrimary>
                </td>
                <td>
                  <ButtonOutline onClick={() => deleteCounselor(item.id)}>Delete</ButtonOutline>
                </td>
              </TableRow>
            ))
          ) : (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
          )
        ) : (
          data && Array.isArray(data) ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  <ButtonPrimary onClick={() => getUser(item.id)}>View</ButtonPrimary>
                </td>
                <td>
                  <ButtonOutline onClick={() => deleteUser(item.id)}>Delete</ButtonOutline>
                </td>
              </TableRow>
            ))
          ) : (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
          )
        )}
          </TableBody>
        </Tables>
      </TableContainer>
    </div>
    <Modal isOpen={isAdd} type={'addCounselor'}>
              <Modal.Title title={'New Counselor'} />
              <div>
              <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
              <ImageUploader
              icon={<AddIcon />}
              name="image"
              handleChange={handleImageChange}
              errors={errors}
              register={register}>
                <ImageThumbnail src={imagePreview}/>
              </ImageUploader>
              <InputField name="name" label="Name" type="text" placeholder="johndoe" errors={errors} register={register}  />
              <InputField name="email" label="Email" type="text" placeholder="johndoe" errors={errors} register={register}  />
              <InputField name="username" label="Username" type="text" placeholder="johndoe" errors={errors} register={register}  />
              <Dropdown
              control={control}
              name="topic"
              label="Category"
              placeholder="Choose counselor category"
              errors={errors}
              register={register}
            >
              <option value="1" label="1. Self Development" />
              <option value="2" label="2. Family/Relationship"  />
              <option value="3" label="3. Spiritual"  />
              <option value="4" label="4. Career"  />
              <option value="5" label="5. Discrimination"  />
              <option value="6" label="6. Sexual Abuse"  />
              <option value="7" label="7. Couples"  />
              <option value="8" label="8. Depression"  />
              <option value="9" label="9. Mental Disorder"  />
              <option value="10" label="10. Self Harming Behaviour"  />
            </Dropdown>
              <InputField name="description" label="Description" type="text" placeholder="Ex : Counselor work to empower women to make positive changes" errors={errors} register={register}  />
              <InputField name="price" label="Counseling Price" type="number" placeholder="johndoe" errors={errors} register={register}  />
              <ButtonPrimary>+ Add New Counselor</ButtonPrimary>
              </form>
              <ButtonOutline onClick={handleEdit}>Not Now</ButtonOutline>
              </div>
      </Modal>
      {isCounselor ? (
        <Modal isOpen={isView} type={'viewUpdateCounselor'}>
              <Modal.Title title={'View & Update Counselor'} />
              <div>
              <form className="mb-3" onSubmit={handleSubmit(updateCounselor)}>
              <ImageUploader>
                <ImageThumbnail src={counselor?.profile_picture}/>
              </ImageUploader>
              <InputField name="username" label="ID" type="preview" value={counselor?.id} errors={errors} register={register}  />
              <InputField name="username" label="Name" type="text" placeholder={counselor?.name} errors={errors} register={register}  />
              <InputField name="username" label="Email" type="text" placeholder={counselor?.email} errors={errors} register={register}  />
              <InputField name="username" label="Username" type="text" placeholder={counselor?.username} errors={errors} register={register}  />
              <InputField name="username" label="Topic" type="text" placeholder={counselor?.topic} errors={errors} register={register}  />
              <InputField name="username" label="Description" type="text" placeholder={counselor?.description} errors={errors} register={register}  />
              <InputField name="username" label="Counseling Price" type="number" placeholder={counselor?.price} errors={errors} register={register}  />
              <ButtonPrimary onClick={handleView}>Save</ButtonPrimary>
              </form>
              <ButtonOutline onClick={handleView}>Close</ButtonOutline>
              </div>
      </Modal>
            ) : (
              <Modal isOpen={isView} type={'viewUser'}>
      <Modal.Title title={'View User'} />
              <div>
              <form className="mb-3">
              <ImageUploader>
                <ImageThumbnail src={user?.profile_picture}/>
              </ImageUploader>
              <InputField name="username" label="User ID" type="preview" value={user?.id}  />
              <InputField name="username" label="Name" type="preview" value={user?.name} />
              <InputField name="username" label="Email" type="preview" value={user?.email}  />
              <InputField name="username" label="Username" type="preview" value={user?.username} />
              <InputField name="username" label="Phone Number" type="preview" value={user?.phone_number} />
              </form>
              <ButtonPrimary onClick={handleView}>Close</ButtonPrimary>
              </div>
       </Modal>
            )}
      <ModalConfirm
      isConfirm={isDelete}
      messages="Are you sure you want to delete this item?"
      />
    </>
  )
}

export default UserCounselorPage;