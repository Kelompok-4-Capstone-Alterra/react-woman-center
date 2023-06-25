import React, { useState, useEffect } from "react";
import axios from 'axios';
import TableContainer from "../components/Dashboard/Tables/TableContainer"
import TableTitle from "../components/Dashboard/Tables/TableTitle"
import Tables from "../components/Dashboard/Tables/Tables"
import TableHeader from "../components/Dashboard/Tables/TableHeader"
import TableBody  from "../components/Dashboard/Tables/TableBody"
import TableRow  from "../components/Dashboard/Tables/TableRow"
import Dropdown from "../components/Dropdown";
import DropdownPage from "../components/DropdownPage";
import Modal from "../components/Modal";
import ModalConfirm from "../components/ModalConfirm";
import InputField from "../components/InputField";
import ImageUploader from "../components/ImageUploader";
import ImageThumbnail from "../components/ImageUploader/ImageThumbnail";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonOutline from "../components/ButtonOutline/index.jsx";
import Popup from "../components/Dashboard/Popup";
import { useForm } from "react-hook-form";
import { getAllCounselors, getAllUsers, deleteCounselorById, deleteUserById, getUserById, getCounselorById } from "../api/usercounselor";
import { getAuthCookie } from "../utils/cookies";
import { Alert, MenuItem, Select, Skeleton, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Delete, Edit, Visibility, Add, Link, EditRounded } from "@mui/icons-material";
import Avatar from '../assets/forum/avatar-default.png'
const { VITE_API_BASE_URL } = import.meta.env;

