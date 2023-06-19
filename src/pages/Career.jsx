import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCareer } from "../features/career/careerSlice";
import CardCareer from "../components/CardCareer";
import SearchBar from "../components/SearchBar";
import ButtonPrimary from "../components/ButtonPrimary";
import { AddRounded } from "@mui/icons-material";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import ButtonOutline from "../components/ButtonOutline";
import FilterDropdown from "../components/FilterDropdown";
import { Alert, MenuItem, Select, Skeleton, Snackbar } from "@mui/material";
import { deleteCareerById, getAllCareers } from "../api/career";

const Career = () => {
  const careers = useSelector((store) => store.careerReducer.careers);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
  } = useForm();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowToast, setIsShowToast] = useState({
    isOpen: false,
    variant: "info",
    duration: 5000,
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [notFoundMsg, setNotFoundMsg] = useState("");

  useEffect(() => {
    fetchAllCareers();
  }, []);

  const fetchAllCareers = async (params = {}) => {
    setIsLoading(true);

    try {
      const response = await getAllCareers(params);
      dispatch(updateCareer(response));
      setIsLoading(false);

      if (response.length < 1) {
        setNotFoundMsg("What you are looking for doesn't exist");
      }
    } catch (error) {
      setIsShowToast({
        ...isShowToast,
        isOpen: true,
        variant: "error",
        message: error.message,
      });
      setIsLoading(false);
    }

    setNotFoundMsg("What you are looking for doesn't exist");
  };

  const deleteCareer = async (careerId) => {
    try {
      const response = await deleteCareerById(careerId);
      setIsShowToast({
        ...isShowToast,
        isOpen: true,
        variant: "success",
        message: response.message,
      });
      fetchAllCareers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = (showModal) => {
    setIsShowModal(showModal);
  };

  const handleSearchCareer = (event) => {
    const keyword = event.target.value;

    fetchAllCareers({ search: keyword });
  };

  return (
    <div>
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
      <Modal isOpen={isShowModal} type="addCareer" onClose={handleShowModal}>
        <Modal.Title title="New Career" />
        <form>
          <InputField
            label="Job Position"
            placeholder="Ex : Junior UI Designer"
            type="text"
            name="jobPosition"
            register={register}
            errors={errors}
          />
          <InputField
            label="Company"
            placeholder="Ex : PT Dinamika Indonesia"
            type="text"
            name="company"
            register={register}
            errors={errors}
          />
          <InputField
            label="Location"
            placeholder="Ex : Bali, Indonesia"
            type="text"
            name="location"
            register={register}
            errors={errors}
          />
          <InputField
            label="Salary"
            placeholder="Ex : 3,500,000 ++"
            type="text"
            name="salary"
            register={register}
            errors={errors}
          />
          <InputField
            label="Description"
            placeholder="Ex : Looking for job applicant who are familiar with design tools such as Figma, Maze and Adobe."
            type="text"
            name="description"
            register={register}
            errors={errors}
          />
          <InputField
            label="Company Email"
            placeholder="Ex : xcompanyx@example.com"
            type="text"
            name="companyEmail"
            register={register}
            errors={errors}
          />
          <div className="flex flex-col gap-4">
            <ButtonPrimary className="h-fit w-full px-3 py-3 flex items-center justify-center">
              <AddRounded className="mr-1" style={{ fontSize: "1.125rem" }} />
              <span className="text-[1rem]">Add New Career</span>
            </ButtonPrimary>
            <ButtonOutline
              className="h-fit w-full px-3 py-3 flex items-center justify-center"
              onClick={() => handleShowModal(false)}
            >
              <span className="text-[1rem]">Not Now</span>
            </ButtonOutline>
          </div>
        </form>
      </Modal>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <SearchBar
            className="focus:outline-none w-72 text-neutralMediumLow"
            placeholder="Find something here ..."
            onChange={handleSearchCareer}
          />
          <ButtonPrimary
            className="h-fit w-auto flex items-center justify-center"
            onClick={handleShowModal}
          >
            <AddRounded className="mr-1" style={{ fontSize: "1.125rem" }} />
            <span className="text-[1rem]">New Career</span>
          </ButtonPrimary>
        </div>
        <div className="flex justify-end items-center gap-4">
          <span className="text-base">Sort By</span>
          <Select
            value={sortBy}
            // label="Age"
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
        <div className="flex flex-col justify-center gap-4 min-h-[10rem]">
          {careers.length >= 1 ? (
            careers.map((career) =>
              isLoading ? (
                <Skeleton
                  key={career.id}
                  animation="wave"
                  variant="rounded"
                  width="100%"
                  height={150}
                />
              ) : (
                <CardCareer
                  key={career.id}
                  payloads={career}
                  openModal={handleShowModal}
                  deleteCareer={deleteCareer}
                />
              )
            )
          ) : (
            <h3 className="flex justify-center items-center font-semibold">
              {notFoundMsg}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Career;
