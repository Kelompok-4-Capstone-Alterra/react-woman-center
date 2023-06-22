import { Delete, Edit } from "@mui/icons-material";
import { formatCurrency } from "../../helpers/formatCurrency";
import ButtonPrimary from "../ButtonPrimary";
import ButtonOutline from "../ButtonOutline";
import jobSeekerImg from "../../assets/career/job-seeker.jpg";
import ModalConfirm from "../ModalConfirm";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CardCareer = ({ payloads, handleEditCareer, deleteCareer }) => {
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const { id, image, job_position, company_name, location, salary } = payloads;

  const handleImageError = (event) => {
    event.currentTarget.src = jobSeekerImg;
  };

  const handleOpenModalConfirm = () => {
    setIsShowModalConfirm(true);
  };

  const handleShowModalConfirm = (showModal) => {
    setIsShowModalConfirm(showModal);
  };

  const handleDeleteCareer = () => {
    deleteCareer(payloads.id);
    handleShowModalConfirm(false);
  };

  return (
    <div className="flex justify-between p-4 border rounded-md">
      <div className="flex gap-8">
        <div className="w-52 h-52 flex justify-center items-center">
          <img
            src={image}
            alt={job_position}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold capitalize">{job_position}</h3>
          <p className="capitalize">{company_name}</p>
          <p className="capitalize">{location}</p>
          <h6 className="font-semibold">{formatCurrency(salary)}</h6>
        </div>
      </div>
      <div className="flex gap-4 items-end">
        <ButtonPrimary
          className="w-auto flex items-center justify-center"
          onClick={() => handleEditCareer(id)}
        >
          <Edit className="mr-1" style={{ fontSize: "1.125rem" }} />
          <span className="text-[1rem]">Edit</span>
        </ButtonPrimary>
        <div>
          <ButtonOutline
            className="w-auto flex items-center justify-center"
            onClick={handleOpenModalConfirm}
          >
            <Delete className="mr-1" style={{ fontSize: "1.125rem" }} />
            <span className="text-[1rem]">Delete</span>
          </ButtonOutline>
          {isShowModalConfirm && (
            <ModalConfirm
              onSure={handleDeleteCareer}
              onClose={handleShowModalConfirm}
              isConfirm={isShowModalConfirm}
              messages="Are you sure want to delete this item?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardCareer;
