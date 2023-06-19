import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../../../Dropdown";
import Modal from "../../../Modal";
import Calendar from "../../../Calendar";
import ButtonPrimary from "../../../ButtonPrimary";
import ButtonOutline from "../../../ButtonOutline/index";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";

const ViewModal = ({ modalState, closeModal, counselor }) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    if (counselor) {
      axios
        .get(
          `https://13.210.163.192:8080/admin/counselors/${counselor.id}/schedules`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE2ODcxNDgyMjZ9.iNS2kXRn0JF653IPfFxe0TgQzXT7gWRQEOlIS9sP6jw",
            },
          }
        )
        .then((response) => {
          let dates = response.data.data.schedule.dates.map(
            (date) => new Date(date)
          );
          setDates(dates);
          setTimes(response.data.data.schedule.times);
        })
        .catch((error) => console.error(error));
    }
  }, [counselor]);

  return (
    <Modal isOpen={modalState} type={"viewUpdateCounselor"}>
      <div className="flex flex-row w-full">
        <Modal.LeftSide>icon</Modal.LeftSide>
        <Modal.RightSide>
          <p className="text-[16px] font-medium text-neutralMedium">
            {counselor.id}
          </p>
          <h2 className="font-medium text-[22px] text-neutralHigh">
            {counselor.name}
          </h2>
          <p className="font-normal text-[14px] text-neutralMedium mb-6">
            {counselor.topic}
          </p>
          <Calendar
            type={"calendar-view"}
            control={control}
            name={"calendar"}
            label={"Counseling’s Schedule Date"}
            errors={errors}
            register={register}
            dateValue={dates}
          />

          <div className="mb-6">
            <label className="font-medium">Counseling's Schedule Time</label>
            {times.map((time) => (
              <div
                key={time}
                className="w-full h-[48px] px-4 border-solid border-primaryBorder border rounded mt-2 flex items-center justify-start mb-2"
              >
                <p>{time}</p>
              </div>
            ))}
          </div>

          <ButtonPrimary
            onClick={closeModal}
            type="buttom"
            className="flex items-center justify-center w-full h-[56px] mb-5 text-[17px]"
          >
            Close
          </ButtonPrimary>
        </Modal.RightSide>
      </div>
    </Modal>
  );
};

export default ViewModal;
