import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../../../Dropdown";
import Modal from "../../../Modal";
import Calendar from "../../../Calendar";
import ButtonPrimary from "../../../ButtonPrimary";
import ButtonOutline from "../../../ButtonOutline/index";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { convertDate } from "../../../../helpers/convertDate";
import { addSchedule } from "../../../../api/schedule";
import { getAuthCookie } from "../../../../utils/cookies";

const ScheduleModal = ({ modalState, closeModal }) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const [counselors, setCounselors] = useState([]);

  useEffect(() => {
    const token = getAuthCookie();
    if (modalState) {
      axios
        .get("https://13.210.163.192:8080/admin/counselors?sort_by=newest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setCounselors(response.data.data.counselors))
        .catch((error) => console.error(error));
    }
  }, [modalState]);

  return (
    <Modal isOpen={modalState} type={"addCounselor"}>
      <form
        onSubmit={handleSubmit((data) => {
          const counselorId = data.counselor.value;
          const dates = data.dates.map((date) => convertDate(date));
          const times = [data.times.value];

          console.log(counselorId);
          console.log(dates);
          console.log(times);

          addSchedule({ counselorId, dates, times });

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
          handleSelect={() => {}}
        >
          <option value="09:00:00" label="09:00:00"></option>
          <option value="12:00:00" label="12:00:00"></option>
          <option value="15:00:00" label="15:00:00"></option>
          <option value="18:00:00" label="18:00:00"></option>
        </Dropdown>
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
