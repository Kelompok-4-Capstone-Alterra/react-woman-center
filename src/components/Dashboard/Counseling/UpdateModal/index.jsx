import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Dropdown from "../../../Dropdown";
import Modal from "../../../Modal";
import Calendar from "../../../Calendar";
import ButtonPrimary from "../../../ButtonPrimary";
import ButtonOutline from "../../../ButtonOutline/index";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { getSchedule } from "../../../../api/schedule";

const UpdateModal = ({ modalState, closeModal, counselor, dates, times }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  // const [dates, setDates] = useState([]);
  // const [times, setTimes] = useState([]);

  const { replace } = useFieldArray({ name: "calendar", control });

  // const getCounselorSchedule = async (id) => {
  //   const { dates, times } = await getSchedule(id);
  //   setDates(dates);
  //   setTimes(times);
  // };

  useEffect(() => {
    replace(dates);
  }, [dates]);

  //   const handleSelect = () => {
  //     const formData = getValues();
  //     const dropdownValue = formData.pageStatus;
  //     setIsSchedule(dropdownValue.value);
  //     console.log("isShedule : ", isSchedule);

  //     console.log("Value: ", dropdownValue.value);
  //   };

  return (
    <Modal isOpen={modalState} type={"viewUpdateCounselor"}>
      <div className="flex flex-row w-full">
        <Modal.LeftSide>icon</Modal.LeftSide>
        <Modal.RightSide>
          <p className="text-[16px] font-medium text-neutralMedium">123456</p>
          <h2 className="font-medium text-[22px] text-neutralHigh">John Doe</h2>
          <p className="font-normal text-[14px] text-neutralMedium mb-6">
            Self Development
          </p>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <Calendar
              control={control}
              name={"calendar"}
              label={"Choose Counseling’s Schedule Date"}
              errors={errors}
              register={register}
              placeholder={""}
              handleSelect={() => {
                console.log("test");
              }}
            />
            <Dropdown
              control={control}
              name={"time"}
              label={"Choose Time"}
              placeholder={"Select Time"}
              handleSelect={""}
            ></Dropdown>

            <div className="mb-6">
              <label className="font-medium">Counseling's Schedule Time</label>
              {times?.map((time) => (
                <div
                  key={time}
                  className="w-full h-[48px] px-4 border-solid border-primaryBorder border rounded mt-2 flex items-center justify-start mb-2"
                >
                  <p>{time}</p>
                </div>
              ))}
            </div>

            <ButtonPrimary
              onClick={() => {}}
              className="flex items-center justify-center w-full h-[56px] mb-5 text-[17px]"
            >
              <UpdateIcon /> Update Schedule
            </ButtonPrimary>
            <ButtonOutline
              type="button"
              onClick={closeModal}
              className="flex items-center justify-center h-[56px] w-full text-[17px]"
            >
              Not Now
            </ButtonOutline>
          </form>
        </Modal.RightSide>
      </div>
    </Modal>
  );
};

export default UpdateModal;
