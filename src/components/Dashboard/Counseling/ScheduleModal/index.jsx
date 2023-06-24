import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../../../Dropdown";
import Modal from "../../../Modal";
import Calendar from "../../../Calendar";
import ButtonPrimary from "../../../ButtonPrimary";
import ButtonOutline from "../../../ButtonOutline/index";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { convertDate } from "../../../../helpers/convertDate";
import { addSchedule } from "../../../../api/schedule";
import { getAuthCookie } from "../../../../utils/cookies";
import { getAllCounselors } from "../../../../api/usercounselor";

const ScheduleModal = ({ modalState, closeModal, onSubmit }) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const [counselors, setCounselors] = useState([]);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const token = getAuthCookie();
    if (modalState == true) {
      getAllCounselors({ has_schedule: false }).then((data) =>
        setCounselors(data)
      );
    }
  }, [modalState]);

  const handleTimeSelect = () => {
    const selectedTime = getValues().times.value;
    if (!times.includes(selectedTime)) {
      setTimes([...times, selectedTime]);
    }
  };

  const handleRemoveTime = (time) => {
    setTimes((prevTimes) => prevTimes.filter((prevTime) => prevTime !== time));
  };

  return (
    <Modal isOpen={modalState} type={"addCounselor"}>
      <form
        onSubmit={handleSubmit((data) => {
          const counselorId = data.counselor.value;
          const dates = data.dates.map((date) => convertDate(date));

          addSchedule({ counselorId, dates, times }).then((data) => {
            onSubmit();
          });

          closeModal();
        })}
      >
        <Dropdown
          control={control}
          name={"counselor"}
          label={"Select Counselor"}
          placeholder={"Select Counselor"}
          handleSelect={() => {}}
        >
          {counselors.map((counselor) => {
            return (
              <option
                key={counselor.id}
                value={counselor.id}
                label={counselor.name}
              ></option>
            );
          })}
        </Dropdown>
        <Calendar
          control={control}
          name={"dates"}
          label={"Choose Counseling’s Schedule Date"}
          errors={errors}
          register={register}
          placeholder={""}
        />
        <Dropdown
          control={control}
          name={"times"}
          label={"Choose Time"}
          placeholder={"Select Time"}
          handleSelect={() => {
            handleTimeSelect();
          }}
        >
          <option value="09:00:00" label="09:00:00"></option>
          <option value="10:00:00" label="10:00:00"></option>
          <option value="11:00:00" label="11:00:00"></option>
          <option value="12:00:00" label="12:00:00"></option>
          <option value="13:00:00" label="13:00:00"></option>
          <option value="14:00:00" label="14:00:00"></option>
          <option value="15:00:00" label="15:00:00"></option>
        </Dropdown>
        {times?.map((time) => (
          <div
            key={time}
            className="w-full h-[48px] px-4 border-solid border-primaryBorder border rounded mt-2 flex items-center justify-between mb-2"
          >
            <p>{time}</p>
            <button onClick={() => handleRemoveTime(time)}>
              <DeleteIcon />
            </button>
          </div>
        ))}
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
