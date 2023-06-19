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
    axios
      .get("https://13.210.163.192:8080/admin/counselors?sort_by=newest", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE2ODcxNDgyMjZ9.iNS2kXRn0JF653IPfFxe0TgQzXT7gWRQEOlIS9sP6jw",
        },
      })
      .then((response) => setCounselors(response.data.data.counselors))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Modal isOpen={modalState} type={"addCounselor"}>
      <form
        onSubmit={handleSubmit((data) => {
          const counselorId = data.counselor.value;

          const requestBody = {
            dates: data.dates.map((date) => convertDate(date)),
            times: [data.times.value],
          };

          console.log(counselorId);
          console.log(requestBody);

          axios
            .post(
              `https://13.210.163.192:8080/admin/counselors/${counselorId}/schedules`,
              requestBody,
              {
                headers: {
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE2ODcxNDgyMjZ9.iNS2kXRn0JF653IPfFxe0TgQzXT7gWRQEOlIS9sP6jw",
                },
              }
            )
            .then((response) => {
              console.log("Response:", response.data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
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
