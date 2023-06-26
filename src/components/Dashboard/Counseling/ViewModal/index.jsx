import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../../Modal";
import Calendar from "../../../Calendar";
import ButtonPrimary from "../../../ButtonPrimary";
import { getSchedule } from "../../../../api/schedule";
import { getCounselorById } from "../../../../api/usercounselor";
import { convertTime } from "../../../../helpers/converTime";
import Avatar from "../../../../assets/profile/avatar.png";

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
  const [counselorImage, setCounselorImage] = useState("");

  const getCounselorSchedule = async (id) => {
    const { dates, times } = await getSchedule(id);
    const counselorData = await getCounselorById(id);

    const timesData = times.map((time) => convertTime(time));

    setDates(dates);
    setTimes(timesData);
    setCounselorImage(counselorData.profile_picture);
  };

  useEffect(() => {
    if (counselor && modalState == true) {
      getCounselorSchedule(counselor.id);
    }
  }, [modalState]);

  return (
    <Modal isOpen={modalState} type={"viewUpdateSchedule"} onClose={closeModal}>
      <Modal.LeftSide>
        {counselorImage && (
          <img
            src={counselorImage || Avatar}
            alt=""
            className="w-[100px] h-[80px] rounded-full"
          />
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
          onClick={closeModal}
          type="buttom"
          className="flex items-center justify-center w-full h-[56px] mb-5 text-[17px]"
        >
          Close
        </ButtonPrimary>
      </Modal.RightSide>
    </Modal>
  );
};

export default ViewModal;