const UserCounselorPage = () => {
  const { control, getValues, register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isCounselor, setIsCounselor] = useState(true);
  const [isAdd, setisAdd] = useState(false);
  const [isView, setisView] = useState(false);
  const [counselorsData, setCounselorsData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [user, setUser] = useState(null);
  const [counselor, setCounselor] = useState(null);
  const [showModalConfirmUser, setShowModalConfirmUser] = useState(false);
  const [showModalConfirmCounselor, setShowModalConfirmCounselor] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCounselorId, setSelectedCounselorId] = useState(null);
  const [counselorSearchParams, setCounselorSearchParams] = useState("");
  const [userSearchParams, setUserSearchParams] = useState("");
  const [userSortBy, setUserSortBy] = useState("newest");
  const [counselorSortBy, setCounselorSortBy] = useState("newest")
  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState("success");

  const [isShowToast, setIsShowToast] = useState({
    isOpen: false,
    variant: "info",
    duration: 5000,
    message: "",
  });

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
          handleAdd();
          handlePopup(true, "Counselor succesfully added")
          const counselorsData = await getAllCounselors();
          setCounselorsData(counselorsData);

          return response.data.meta;
      } catch (error) {
        throw error.response.meta;
      }
  };

  const updateCounselor = async (counselorData) => {
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
          const id = counselor.id;
      
          const config = {
            method: "PUT",
            baseURL: VITE_API_BASE_URL,
            url: `/admin/counselors/${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
            data: formData
          };
      
          const response = await axios(config);

          handlePopup(true, "Counselor succesfully updated")

          const counselorsData = await getAllCounselors();
          setData(counselorsData);
      
          return response.data.meta;
      } catch (error) {
        throw error.response.meta;
      }
  };

  const fetchDataCounselors = async (params = {}) => {
    try {
      const counselorsData = await getAllCounselors(params);
      setCounselorsData(counselorsData);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const fetchDataUsers = async (params = {}) => {
    try {
      const usersData = await getAllUsers(params);
      setUsersData(usersData);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchDataCounselors({
    sort_by: counselorSortBy,
    search: counselorSearchParams
    });
  }, [counselorSortBy, counselorSearchParams]);

  useEffect(() => {
    fetchDataUsers({
      sort_by: userSortBy,
      search: userSearchParams
      });
  }, [userSortBy, userSearchParams]);

  const deleteCounselor = async (counselorId) => {
    try {
      const response = await deleteCounselorById(counselorId);
      handlePopup(true, response.message)
      const counselorsData = await getAllCounselors();
      setCounselorsData(counselorsData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await deleteUserById(userId);
      handlePopup(true, response.message)
      const usersData = await getAllUsers();
      setUsersData(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (userId) => {
    try {
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
    setisView(!isView);
  };

  const getCounselor = async (userId) => {
    try {
      const counselorData = await getCounselorById(userId);
      setCounselor(counselorData);
    } catch (error) {
      console.error(error);
    }
    setisView(!isView);
  };

  useEffect(() => {
    if (counselor) {
      setValue('image', counselor?.profile_picture);
      setValue('id', counselor?.id);
      setValue('name', counselor?.name);
      setValue('email', counselor?.email);
      setValue('username', counselor?.username);
      setValue('topic', counselor?.topic);
      setValue('description', counselor?.description);
      setValue('price', counselor?.price);
    }

  }, [counselor, setValue]);

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

  const handleAdd = () =>  {
    setisAdd(!isAdd);
  }

  const handleView = () =>  {
    setisView(!isView);
  }

  const openModalConfirmCounselor = (counselorId) => {
    setSelectedCounselorId(counselorId);
    setShowModalConfirmCounselor(true);
  };

  const handleShowModalConfirmCounselor= (showModal) => {
    setShowModalConfirmCounselor(showModal);
  };

  const handleDeleteCounselor = (counselorId) => {
    deleteCounselor(counselorId);
    handleShowModalConfirmCounselor(false);
  }

  const openModalConfirmUser = (userId) => {
    setSelectedUserId(userId);
    setShowModalConfirmUser(true);
  };

  const handleShowModalConfirmUser = (showModal) => {
    setShowModalConfirmUser(showModal);
  };
  

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
    handleShowModalConfirmUser(false);
  }


  const handlePopup = (type, message) => {
    setIsPopup(true);
    setPopupSuccess(type);
    setPopupMessage(message);
    setTimeout(function () {
      setIsPopup(false);
    }, 1500);
  };

  return(
    <>
    <div>
    <div className="flex flex-row justify-between items-center">
    <form className="w-[360px]">
            <DropdownPage
              control={control}
              name={"pageStatus"}
              type="page"
              label={"Choose Sub Menu : "}
              placeholder={"Counselors"}
              handleSelect={handleSelect}
            >
              <option value={true} label="Counselors" />
              <option value={false} label="Users" />
            </DropdownPage>
          </form>
          <div>
          {isCounselor && (
          <ButtonPrimary className="flex items-center justify-center text-sm" onClick={handleAdd}>
            <AddIcon /> New Counselor
          </ButtonPrimary>
          )}
          </div>
    </div>
    <TableContainer>
      <TableTitle
      title={`${isCounselor ? "Counselors" : "Users"}`}
      onChange={
            isCounselor
              ? (e) => setCounselorSearchParams(e.target.value)
              : (e) => setUserSearchParams(e.target.value)
          }
          // SortBy
          sortBy={isCounselor ? counselorSortBy : userSortBy}
          onSelect={
            isCounselor
              ? (e) => setCounselorSortBy(e.target.value)
              : (e) => setUserSortBy(e.target.value)
          }
          />
        <Tables>
        {isCounselor ? (
          <TableHeader>
            <th className="w-[130px]">Counselor ID</th>
            <th className="w-[130px]">Name</th>
            <th className="w-[130px]">Username</th>
            <th className="w-[130px]">Email</th>
            <th className="w-[130px]">Topic</th>
            <th className="w-[130px]">View</th>
            <th className="w-[130px]">Delete</th>
          </TableHeader>
        ) : (
          <TableHeader>
            <th className="w-[130px]">User ID</th>
            <th className="w-[130px]">Name</th>
            <th className="w-[130px]">Username</th>
            <th className="w-[130px]">Email</th>
            <th className="w-[130px]">View</th>
            <th className="w-[130px]">Delete</th>
          </TableHeader>
        )}
          <TableBody>
          {isCounselor ? (
          counselorsData && Array.isArray(counselorsData) ? (
            counselorsData.map((counselor) => (
              <TableRow key={counselor.id}>
                <td className="w-[130px]">{counselor.id}</td>
                <td className="w-[130px]">{counselor.name}</td>
                <td className="w-[130px]">{counselor.username}</td>
                <td className="w-[130px]">{counselor.email}</td>
                <td className="w-[130px]">{counselor.topic}</td>
                <td className="w-[130px]">
                <ButtonPrimary className="w-[90%]" onClick={() => getCounselor(counselor.id)}>
                <Visibility
                              className="mr-1"
                              style={{ fontSize: "1.125rem" }}
                            />
                            <span>View</span>
                </ButtonPrimary>
                </td>
                <td className="w-[130px]">
                  <ButtonOutline className="w-[90%]" onClick={() => openModalConfirmCounselor(counselor.id)}>
                  <Delete
                              className="mr-1"
                              style={{ fontSize: "1.125rem" }}
                            />
                            <span>Delete</span>
                  </ButtonOutline>
                </td>
              </TableRow>
            ))
          ) : (
              <tr>
                <td colSpan={9}>What you are looking for doesn't exist</td>
              </tr>
          )
        ) : (
          usersData && Array.isArray(usersData) ? (
            usersData.map((user) => (
              <TableRow key={user.id}>
                <td className="w-[130px]">{user.id}</td>
                <td className="w-[130px]">{user.name}</td>
                <td className="w-[130px]">{user.username}</td>
                <td className="w-[130px]">{user.email}</td>
                <td className="w-[130px]">
                  <ButtonPrimary className="w-[90%]" onClick={() => getUser(user.id)}>
                  <Visibility
                              className="mr-1"
                              style={{ fontSize: "1.125rem" }}
                            />
                            <span>View</span>
                  </ButtonPrimary>
                </td>
                <td className="w-[130px]">
                  <ButtonOutline className="w-[90%]" onClick={() => openModalConfirmUser(user.id)}>
                  <Delete
                              className="mr-1"
                              style={{ fontSize: "1.125rem" }}
                            />
                            <span>Delete</span>
                  </ButtonOutline>
                </td>
              </TableRow>
            ))
          ) : (
              <tr>
                <td colSpan={9}>What you are looking for doesn't exist</td>
              </tr>
          )
        )}
          </TableBody>
        </Tables>
      </TableContainer>
    </div>
    <Modal isOpen={isAdd} type={'addCounselor'} onClose={handleAdd}>
              <Modal.Title title={'New Counselor'} />
              <div>
              <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
              <ImageUploader
              icon={<EditRounded fontSize="12px" />}
              className="mb-5"
              name="image"
              handleChange={handleImageChange}
              errors={errors}
              register={register}>
              { imagePreview ? <ImageThumbnail src={imagePreview}/> : <Add /> }
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
              <option value="1" label="Self Development" />
              <option value="2" label="Family/Relationship"  />
              <option value="3" label="Spiritual"  />
              <option value="4" label="Career"  />
              <option value="5" label="Discrimination"  />
              <option value="6" label="Sexual Abuse"  />
              <option value="7" label="Couples"  />
              <option value="8" label="Depression"  />
              <option value="9" label="Mental Disorder"  />
              <option value="10" label="Self Harming Behaviour"  />
            </Dropdown>
              <InputField name="description" label="Description" type="text" placeholder="Ex : Counselor work to empower women to make positive changes" errors={errors} register={register}  />
              <InputField name="price" label="Counseling Price" type="number" placeholder="johndoe" errors={errors} register={register}  />
              <ButtonPrimary className="h-fit w-full px-3 py-3 flex items-center justify-center">+ Add New Counselor</ButtonPrimary>
              </form>
              <ButtonOutline className="h-fit w-full px-3 py-3 flex items-center justify-center" onClick={handleAdd}>Not Now</ButtonOutline>
              </div>
      </Modal>
      {isCounselor ? (
        <Modal isOpen={isView} type={'viewUpdateCounselor'} onClose={handleView}>
              <Modal.Title title={'View & Update Counselor'} />
              <div>
              <form className="mb-3" onSubmit={handleSubmit(updateCounselor)}>
              <ImageUploader
              icon={<EditRounded fontSize="12px" />}
              className="mb-5"
              name="image"
              handleChange={handleImageChange}
              errors={errors}
              register={register}>
                <ImageThumbnail src={counselor?.profile_picture}/>
              </ImageUploader>
              <InputField name="id" label="ID" type="text" errors={errors} register={register} disabled={true} />
              <InputField name="name" label="Name" type="text"  errors={errors} register={register}  />
              <InputField name="email" label="Email" type="text" errors={errors} register={register}  />
              <InputField name="username" label="Username" type="text" errors={errors} register={register}  />
              <Dropdown
              control={control}
              name="topic"
              label="Category"
              type="edit"
              placeholder={counselor?.topic}
              errors={errors}
              register={register}
            >
              <option value="1" label="Self Development" />
              <option value="2" label="Family/Relationship"  />
              <option value="3" label="Spiritual"  />
              <option value="4" label="Career"  />
              <option value="5" label="Discrimination"  />
              <option value="6" label="Sexual Abuse"  />
              <option value="7" label="Couples"  />
              <option value="8" label="Depression"  />
              <option value="9" label="Mental Disorder"  />
              <option value="10" label="Self Harming Behaviour"  />
            </Dropdown>
              <InputField name="description" label="Description" type="text"  errors={errors} register={register}  />
              <InputField name="price" label="Counseling Price" type="number" errors={errors} register={register}  />
              <ButtonPrimary className="h-fit w-full px-3 py-3 flex items-center justify-center">Save</ButtonPrimary>
              </form>
              <ButtonOutline className="h-fit w-full px-3 py-3 flex items-center justify-center" onClick={handleView}>Close</ButtonOutline>
              </div>
      </Modal>
            ) : (
              <Modal isOpen={isView} type={'viewUser'}>
      <Modal.Title title={'View User'} />
              <div>
              <form className="mb-3">
              <ImageUploader>
                { user?.profile_picture ? <ImageThumbnail src={user?.profile_picture}/> : <ImageThumbnail src={Avatar} /> }
              </ImageUploader>
              <InputField name="id" label="User ID" type="preview" value={user?.id}  />
              <InputField name="name" label="Name" type="preview" value={user?.name} />
              <InputField name="email" label="Email" type="preview" value={user?.email}  />
              <InputField name="username" label="Username" type="preview" value={user?.username} />
              { user?.phone_number ? <InputField name="phone_number" label="Phone Number" type="preview" value={user?.phone_number} /> : <InputField name="phone_number" label="Phone Number" type="preview" value="-" /> }
              </form>
              <ButtonPrimary className="h-fit w-full px-3 py-3 flex items-center justify-center" onClick={handleView}>Close</ButtonPrimary>
              </div>
       </Modal>
            )}
            {showModalConfirmUser && (
            <ModalConfirm
              onSure={() => handleDeleteUser(selectedUserId)}
              onClose={handleShowModalConfirmUser}
              isConfirm={showModalConfirmUser}
              messages="Are you sure want to delete this item?"
            />
          )}
          {showModalConfirmCounselor && (
            <ModalConfirm
              onSure={() => handleDeleteCounselor(selectedCounselorId)}
              onClose={handleShowModalConfirmCounselor}
              isConfirm={showModalConfirmCounselor}
              messages="Are you sure want to delete this item?"
            />
          )}
          <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />
          <Snackbar
        open={isShowToast.isOpen}
        autoHideDuration={isShowToast.duration}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setIsShowToast({ ...isShowToast, isOpen: false })}
      >
        <Alert
          onClose={() => setIsShowToast({ ...isShowToast, isOpen: false })}
          severity={isShowToast.variant}
          sx={{ width: "100%" }}
          className="capitalize"
        >
          {isShowToast.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default UserCounselorPage;