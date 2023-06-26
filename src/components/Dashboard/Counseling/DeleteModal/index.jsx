import React from "react";
import Modal from "../../../Modal";
import ButtonPrimary from "../../../ButtonPrimary";
import ButtonOutline from "../../../ButtonOutline/index";
import axios from "axios";
import { deleteSchedule } from "../../../../api/schedule";
import ModalConfirm from "../../../ModalConfirm";

const DeleteModal = ({ modalState, closeModal, counselor, onSubmit }) => {
  return (
    <ModalConfirm
      isConfirm={modalState}
      onClose={closeModal}
      messages={"Are you sure want to delete this item?"}
      onSure={() => {
        deleteSchedule(counselor.id)
          .then((data) => {
            onSubmit(true, "success");
          })
          .catch((error) => {
            onSubmit(false, "failed");
          });
        closeModal();
      }}
    />
  );
};

export default DeleteModal;
