import React from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../../../Dropdown";
import Modal from "../../../Modal";
import Calendar from "../../../Calendar";
import ButtonPrimary from "../../../ButtonPrimary";
import ButtonOutline from "../../../ButtonOutline/index";
import AddIcon from "@mui/icons-material/Add";

const ScheduleModal = ({ modalState, closeModal }) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Modal isOpen={modalState} type={"addCounselor"}>
      <form className="">
        <Dropdown
          control={control}
          name={"counselor"}
          label={"Select Counselor"}
          placeholder={"Select Counselor"}
          handleSelect={""}
        ></Dropdown>
        <Dropdown
          control={control}
          name={"time"}
          label={"Choose Time"}
          placeholder={"Select Time"}
          handleSelect={""}
        ></Dropdown>
        <Calendar
          control={control}
          name={"calendar"}
          label={"Choose Counseling’s Schedule Date"}
          errors={errors}
          register={register}
          placeholder={""}
          handleSelect={""}
        />
        <ButtonPrimary
          onClick={() => {}}
          className="flex items-center justify-center w-full h-[56px] mb-5 text-[17px]"
        >
          <AddIcon /> Add Schedule
        </ButtonPrimary>
        <ButtonOutline
          type="button"
          onClick={closeModal}
          className="flex items-center justify-center h-[56px] w-full text-[17px]"
        >
          Not Now
        </ButtonOutline>
      </form>
    </Modal>
  );
};

export default ScheduleModal;
