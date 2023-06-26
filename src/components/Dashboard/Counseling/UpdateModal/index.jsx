import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import DropdownPage from "../../../DropdownPage";
import Modal from "../../../Modal";
import Calendar from "../../../Calendar";
import ButtonPrimary from "../../../ButtonPrimary";
import ButtonOutline from "../../../ButtonOutline/index";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { getSchedule, updateSchedule } from "../../../../api/schedule";
import { convertDate } from "../../../../helpers/convertDate";
import { getCounselorById } from "../../../../api/usercounselor";
import { convertTime } from "../../../../helpers/converTime";

const UpdateModal = ({ modalState, closeModal, counselor, onSubmit }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [times, setTimes] = useState([]);
  const [counselorImage, setCounselorImage] = useState("");

  const { replace } = useFieldArray({ name: "dates", control });

  const getCounselorSchedule = async (id) => {
    const { dates, times } = await getSchedule(id);
    const counselorData = await getCounselorById(id);

    const timesData = times.map((time) => convertTime(time));
    replace(dates);
    setTimes(timesData);
    setCounselorImage(counselorData.profile_picture);
  };

  useEffect(() => {
    if (counselor && modalState == true) {
      getCounselorSchedule(counselor.id);
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
    <Modal isOpen={modalState} type={"viewUpdateSchedule"} onClose={closeModal}>
      <Modal.LeftSide>
        {counselorImage && (
          <img src={counselorImage} alt="" className="w-[100px] h-[80px]" />
        )}
      </Modal.LeftSide>
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
        <form
          onSubmit={handleSubmit((data) => {
            const counselorId = counselor.id;
            const dates = data.dates.map((date) => convertDate(date));

            updateSchedule({ counselorId, dates, times })
              .then((data) => {
                onSubmit(true, "success");
              })
              .catch((error) => {
                onSubmit(false, "failed");
              });
            closeModal();
          })}
        >
          <Calendar
            control={control}
            name={"dates"}
            label={"Choose Counseling’s Schedule Date"}
            errors={errors}
            register={register}
            placeholder={""}
            handleSelect={() => {}}
          />
          <DropdownPage
            control={control}
            name={"times"}
            label={"Choose Time"}
            placeholder={"Select Time"}
            handleSelect={() => handleTimeSelect()}
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

          <div className="mb-6">
            <label className="font-medium">Counseling's Schedule Time</label>
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
    </Modal>
  );
};

export default UpdateModal;
