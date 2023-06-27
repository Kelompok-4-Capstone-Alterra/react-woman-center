import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../../../Dropdown";
import DropdownPage from "../../../DropdownPage";
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
      getAllCounselors({ has_schedule: false }).then(({ counselors }) =>
        setCounselors(counselors)
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
    <Modal isOpen={modalState} type={"addCounselor"} onClose={closeModal}>
      <form
        onSubmit={handleSubmit((data) => {
          const counselorId = data.counselor.value;
          const dates = data.dates.map((date) => convertDate(date));

          addSchedule({ counselorId, dates, times })
            .then((data) => {
              onSubmit(true, "success");
            })
            .catch((error) => {
              onSubmit(false, "failed");
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
          errors={errors}
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
        <DropdownPage
          control={control}
          name={"times"}
          label={"Choose Time"}
          placeholder={"Select Time"}
          handleSelect={() => {
            handleTimeSelect();
          }}
          errors={errors}
        >
          <option value="09:00" label="09:00"></option>
          <option value="10:00" label="10:00"></option>
          <option value="11:00" label="11:00"></option>
          <option value="12:00" label="12:00"></option>
          <option value="13:00" label="13:00"></option>
          <option value="14:00" label="14:00"></option>
          <option value="15:00" label="15:00"></option>
        </DropdownPage>
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
