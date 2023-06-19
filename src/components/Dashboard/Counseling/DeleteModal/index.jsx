import React from "react";
import Modal from "../../../Modal";
import ButtonPrimary from "../../../ButtonPrimary";
import ButtonOutline from "../../../ButtonOutline/index";
import axios from "axios";
import { deleteSchedule } from "../../../../api/schedule";

const DeleteModal = ({ modalState, closeModal, counselor }) => {
  // const deleteSchedule = (id) => {
  //   axios
  //     .delete(`https://13.210.163.192:8080/admin/counselors/${id}/schedules`, {
  //       headers: {
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE2ODcxNDgyMjZ9.iNS2kXRn0JF653IPfFxe0TgQzXT7gWRQEOlIS9sP6jw",
  //       },
  //     })
  //     .then((response) => console.log(response))
  //     .catch((error) => console.error(error));
  // };

  return (
    <Modal isOpen={modalState} type={"link"}>
      <p className="font-medium text-[22px] text-neutralHigh mb-8">
        Are you sure want to delete this item?
      </p>
      <ButtonPrimary
        className="flex items-center justify-center w-full h-[56px] mb-5 text-[22px]"
        onClick={() => {
          deleteSchedule(counselor.id);
          closeModal();
        }}
      >
        Sure
      </ButtonPrimary>
      <ButtonOutline
        className="flex items-center justify-center w-full h-[56px]  text-[22px]"
        onClick={closeModal}
      >
        Maybe Later
      </ButtonOutline>
    </Modal>
  );
};

export default DeleteModal;
