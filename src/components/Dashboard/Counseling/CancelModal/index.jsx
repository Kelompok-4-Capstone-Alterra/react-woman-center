import React from "react";
import Modal from "../../../Modal";
import ButtonPrimary from "../../../ButtonPrimary";
import ButtonOutline from "../../../ButtonOutline/index";

const CancelModal = ({ modalState, closeModal }) => {
  return (
    <Modal isOpen={modalState} type={"link"}>
      <p className="font-medium text-[22px] text-neutralHigh mb-8">
        Are you sure want to cancel this counseling’s appoinment?
      </p>
      <ButtonPrimary
        className="flex items-center justify-center w-full h-[56px] mb-5 text-[22px]"
        onClick={() => {}}
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

export default CancelModal;
